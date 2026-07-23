import { motion, type Variants } from "framer-motion";
import { Check, X } from "lucide-react";

interface ComparisonRowProps {
  variants: Variants;
  label: string;
  githubValue: string;
  projectHubValue: string;
  isCheck?: boolean;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({
  variants,
  label,
  githubValue,
  projectHubValue,
  isCheck = false,
}) => {
  const renderValue = (value: string, isProjectHub: boolean) => {
    if (isCheck) {
      const Icon = value.includes("✓") || isProjectHub ? Check : X;
      const colorClass = isProjectHub ? "text-green-400" : "text-red-400";
      return (
        <div className={`p-4 rounded-lg flex justify-center ${isProjectHub ? "bg-green-900/20" : "bg-red-900/20"}`}>
          <Icon className={`h-6 w-6 ${colorClass}`} />
        </div>
      );
    }
    return (
      <div
        className={`p-4 rounded-lg text-center ${
          isProjectHub
            ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30"
            : "bg-gray-800/30"
        }`}
      >
        <p className={isProjectHub ? "text-blue-400" : ""}>{value}</p>
      </div>
    );
  };

  return (
    <motion.div variants={variants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="col-span-1 flex items-center bg-gray-800/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
        <h4 className="font-medium text-white">{label}</h4>
      </div>
      <div className="col-span-1">
        {renderValue(githubValue, false)}
      </div>
      <div className="col-span-1">
        {renderValue(projectHubValue, true)}
      </div>
    </motion.div>
  );
};

export default ComparisonRow;
