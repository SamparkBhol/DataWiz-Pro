import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, TrendingUp } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Suspense>
        </Canvas>
      </div>
       <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative container mx-auto px-4 py-24 md:py-32 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block bg-cyan-500/10 text-cyan-400 text-sm font-semibold px-4 py-1 rounded-full mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AI-Powered Data Insights
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-6 tracking-tighter">
            DataWiz Pro
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Instantly transform raw data into a strategic asset. Upload your dataset to unlock automated analysis, visualizations, and actionable recommendations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.div whileHover={{y:-5}} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <Database className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium">Data Profiling</span>
            </motion.div>
            <motion.div whileHover={{y:-5}} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-medium">EDA Insights</span>
            </motion.div>
            <motion.div whileHover={{y:-5}} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <Brain className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">Feature Engineering</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;