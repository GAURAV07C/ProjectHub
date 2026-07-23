"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButton from "./back-button";
import { motion } from "framer-motion";

interface CardWraperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  showSocial,
  backButtonLabel,
  headerLabel,
  backButtonHref,
}: CardWraperProps) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0A0A0F]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
        {/* Left Side - Branding (Desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/30">
              <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Project Hub
            </span>
          </h2>
          <p className="text-gray-400 text-center text-lg max-w-md">
            Where innovation takes flight. Join the largest student innovation platform.
          </p>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md lg:w-auto lg:ml-auto"
        >
          <Card className="w-full shadow-2xl bg-white/5 dark:bg-gray-900/80 border-white/10 dark:border-gray-800 backdrop-blur-xl">
            <CardHeader>
              <Header label={headerLabel} />
            </CardHeader>
            <CardContent className="space-y-1">{children}</CardContent>
            {showSocial && (
              <CardFooter>
                <Social />
              </CardFooter>
            )}
            <CardFooter>
              <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CardWrapper;
