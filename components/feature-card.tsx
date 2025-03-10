"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  highlight,
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm overflow-hidden relative h-full group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-30 group-hover:blur-sm transition-all duration-700"></div>

        <CardContent className="p-8">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>

          <motion.div
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>

          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-300 mb-6 text-lg">{description}</p>
          <div className="text-sm font-medium text-blue-400 bg-blue-500/10 py-2 px-4 rounded-full inline-flex items-center gap-2">
            <Check className="w-4 h-4" />
            {highlight}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
