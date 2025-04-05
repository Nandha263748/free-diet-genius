
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">About DietGenius</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-lg">
                DietGenius is committed to democratizing access to personalized nutrition planning. 
                We believe that everyone deserves access to high-quality dietary guidance without 
                financial barriers. Our AI-powered platform offers the same features that premium 
                services charge for, completely free of charge.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Project Developer</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-2">
                <li>• Currently developing an AI-powered diet planner as part of my M.Sc. final-year project.</li>
                <li>• Learning and implementing React, TypeScript, and Tailwind CSS to build a responsive web application.</li>
                <li>• Utilizing shadcn/ui components and Tanstack Query for efficient data management.</li>
                <li>• Working on improving user experience and diet recommendation accuracy.</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Frontend</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>React.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>shadcn/ui components</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3">AI & Data Processing</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Custom AI models for meal planning</li>
                    <li>Nutritional database integration</li>
                    <li>Dietary preference algorithms</li>
                    <li>React Query for data management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default About;
