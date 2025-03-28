
import React from 'react';
import Layout from '@/components/layout/Layout';

const FAQ = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-medium mb-2">Is DietGenius really free?</h3>
            <p>Yes! DietGenius is completely free to use with no premium restrictions or hidden fees.</p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-xl font-medium mb-2">How does the AI meal planner work?</h3>
            <p>Our AI analyzes your dietary preferences, restrictions, and goals to create personalized meal plans tailored specifically to your needs.</p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-xl font-medium mb-2">Can I customize the meal plans?</h3>
            <p>Absolutely! You can customize any meal in your plan or regenerate specific days to better suit your preferences.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
