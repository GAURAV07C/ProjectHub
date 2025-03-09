"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Github,
  Upload,
  Star,
  Users,
  Search,
  Lightbulb,
  Code,
  Brain,
  Smartphone,
  Cpu,
  Notebook,
  ChevronDown,
  Globe,
  Award,
  Zap,
  Target,
  MessageSquare,
  Share2,
} from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("web");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const categories = [
    { id: "web", name: "Web Development", icon: Code, count: "2.5K+ Projects" },
    { id: "ai", name: "AI & ML", icon: Brain, count: "1.8K+ Projects" },
    {
      id: "mobile",
      name: "Mobile Apps",
      icon: Smartphone,
      count: "1.2K+ Projects",
    },
    { id: "iot", name: "IoT", icon: Cpu, count: "950+ Projects" },
    {
      id: "robotics",
      name: "Robotics",
      icon: Notebook,
      count: "750+ Projects",
    },
  ];

  const features = [
    {
      icon: Upload,
      title: "Showcase Your Innovation",
      description:
        "Create stunning project portfolios with live demos, videos, and detailed documentation.",
      highlight: "10K+ Active Projects",
    },
    {
      icon: Star,
      title: "Expert Feedback",
      description:
        "Get valuable insights from industry experts and experienced peers in your field.",
      highlight: "500+ Mentors",
    },
    {
      icon: Users,
      title: "Build Dream Teams",
      description:
        "Connect with talented students worldwide and form teams for hackathons or startups.",
      highlight: "25K+ Collaborations",
    },
    {
      icon: Search,
      title: "Discover Opportunities",
      description:
        "Find exciting projects to contribute to and gain real-world experience.",
      highlight: "Daily Updates",
    },
    {
      icon: Lightbulb,
      title: "Trending Innovation Hub",
      description:
        "Stay ahead with cutting-edge project ideas and emerging tech trends.",
      highlight: "Weekly Insights",
    },
    {
      icon: Award,
      title: "Recognition & Rewards",
      description:
        "Get featured in our spotlight and earn badges for outstanding projects.",
      highlight: "Monthly Awards",
    },
  ];

  const stats = [
    { icon: Globe, value: "50K+", label: "Global Users" },
    { icon: Zap, value: "15K+", label: "Active Projects" },
    { icon: Target, value: "95%", label: "Success Rate" },
    { icon: MessageSquare, value: "100K+", label: "Community Posts" },
  ];

  const faqs = [
    {
      question: "Is Project Hub free for students?",
      answer:
        "Yes! Project Hub is completely free for students. We believe in empowering student innovation without any barriers.",
    },
    {
      question: "How do I showcase my project?",
      answer:
        'Simply click "Upload Project", add your project details, documentation, and demos. You can include videos, live previews, and even GitHub repositories!',
    },
    {
      question: "Can I find team members for hackathons?",
      answer:
        'Absolutely! Use our "Team Finder" feature to connect with students who share your interests and technical skills.',
    },
    {
      question: "How does the mentor feedback system work?",
      answer:
        "Industry experts and experienced peers can review your projects, provide detailed feedback, and offer suggestions for improvement.",
    },
    {
      question: "What types of projects can I showcase?",
      answer:
        "Any tech project! From web apps to AI models, mobile apps to robotics - if you built it, you can showcase it.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "AI Research Student",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      text: "Through Project Hub, I found amazing collaborators for my AI research project. We ended up winning the International Student Innovation Award!",
      award: "🏆 Innovation Award Winner",
    },
    {
      name: "James Wilson",
      role: "Robotics Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      text: "The mentor feedback on my robotics project was game-changing. Now my project is being incubated by a leading tech company!",
      award: "🚀 Featured Project",
    },
    {
      name: "Emily Rodriguez",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      text: "Project Hub helped me build my portfolio and land my dream internship. The community here is incredibly supportive!",
      award: "⭐ Rising Star",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-[0.15]"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Where Projects Meet Innovators
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the largest student innovation platform. Showcase your
              projects, collaborate with peers, and build your future in tech.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Join Now - It&apos;s Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300"
              >
                Watch Demo
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* GitHub Comparison */}
      <section className="py-16 sm:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Beyond Code Hosting
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8">
                While GitHub excels at version control, Project Hub is built
                specifically for students to showcase complete projects and
                build their portfolio.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <Github className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" />
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full"
            >
              <div className="bg-gray-700 rounded-xl p-4 sm:p-8 backdrop-blur-lg bg-opacity-50">
                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      title: "Project Showcase",
                      github: "Code repositories",
                      projectHub: "Full project presentation with live demos",
                    },
                    {
                      title: "Audience",
                      github: "Developers only",
                      projectHub: "All student innovators",
                    },
                    {
                      title: "Feedback",
                      github: "Code reviews",
                      projectHub: "Comprehensive project feedback",
                    },
                    {
                      title: "Collaboration",
                      github: "Code contributions",
                      projectHub: "Team formation & project matching",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-4 rounded-lg bg-gray-600 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300"
                    >
                      <div className="font-semibold text-center sm:text-left">
                        {item.title}
                      </div>
                      <div className="text-gray-300 text-center sm:text-left">
                        {item.github}
                      </div>
                      <div className="text-blue-400 text-center sm:text-left">
                        {item.projectHub}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powerful Features for Innovators
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Everything you need to showcase your projects and grow your career
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur-lg shadow-xl border border-gray-700"
              >
                <div className="bg-blue-500 bg-opacity-20 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <div className="text-sm font-medium text-blue-400 bg-blue-500 bg-opacity-10 py-2 px-4 rounded-full inline-block">
                  {feature.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Explore Project Categories
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Discover amazing projects across different domains
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full sm:w-auto px-4 sm:px-6 py-4 rounded-xl flex flex-col items-center gap-2 ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                <category.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="font-semibold">{category.name}</span>
                <span className="text-sm opacity-75">{category.count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Join thousands of students who launched their careers through
              Project Hub
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur-lg border border-gray-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
                <div className="text-sm font-medium text-blue-400 bg-blue-500 bg-opacity-10 py-2 px-4 rounded-full inline-block">
                  {testimonial.award}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Everything you need to know about Project Hub
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900"
              >
                <button
                  className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800 transition-colors duration-200"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <span className="font-semibold text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transition-transform duration-300 flex-shrink-0 ${
                      activeFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === index ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-300 border-t border-gray-700 bg-gray-800">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to Showcase Your Innovation?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Join thousands of student innovators and start building your
              future today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Get Started - It's Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-gray-800 text-white px-6 sm:px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300"
              >
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default App;
