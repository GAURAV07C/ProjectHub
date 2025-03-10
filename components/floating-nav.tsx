"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Info, Grid, MessageSquare, Users, Menu, X } from "lucide-react"

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Show nav after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }

      // Update active section based on scroll position
      const sections = ["home", "features", "categories", "testimonials", "faq"]
      const scrollPosition = window.scrollY + 300

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "features", label: "Features", icon: <Grid className="h-4 w-4" /> },
    { id: "categories", label: "Categories", icon: <Info className="h-4 w-4" /> },
    { id: "testimonials", label: "Testimonials", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "faq", label: "FAQ", icon: <Users className="h-4 w-4" /> },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
      setIsOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Mobile Toggle Button */}
            <motion.div
              className="md:hidden bg-gray-900/80 backdrop-blur-md p-3 rounded-full border border-gray-800 shadow-lg shadow-blue-900/20"
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white p-0 h-8 w-8">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block bg-gray-900/80 backdrop-blur-md p-2 rounded-full border border-gray-800 shadow-lg shadow-blue-900/20">
              <div className="flex space-x-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-1">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="md:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 w-56 bg-gray-900/90 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg shadow-blue-900/20 overflow-hidden"
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center justify-start w-full px-3 py-2 rounded-lg transition-colors ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingNav

