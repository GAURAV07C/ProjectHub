"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Github } from "lucide-react"

const ComparisonTable = () => {
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
          <motion.div variants={item} className="col-span-1 text-center">
            <Card className="bg-gray-800/30 border-gray-700 p-6 h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Github className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">GitHub</h3>
              <p className="text-sm text-gray-400 mt-1">Code Repository</p>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-1 text-center">
            <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700/50 p-6 h-full flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                  <span className="text-white font-bold text-xl">PH</span>
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Project Hub
                </h3>
                <p className="text-sm text-blue-300/70 mt-1">Project Showcase Platform</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Mobile view title */}
        <div className="md:hidden grid grid-cols-2 gap-4 mb-4">
          <div className="p-2 text-center font-medium text-gray-400">GitHub</div>
          <div className="p-2 text-center font-medium text-blue-400">Project Hub</div>
        </div>

        {/* Comparison Rows */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 flex items-center bg-gray-800/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
            <h4 className="font-medium">Primary Focus</h4>
          </div>
          <div className="col-span-1 p-4 bg-gray-800/30 rounded-lg text-center">
            <p>Code hosting & version control</p>
          </div>
          <div className="col-span-1 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg text-center">
            <p className="text-blue-400">Project showcasing & collaboration</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 flex items-center bg-gray-800/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
            <h4 className="font-medium">Target Users</h4>
          </div>
          <div className="col-span-1 p-4 bg-gray-800/30 rounded-lg text-center">
            <p>Primarily developers</p>
          </div>
          <div className="col-span-1 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg text-center">
            <p className="text-blue-400">All students (developers, designers, engineers, etc.)</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 flex items-center bg-gray-800/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
            <h4 className="font-medium">Visual Presentation</h4>
          </div>
          <div className="col-span-1 p-4 bg-gray-800/30 rounded-lg flex justify-center">
            <div className="bg-red-900/20 p-2 rounded-full">
              <X className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="col-span-1 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg flex justify-center">
            <div className="bg-green-900/20 p-2 rounded-full">
              <Check className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 flex items-center bg-gray-800/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
            <h4 className="font-medium">Live Demos</h4>
          </div>
          <div className="col-span-1 p-4 bg-gray-800/30 rounded-lg text-center">
            <p>Limited (GitHub Pages)</p>
          </div>
          <div className="col-span-1 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg text-center">
            <p className="text-blue-400">Integrated demo showcase</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 flex items-center bg-gray-800/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
            <h4 className="font-medium">Feedback System</h4>
          </div>
          <div className="col-span-1 p-4 bg-gray-800/30 rounded-lg text-center">
            <p>Pull requests & issues</p>
          </div>
          <div className="col-span-1 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg text-center">
            <p className="text-blue-400">Ratings, comments & structured feedback</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 flex items-center bg-gray-800/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
            <h4 className="font-medium">Non-Code Projects</h4>
          </div>
          <div className="col-span-1 p-4 bg-gray-800/30 rounded-lg flex justify-center">
            <div className="bg-red-900/20 p-2 rounded-full">
              <X className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="col-span-1 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg flex justify-center">
            <div className="bg-green-900/20 p-2 rounded-full">
              <Check className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 flex items-center bg-gray-800/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
            <h4 className="font-medium">Portfolio Building</h4>
          </div>
          <div className="col-span-1 p-4 bg-gray-800/30 rounded-lg text-center">
            <p>Basic profile</p>
          </div>
          <div className="col-span-1 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg text-center">
            <p className="text-blue-400">Customizable portfolio page</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ComparisonTable

