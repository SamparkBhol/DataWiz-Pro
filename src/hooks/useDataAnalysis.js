
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { useToast } from '@/components/ui/use-toast';

const useDataAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      'application/json',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    const fileName = file.name.toLowerCase();

    if (!allowedTypes.includes(file.type) && !fileName.endsWith('.json') && !fileName.endsWith('.csv') && !fileName.endsWith('.xls') && !fileName.endsWith('.xlsx')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JSON, Excel, or CSV file.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      let data;
      if (fileName.endsWith('.json')) {
        const text = await file.text();
        data = JSON.parse(text);
      } else if (fileName.endsWith('.csv')) {
        const text = await file.text();
        data = parseCSV(text);
      } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        data = XLSX.utils.sheet_to_json(worksheet);
      }

      const analysis = analyzeData(data);
      setAnalysisData(analysis);
      
      toast({
        title: "Analysis Complete! 🎉",
        description: "Your data has been successfully analyzed."
      });
    } catch (error) {
      console.error("Analysis Error: ", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your file. Please check the format.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleData = () => {
    setIsAnalyzing(true);
    try {
        const data = generateSampleData();
        const analysis = analyzeData(data);
        setAnalysisData(analysis);
        toast({
            title: "Sample Analysis Ready! 🚀",
            description: "Explore the features with our sample dataset."
        });
    } catch (error) {
        toast({
            title: "Sample Data Error",
            description: "Could not generate sample data analysis.",
            variant: "destructive"
        });
    } finally {
        setIsAnalyzing(false);
    }
  };
  
  const resetAnalysis = () => {
    setAnalysisData(null);
  };

  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i] ? values[i].trim() : '';
        return obj;
      }, {});
    });
  };

  const generateSampleData = () => {
    return Array.from({ length: 150 }, (_, i) => ({
      order_id: `ORD-${1001 + i}`,
      product_category: ['Electronics', 'Apparel', 'Groceries', 'Books', 'Home Goods'][Math.floor(Math.random() * 5)],
      price: (Math.random() * 200 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 5) + 1,
      customer_rating: Math.random() > 0.1 ? (Math.random() * 4 + 1).toFixed(1) : null,
      order_date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      is_returned: Math.random() > 0.85 ? 'Yes' : 'No'
    }));
  };

  const analyzeData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid or empty data array");
    }

    const totalRecords = data.length;
    const columns = Object.keys(data[0] || {});
    const columnTypes = {};
    const classBreakdown = {};
    const missingValues = {};
    
    columns.forEach(col => {
      let nonNullCount = 0;
      let numericCount = 0;
      let dateCount = 0;
      const values = data.map(row => row[col]);

      values.forEach(val => {
          if (val !== null && val !== undefined && val !== '') {
              nonNullCount++;
              if(!isNaN(val) && !isNaN(parseFloat(val))) numericCount++;
              if(!isNaN(Date.parse(val)) && val.length > 6) dateCount++;
          }
      });
      
      missingValues[col] = totalRecords - nonNullCount;

      if (nonNullCount > 0) {
        if(dateCount / nonNullCount > 0.8) {
             columnTypes[col] = 'datetime';
        } else if (numericCount / nonNullCount > 0.8) {
            columnTypes[col] = 'numeric';
        } else {
            columnTypes[col] = 'categorical';
        }
        
        if (columnTypes[col] === 'categorical') {
          classBreakdown[col] = values.reduce((acc, val) => {
            if (val !== null && val !== undefined && val !== '') {
              acc[val] = (acc[val] || 0) + 1;
            }
            return acc;
          }, {});
        }
      } else {
        columnTypes[col] = 'empty';
      }
    });

    return {
      totalRecords,
      totalColumns: columns.length,
      columns,
      columnTypes,
      classBreakdown,
      missingValues,
      dataQuality: calculateDataQuality(data, missingValues, totalRecords),
      recommendations: generateRecommendations(columnTypes, classBreakdown, missingValues, totalRecords)
    };
  };

  const calculateDataQuality = (data, missingValues, totalRecords) => {
    const totalCells = totalRecords * Object.keys(data[0] || {}).length;
    if (totalCells === 0) return 100;
    const totalMissing = Object.values(missingValues).reduce((sum, count) => sum + count, 0);
    return Math.round(((totalCells - totalMissing) / totalCells) * 100);
  };

  const generateRecommendations = (columnTypes, classBreakdown, missingValues, totalRecords) => {
    const recommendations = { preprocessing: [], eda: [], featureEngineering: [] };

    Object.entries(missingValues).forEach(([col, missing]) => {
      if (missing > 0) {
        const percentage = Math.round((missing / totalRecords) * 100);
        if (percentage > 50) {
          recommendations.preprocessing.push(`High missing values in '${col}' (${percentage}%). Consider removing this column.`);
        } else {
          recommendations.preprocessing.push(`Impute missing values in '${col}' (${percentage}%) using mean, median, or a model-based approach.`);
        }
      }
    });

    Object.entries(columnTypes).forEach(([col, type]) => {
      if (type === 'numeric') {
        recommendations.eda.push(`Visualize the distribution of '${col}' with a histogram to check for skewness.`);
        recommendations.eda.push(`Use a box plot for '${col}' to identify potential outliers.`);
      } else if (type === 'categorical') {
        const uniqueCount = classBreakdown[col] ? Object.keys(classBreakdown[col]).length : 0;
        recommendations.eda.push(`Analyze category frequencies in '${col}' with a bar chart.`);
        if (uniqueCount > 10) {
          recommendations.eda.push(`'${col}' has high cardinality (${uniqueCount} values). Consider grouping rare categories.`);
        }
      }
    });

    const numericCols = Object.keys(columnTypes).filter(col => columnTypes[col] === 'numeric');
    if (numericCols.length > 1) {
        recommendations.eda.push(`Explore relationships between numeric features like '${numericCols[0]}' and '${numericCols[1]}' using a scatter plot.`);
    }

    if (numericCols.length > 0) {
        recommendations.featureEngineering.push(`Apply scaling (StandardScaler or MinMaxScaler) to numeric columns to normalize their ranges.`);
    }

    const categoricalCols = Object.keys(columnTypes).filter(col => columnTypes[col] === 'categorical');
    if (categoricalCols.length > 0) {
        recommendations.featureEngineering.push(`Encode categorical features like '${categoricalCols[0]}' using one-hot or label encoding.`);
    }
    
    const datetimeCols = Object.keys(columnTypes).filter(col => columnTypes[col] === 'datetime');
    if (datetimeCols.length > 0) {
        recommendations.featureEngineering.push(`Extract new features (e.g., year, month, day of week) from '${datetimeCols[0]}'.`);
    }

    return recommendations;
  };

  return { analysisData, isAnalyzing, handleFileUpload, handleSampleData, resetAnalysis };
};

export default useDataAnalysis;
