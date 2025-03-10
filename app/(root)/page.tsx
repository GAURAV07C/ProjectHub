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
} from "lucide-react";
import Image from "next/image";
import ComparisonTable from "@/components/comparison-table";
import FeatureCard from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-900 text-white  ">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0A1128 0%, #1A2238 50%, #0A1128 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
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

        <div className="container relative z-10">
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
              className="mb-8 inline-block animate-float"
            >
              <div className="glass-card p-4">
                <Rocket className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400" />
              </div>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight">
              Where Innovation Takes Flight
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join the largest student innovation platform. Showcase your
              projects, collaborate with peers, and build your future in tech.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href={"/auth/signup"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-primary group w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-2">
                    Join Now - It&apos;s Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
              <Link href={"/auth/signup"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-secondary group w-full sm:w-auto"
                >
                  Watch Demo
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 sm:p-8"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </motion.section>

      {/* GitHub Comparison */}
      <section className="py-16 sm:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Project Hub
              </span>{" "}
              over GitHub?
            </h2>

            <ComparisonTable />
          </motion.div>
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
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Powerful Features for Innovators
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300">
              Everything you need to showcase your projects and grow your career
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 sm:gap-8">
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
      <section className="py-16 sm:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Explore Project Categories
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300">
              Discover amazing projects across different domains
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`glass-card p-6 flex flex-col items-center gap-3 min-w-[200px] ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50"
                    : "hover:bg-white/5"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                <category.icon className="w-8 h-8 text-blue-400" />
                <span className="font-semibold text-lg">{category.name}</span>
                <span className="text-sm text-gray-400">{category.count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Success Stories
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300">
              Join thousands of students who launched their careers through
              Project Hub
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
                  />
                  <div>
                    <h4 className="text-xl font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="text-sm font-medium text-blue-400 bg-blue-500/10 py-2 px-4 rounded-full inline-flex items-center gap-2">
                  <Award className="w-4 h-4" />
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
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Frequently Asked Questions
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300">
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

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>

          <div className="relative bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay Updated with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Project Hub
                  </span>
                </h2>

                <p className="text-gray-300 mb-6">
                  Get weekly updates on trending projects, collaboration
                  opportunities, and tips to showcase your work effectively.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-sm"></div>
                  </div>

                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg shadow-blue-600/20">
                    Subscribe
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>

              <div className="hidden md:block relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30"></div>
                <div className="relative bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Weekly Digest</h3>
                      <p className="text-sm text-gray-400">From Project Hub</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <p className="text-sm">
                        10 trending AI projects this week
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      <p className="text-sm">New collaboration opportunities</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                      <p className="text-sm">Tips for showcasing your work</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Upcoming virtual hackathons</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-12 rounded-2xl backdrop-blur-sm"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Project Hub Today
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start showcasing your projects, connecting with fellow innovators,
            and building your portfolio.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={"/auth/signup"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full"
              >
                Create Your Account
              </Button>
            </Link>
          </motion.div>

          <div className="mt-12 flex justify-center space-x-6">
            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        <div className="mt-16 text-sm text-gray-500">
          <p>© 2025 Project Hub. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
