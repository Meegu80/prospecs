import type { Editor } from "@tiptap/react";
import { twMerge } from "tailwind-merge";
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatStrikethrough,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdImage,
    MdFormatQuote,
    MdCode,
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
    MdUndo,
    MdRedo,
    MdFormatSize,
    MdHorizontalRule,
    MdInsertLink,
    MdLinkOff,
    MdHighlight,
    MdFormatClear,
} from "react-icons/md";

interface EditorToolbarProps {
    editor: Editor | null;
    onImageUpload: () => void;
}

const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "30", "36"];

function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
    if (!editor) return null;

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL을 입력하세요", previousUrl);

        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    const ToolbarButton = ({ 
        onClick, 
        isActive = false, 
        children, 
        disabled = false,
        title
    }: { 
        onClick: () => void; 
        isActive?: boolean; 
        children: React.ReactNode;
        disabled?: boolean;
        title?: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={twMerge(
                ["p-2", "rounded", "hover:bg-gray-200", "transition-all"],
                isActive ? ["bg-gray-800", "text-white"] : "text-gray-500",
                disabled && ["opacity-30", "cursor-not-allowed"]
            )}
        >
            {children}
        </button>
    );

    return (
        <div className={twMerge([
            "border-b", "border-gray-200", "p-2", 
            "flex", "gap-1", "bg-gray-50", "flex-wrap", "items-center"
        ])}>
            {/* 히스토리 */}
            <div className="flex border-r border-gray-300 pr-1 mr-1">
                <ToolbarButton 
                    onClick={() => editor.chain().focus().undo().run()} 
                    disabled={!editor.can().undo()} 
                    title="실행 취소"
                >
                    <MdUndo size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().redo().run()} 
                    disabled={!editor.can().redo()} 
                    title="다시 실행"
                >
                    <MdRedo size={20} />
                </ToolbarButton>
            </div>

            {/* 폰트 크기 선택 */}
            <div className="flex border-r border-gray-300 pr-1 mr-1">
                <select
                    className="bg-transparent text-xs font-bold text-gray-600 p-1 rounded hover:bg-gray-200 outline-none cursor-pointer"
                    onChange={(e) => {
                        if (e.target.value === "default") {
                            editor.chain().focus().unsetFontSize().run();
                        } else {
                            editor.chain().focus().setFontSize(e.target.value).run();
                        }
                    }}
                    value={editor.getAttributes("textStyle").fontSize || "default"}
                >
                    <option value="default">기본 크기</option>
                    {FONT_SIZES.map(size => (
                        <option key={size} value={size}>{size}px</option>
                    ))}
                </select>
            </div>

            {/* 서식 초기화 */}
            <div className="flex border-r border-gray-300 pr-1 mr-1">
                <ToolbarButton 
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} 
                    title="서식 지우기"
                >
                    <MdFormatClear size={20} />
                </ToolbarButton>
            </div>

            {/* 텍스트 스타일 */}
            <div className="flex gap-1 border-r border-gray-300 pr-1 mr-1">
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="제목 (H2)"
                >
                    <MdFormatSize size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="굵게"
                >
                    <MdFormatBold size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="기울임"
                >
                    <MdFormatItalic size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    title="취소선"
                >
                    <MdFormatStrikethrough size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    isActive={editor.isActive("highlight")}
                    title="형광펜"
                >
                    <MdHighlight size={20} />
                </ToolbarButton>
            </div>

            {/* 링크 및 미디어 */}
            <div className="flex gap-1 border-r border-gray-300 pr-1 mr-1">
                <ToolbarButton onClick={setLink} isActive={editor.isActive("link")} title="링크 삽입">
                    <MdInsertLink size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().unsetLink().run()} 
                    disabled={!editor.isActive("link")}
                    title="링크 해제"
                >
                    <MdLinkOff size={20} />
                </ToolbarButton>
                <ToolbarButton onClick={onImageUpload} title="이미지 업로드">
                    <MdImage size={20} />
                </ToolbarButton>
            </div>

            {/* 리스트 및 인용 */}
            <div className="flex gap-1 border-r border-gray-300 pr-1 mr-1">
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                    title="글머리 기호"
                >
                    <MdFormatListBulleted size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                    title="번호 매기기"
                >
                    <MdFormatListNumbered size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                    title="인용구"
                >
                    <MdFormatQuote size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive("codeBlock")}
                    title="코드 블록"
                >
                    <MdCode size={20} />
                </ToolbarButton>
            </div>

            {/* 정렬 및 기타 */}
            <div className="flex gap-1">
                <ToolbarButton 
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    isActive={editor.isActive({ textAlign: "left" })}
                    title="왼쪽 정렬"
                >
                    <MdFormatAlignLeft size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    isActive={editor.isActive({ textAlign: "center" })}
                    title="가운데 정렬"
                >
                    <MdFormatAlignCenter size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    isActive={editor.isActive({ textAlign: "right" })}
                    title="오른쪽 정렬"
                >
                    <MdFormatAlignRight size={20} />
                </ToolbarButton>
                <ToolbarButton 
                    onClick={() => editor.chain().focus().setHorizontalRule().run()} 
                    title="가로 구분선"
                >
                    <MdHorizontalRule size={20} />
                </ToolbarButton>
            </div>
        </div>
    );
}

export default EditorToolbar;
