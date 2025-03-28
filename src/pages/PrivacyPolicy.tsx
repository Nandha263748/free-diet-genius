
import React from 'react';
import Layout from '@/components/layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p>
            At DietGenius, we respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information when you use our application.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you create an account, 
            generate meal plans, or interact with our features. This may include your name, email address, 
            dietary preferences, and health information that you choose to share.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
          <p>
            We use your information to provide and improve our services, including generating personalized 
            meal plans, storing your preferences, and enhancing your user experience.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our data practices, please contact us at 
            support@dietgenius.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
