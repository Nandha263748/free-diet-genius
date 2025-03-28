
import React from 'react';
import Layout from '@/components/layout/Layout';
import BMICalculator from '@/components/health/BMICalculator';

const BMICalculatorPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) and daily calorie needs based on your height, weight, age, and activity level.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <BMICalculator />
        </div>
      </div>
    </Layout>
  );
};

export default BMICalculatorPage;
