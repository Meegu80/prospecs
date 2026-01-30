import { motion } from "framer-motion";

export default function SpinnerSmall(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-8 h-8">
          {/* 배경이 되는 은은한 고리 */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-100 opacity-20" />

          {/* 메인 회전 그라데이션 고리 */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "#3B82F6", // Blue 500
              borderRightColor: "#8B5CF6", // Violet 500
              filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* 반대 방향으로 도는 작은 빛 입자 */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "#EC4899", // Pink 500
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 중앙에서 깜빡이는 점 */}
          <motion.div
            className="absolute inset-0 m-auto w-2 h-2 bg-indigo-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
