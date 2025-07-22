import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CtaSection from '@/components/CtaSection';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/analyze');
  };

  return (
    <>
      <Helmet>
        <title>DataWiz Pro - AI-Powered Data Analysis & Insights</title>
        <meta name="description" content="Upload JSON, Excel, or CSV files to get AI-driven data analysis, preprocessing recommendations, EDA insights, and feature engineering strategies." />
      </Helmet>
      <HeroSection />
      <FeaturesSection />
      <CtaSection onUploadClick={handleGetStarted} />
    </>
  );
};

export default LandingPage;