import { motion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";

interface ComparisonHeaderProps {
  variants: Variants;
  isProjectHub?: boolean;
}

const ComparisonHeader: React.FC<ComparisonHeaderProps> = ({ 
  variants, 
  isProjectHub = false 
}) => {
  return (
    <motion.div variants={variants} className="col-span-1 text-center">
      <Card
        className={`p-6 h-full flex flex-col items-center justify-center ${
          isProjectHub
            ? "bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700/50"
            : "bg-gray-800/30 border-gray-700"
        }`}
      >
        {isProjectHub ? (
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30" />
            <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-xl">PH</span>
            </div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Project Hub
            </h3>
            <p className="text-sm text-blue-300/70 mt-1">Project Showcase Platform</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Github className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold">GitHub</h3>
            <p className="text-sm text-gray-400 mt-1">Code Repository</p>
          </>
        )}
      </Card>
    </motion.div>
  );
};

export default ComparisonHeader;
