import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader, TestTube2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UploadSection = ({ onFileUpload, onSampleData, isAnalyzing }) => {
  return (
    <section id="upload" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <div className="text-center mb-8">
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Upload className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Upload Your Dataset</h2>
              <p className="text-gray-400">
                Supports JSON, Excel (.xlsx, .xls), and CSV files.
              </p>
            </div>
            
            <div className="relative border-2 border-dashed border-cyan-400/30 rounded-2xl p-12 text-center hover:border-cyan-400/80 transition-colors group">
              <input
                type="file"
                id="file-upload"
                accept=".json,.xlsx,.xls,.csv"
                onChange={onFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isAnalyzing}
              />
              {isAnalyzing ? (
                <div className="flex flex-col items-center">
                  <Loader className="h-12 w-12 text-cyan-400 animate-spin mb-4" />
                  <p className="text-cyan-300 font-medium">Analyzing your data...</p>
                  <p className="text-gray-400 text-sm">Please wait a moment.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FileText className="w-12 h-12 text-cyan-400/60 group-hover:text-cyan-400 transition-colors mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">
                    <span className="text-cyan-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-gray-500 text-sm">
                    Max file size 10MB
                  </p>
                </div>
              )}
            </div>
             <div className="text-center mt-6">
                <p className="text-gray-400 mb-3">Or, try it with a sample dataset:</p>
                <Button variant="secondary" onClick={onSampleData} disabled={isAnalyzing}>
                    <TestTube2 className="w-4 h-4 mr-2" />
                    Use Sample Data
                </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;