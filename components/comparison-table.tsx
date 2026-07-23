"use client"

import { motion } from "framer-motion"
import ComparisonHeader from "@/components/comparison/parts/ComparisonHeader"
import ComparisonRow from "@/components/comparison/parts/ComparisonRow"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const ComparisonTable = () => {
  const rows = [
    { label: "Primary Focus", github: "Code hosting & version control", projectHub: "Project showcasing & collaboration", isCheck: false },
    { label: "Target Users", github: "Primarily developers", projectHub: "All students (developers, designers, engineers, etc.)", isCheck: false },
    { label: "Visual Presentation", github: "basic", projectHub: "rich", isCheck: true },
    { label: "Live Demos", github: "Limited (GitHub Pages)", projectHub: "Integrated demo showcase", isCheck: false },
    { label: "Feedback System", github: "Pull requests & issues", projectHub: "Ratings, comments & structured feedback", isCheck: false },
    { label: "Non-Code Projects", github: "basic", projectHub: "rich", isCheck: true },
    { label: "Portfolio Building", github: "Basic profile", projectHub: "Customizable portfolio page", isCheck: false },
  ];

  return (
    <div className="overflow-x-auto">
      <motion.div
        className="min-w-full"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="col-span-1 hidden md:block"></div>
          <ComparisonHeader variants={item} />
          <ComparisonHeader variants={item} isProjectHub />
        </div>

        {/* Mobile view title */}
        <div className="md:hidden grid grid-cols-2 gap-4 mb-4">
          <div className="p-2 text-center font-medium text-gray-400">GitHub</div>
          <div className="p-2 text-center font-medium text-blue-400">Project Hub</div>
        </div>

        {rows.map((row, index) => (
          <ComparisonRow
            key={index}
            variants={item}
            label={row.label}
            githubValue={row.github}
            projectHubValue={row.projectHub}
            isCheck={row.isCheck}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default ComparisonTable
