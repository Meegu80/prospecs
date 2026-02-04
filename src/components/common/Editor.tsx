import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { twMerge } from "tailwind-merge";
import EditorToolbar from "./EditorToolbar.tsx";
import Image from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Extension } from "@tiptap/core";
import { uploadImage } from "../../api/upload.api.ts";

// 1. Tiptap 명령어 타입 확장
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        }
    }
}

// 2. FontSize 커스텀 익스텐션 정의
export const FontSize = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ["textStyle"],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element: HTMLElement) => element.style.fontSize.replace(/['"]+/g, ""),
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) return {};
                            const size = attributes.fontSize.includes('px') 
                                ? attributes.fontSize 
                                : `${attributes.fontSize}px`;
                            return { style: `font-size: ${size}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize:
                (size: string) =>
                ({ chain }: any) => {
                    return chain().setMark("textStyle", { fontSize: size }).run();
                },
            unsetFontSize:
                () =>
                ({ chain }: any) => {
                    return chain()
                        .setMark("textStyle", { fontSize: null })
                        .removeEmptyTextStyle()
                        .run();
                },
        };
    },
});

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function Editor({ value, onChange, placeholder }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3], // 사용할 제목 레벨 명시
                },
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false },
            }),
            TextStyle,
            FontSize,
            Image.configure({
                inline: true,
                allowBase64: false,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                },
            }),
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({
                types: ['heading', 'paragraph'], // 제목에도 정렬 적용 가능하도록 설정
            }),
            Color,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: twMerge([
                    "min-h-[440px] p-4 focus:outline-none prose max-w-none",
                    "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4",
                    "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3",
                    "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2",
                    "[&_ul]:list-disc [&_ul]:ml-4",
                    "[&_ol]:list-decimal [&_ol]:ml-4",
                    "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic",
                    "[&_code]:bg-gray-100 [&_code]:rounded [&_code]:px-1",
                    "[&_pre]:bg-gray-800 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-md",
                ])
            }
        }
    });

    const handleImageUpload = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            try {
                const url = await uploadImage(file, "editor");
                if (editor) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            } catch (error) {
                console.log(error);
                alert("이미지 업로드 실패");
            }
        }
    }

    return (
        <div
            className={twMerge(
                ["border", "border-gray-300", "rounded-lg", "overflow-hidden"],
                ["bg-white", "flex", "flex-col", "h-150"],
            )}>
            <div className={twMerge(["flex-none", "z-10"])}>
                <EditorToolbar editor={editor} onImageUpload={handleImageUpload}/>
            </div>
            <div className={twMerge(["grow", "overflow-y-auto", "cursor-text"])}>
                <EditorContent editor={editor} placeholder={placeholder} className={"h-full"} />
            </div>
        </div>
    );
}

export default Editor;
