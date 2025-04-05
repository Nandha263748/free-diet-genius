
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from 'lucide-react';

const DeveloperProfile = () => {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-primary/10 p-4 rounded-full mb-4 md:mb-0">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2 text-primary">Project Developer - AI Diet Planner (FoodSense)</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Currently developing an AI-powered diet planner as part of my M.Sc. final-year project.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Learning and implementing React.js and Flask to build a functional web application.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Exploring free AI models for generating personalized meal plans.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Working on improving user experience and diet recommendation accuracy.</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperProfile;
