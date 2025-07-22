import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Database, AlertTriangle, CheckCircle, TrendingUp, Zap, Brain, ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ['#22d3ee', '#14b8a6', '#f59e0b', '#f97316', '#10b981', '#eab308'];

const DataAnalysisResults = ({ data, onReset }) => {
  const [selectedColumn, setSelectedColumn] = useState(null);

  const {
    totalRecords,
    totalColumns,
    columns,
    columnTypes,
    classBreakdown,
    missingValues,
    dataQuality,
    recommendations
  } = data;

  const handleColumnSelect = (column) => {
    setSelectedColumn(column);
  };

  const handleCloseModal = () => {
    setSelectedColumn(null);
  };

  const renderColumnDetails = () => {
    if (!selectedColumn) return null;

    const type = columnTypes[selectedColumn];
    const missing = missingValues[selectedColumn];
    const breakdown = classBreakdown[selectedColumn];
    const chartData = breakdown ? Object.entries(breakdown).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value) : [];

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-cyan-500/30 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative"
          >
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={handleCloseModal}>
              <Minimize2 className="w-6 h-6" />
            </Button>

            <h2 className="text-3xl font-bold text-cyan-400 mb-2">{selectedColumn}</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block mb-6 ${
              type === 'numeric' 
                ? 'bg-sky-500/20 text-sky-300' 
                : type === 'categorical'
                ? 'bg-teal-500/20 text-teal-300'
                : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {type}
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <p className="text-lg"><strong className="font-semibold text-white">Missing Values:</strong> <span className="text-amber-400">{missing} ({Math.round((missing/totalRecords)*100)}%)</span></p>
                {breakdown && <p className="text-lg"><strong className="font-semibold text-white">Unique Values:</strong> <span className="text-sky-400">{Object.keys(breakdown).length}</span></p>}
            </div>

            {type === 'categorical' && breakdown && chartData.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Category Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData.slice(0, 15)} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis type="number" stroke="#9ca3af" />
                      <YAxis type="category" dataKey="name" width={100} stroke="#9ca3af" tick={{fontSize: 12}}/>
                      <Tooltip
                        contentStyle={{
                          background: "rgba(15, 23, 42, 0.9)",
                          borderColor: "#06b6d4",
                          color: "white"
                        }}
                      />
                      <Bar dataKey="value" fill="#22d3ee" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={onReset}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Analyze New Data
            </Button>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                Analysis Dashboard
              </h1>
              <p className="text-lg text-gray-400">An interactive overview of your dataset.</p>
            </motion.div>
            <div></div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="columns">Column Details</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-800/50 border-cyan-500/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Total Records</CardTitle>
                    <Database className="h-4 w-4 text-cyan-400" />
                  </CardHeader>
                  <CardContent><div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div></CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-teal-500/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Total Columns</CardTitle>
                    <BarChart3 className="h-4 w-4 text-teal-400" />
                  </CardHeader>
                  <CardContent><div className="text-2xl font-bold">{totalColumns}</div></CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-emerald-500/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Data Quality Score</CardTitle>
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </CardHeader>
                  <CardContent><div className="text-2xl font-bold">{dataQuality}%</div></CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-amber-500/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Total Missing Values</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  </CardHeader>
                  <CardContent><div className="text-2xl font-bold">{Object.values(missingValues).reduce((a, b) => a + b, 0)}</div></CardContent>
                </Card>
            </div>
            <Card className="mt-6 bg-slate-800/50 border-slate-700/50">
                <CardHeader><CardTitle className="text-cyan-300">Data Types Distribution</CardTitle></CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={Object.entries(Object.values(columnTypes).reduce((acc, type) => { acc[type] = (acc[type] || 0) + 1; return acc; }, {})).map(([name, value]) => ({name, value}))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                                {Object.keys(Object.values(columnTypes).reduce((acc, type) => { acc[type] = (acc[type] || 0) + 1; return acc; }, {})).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: "rgba(15, 23, 42, 0.9)", borderColor: "#06b6d4", color: "white" }} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="columns">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {columns.map((column) => (
                <motion.div key={column} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(34, 211, 238, 0.1)" }} className="cursor-pointer" onClick={() => handleColumnSelect(column)}>
                  <Card className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/50 transition-colors duration-300">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center text-lg">
                        <span className="truncate text-white">{column}</span>
                        <Maximize2 className="w-5 h-5 text-gray-500" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        columnTypes[column] === 'numeric' ? 'bg-sky-500/20 text-sky-300' :
                        columnTypes[column] === 'categorical' ? 'bg-teal-500/20 text-teal-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {columnTypes[column]}
                      </span>
                      {missingValues[column] > 0 && (
                        <div className="flex items-center gap-2 text-amber-400 text-sm mt-2">
                          <AlertTriangle className="w-4 h-4" />
                          {missingValues[column]} missing
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { title: "Data Preprocessing", icon: Zap, recs: recommendations.preprocessing, color: "amber" },
                { title: "EDA Techniques", icon: TrendingUp, recs: recommendations.eda, color: "teal" },
                { title: "Feature Engineering", icon: Brain, recs: recommendations.featureEngineering, color: "cyan" },
              ].map((recType, i) => (
                <Card key={i} className={`bg-slate-800/50 border-${recType.color}-500/30`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-3 text-${recType.color}-400`}>
                      <recType.icon className="w-6 h-6" />
                      {recType.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recType.recs.length > 0 ? (
                      recType.recs.map((rec, index) => (
                        <div key={index} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-gray-300 text-sm">{rec}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm italic">No specific recommendations.</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {renderColumnDetails()}
    </motion.section>
  );
};

export default DataAnalysisResults;