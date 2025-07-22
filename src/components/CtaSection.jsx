import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CtaSection = ({ onUploadClick }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/[0.1] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Unlock Your Data's Potential?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Get started in seconds. Upload your dataset and let our AI do the heavy lifting.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onUploadClick}
                size="lg"
                className="bg-white text-cyan-600 hover:bg-gray-200 px-8 py-6 text-lg font-semibold"
              >
                Start Analysis Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;