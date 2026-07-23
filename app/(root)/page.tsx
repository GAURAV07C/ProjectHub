"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Upload,
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
  ArrowRight,
  ExternalLink,
  Sparkles,
  Menu,
} from "lucide-react";
import Image from "next/image";
import ComparisonTable from "@/components/comparison-table";
import FeatureCard from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function App() {
  const [activeTab, setActiveTab] = useState("web");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: "web", name: "Web Development", icon: Code, count: "2.5K+ Projects", color: "from-blue-500/20 to-cyan-500/20" },
    { id: "ai", name: "AI & ML", icon: Brain, count: "1.8K+ Projects", color: "from-purple-500/20 to-pink-500/20" },
    {
      id: "mobile",
      name: "Mobile Apps",
      icon: Smartphone,
      count: "1.2K+ Projects",
      color: "from-green-500/20 to-emerald-500/20",
    },
    { id: "iot", name: "IoT", icon: Cpu, count: "950+ Projects", color: "from-orange-500/20 to-red-500/20" },
    {
      id: "robotics",
      name: "Robotics",
      icon: Notebook,
      count: "750+ Projects",
      color: "from-indigo-500/20 to-violet-500/20",
    },
  ];

  const stats = [
    { icon: Globe, value: "50K+", label: "Global Users", color: "text-blue-400" },
    { icon: Zap, value: "15K+", label: "Active Projects", color: "text-purple-400" },
    { icon: Target, value: "95%", label: "Success Rate", color: "text-green-400" },
    { icon: MessageSquare, value: "100K+", label: "Community Posts", color: "text-pink-400" },
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
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0F]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0A0F]/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-40 group-hover:opacity-70 transition-opacity" />
                <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Project Hub
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {["Features", "Categories", "Stories", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25">
                  Get Started
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/10 bg-[#0A0A0F]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-3">
              {["Features", "Categories", "Stories", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <Link href="/auth/login" className="block">
                  <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">The #1 Platform for Student Innovation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Build.
              </span>
              <br />
              <span className="text-white">Showcase.</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                Connect.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Join the future of student innovation. Showcase your projects, collaborate with peers, and build your career in tech.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Building Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <Link href="/feed">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border border-white/20 hover:bg-white/10 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Explore Projects
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-4 mx-auto`} />
                    <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </section>

      {/* GitHub Comparison */}
      <section id="comparison" className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Project Hub
                </span>{" "}
                over GitHub?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Built specifically for students to showcase, collaborate, and grow
              </p>
            </div>
            <ComparisonTable />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Powerful Features
              </span>
              <br />
              <span className="text-white">for Innovators</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to showcase your projects and grow your career
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Upload className="h-10 w-10 text-yellow-400" />}
              title="Showcase Your Innovation"
              description="Create stunning project portfolios with live demos, videos, and detailed documentation."
              highlight="Monthly Awards"
            />

            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-green-400" />}
              title="Expert Feedback"
              description="Get valuable insights from industry experts and experienced peers in your field."
              highlight="500+ Mentors"
            />

            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-400" />}
              title="Build Dream Teams"
              description="Connect with talented students worldwide and form teams for hackathons or startups."
              highlight="25K+ Collaborations"
            />

            <FeatureCard
              icon={<Search className="h-10 w-10 text-purple-400" />}
              title="Discover Opportunities"
              description="Find exciting projects to contribute to and gain real-world experience."
              highlight="Daily Updates"
            />

            <FeatureCard
              icon={<Lightbulb className="h-10 w-10 text-amber-400" />}
              title="Trending Innovation Hub"
              description="Stay ahead with cutting-edge project ideas and emerging tech trends."
              highlight="Weekly Insights"
            />

            <FeatureCard
              icon={<ExternalLink className="h-10 w-10 text-pink-400" />}
              title="Recognition & Rewards"
              description="Get featured in our spotlight and earn badges for outstanding projects."
              highlight="Monthly Awards"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Explore Project
              </span>
              <br />
              <span className="text-white">Categories</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover amazing projects across different domains
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group px-8 py-6 rounded-2xl border transition-all duration-300 ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 shadow-lg shadow-blue-500/10"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center border border-white/10`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-semibold text-lg text-white">{category.name}</span>
                  <span className="text-sm text-gray-400">{category.count}</span>
                </div>
                {activeTab === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="py-20 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of students who launched their careers through Project Hub
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-40" />
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10 relative"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 italic leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="text-sm font-medium text-blue-400 bg-blue-500/10 py-2 px-4 rounded-full inline-flex items-center gap-2 border border-blue-500/20">
                    <Award className="w-4 h-4" />
                    {testimonial.award}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-20 sm:py-32 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Frequently Asked
              </span>
              <br />
              <span className="text-white">Questions</span>
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about Project Hub
            </p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <span className="font-semibold text-lg text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 transition-transform duration-300 flex-shrink-0 ${
                      activeFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === index ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 py-5 text-gray-300 border-t border-white/10 bg-white/5 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-30" />
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Build Something Amazing?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of innovators already building the future on Project Hub.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth/signup">
                    <Button
                      size="lg"
                      className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-blue-500/30"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Create Your Account
                        <ArrowRight className="w-5 h-5" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Project Hub
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 Project Hub. Built with passion for students worldwide.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;