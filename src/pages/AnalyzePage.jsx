import React from 'react';
import { Helmet } from 'react-helmet';
import UploadSection from '@/components/UploadSection';
import DataAnalysisResults from '@/components/DataAnalysisResults';
import useDataAnalysis from '@/hooks/useDataAnalysis';

const AnalyzePage = () => {
  const { analysisData, isAnalyzing, handleFileUpload, handleSampleData, resetAnalysis } = useDataAnalysis();

  return (
    <>
      <Helmet>
        <title>Analyze Data - DataWiz Pro</title>
        <meta name="description" content="Upload your dataset to get instant analysis and insights." />
      </Helmet>
      
      {!analysisData ? (
        <UploadSection 
          onFileUpload={handleFileUpload} 
          onSampleData={handleSampleData}
          isAnalyzing={isAnalyzing} 
        />
      ) : (
        <DataAnalysisResults data={analysisData} onReset={resetAnalysis} />
      )}
    </>
  );
};

export default AnalyzePage;