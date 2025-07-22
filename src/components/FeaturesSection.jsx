import React from 'react';
import { motion } from 'framer-motion';
import { Database, BarChart3, TrendingUp, Zap, Brain, Target } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: "Data Profiling",
    description: "Get a bird's-eye view of your data: record counts, column types, and data quality scores.",
    color: "cyan"
  },
  {
    icon: BarChart3,
    title: "Class Breakdown",
    description: "Understand categorical data with frequency distributions and unique value analysis.",
    color: "teal"
  },
  {
    icon: TrendingUp,
    title: "EDA Recommendations",
    description: "Receive AI-driven suggestions for Exploratory Data Analysis to uncover hidden patterns.",
    color: "amber"
  },
  {
    icon: Zap,
    title: "Preprocessing Guide",
    description: "Smart strategies for handling missing values, cleaning data, and preparing it for modeling.",
    color: "sky"
  },
  {
    icon: Brain,
    title: "Feature Engineering",
    description: "Discover ideas for creating impactful new features, encoding, and scaling your data.",
    color: "lime"
  },
  {
    icon: Target,
    title: "Interactive Visuals",
    description: "Don't just read about your data—see it. Interactive charts bring your analysis to life.",
    color: "emerald"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">A Toolkit for Data Mastery</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            From initial cleanup to advanced feature creation, we provide the insights you need at every step.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-${feature.color}-500/20 to-${feature.color}-600/20 rounded-xl mb-6 border border-${feature.color}-500/30`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;