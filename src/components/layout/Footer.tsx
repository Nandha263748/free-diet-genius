
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center">
              <span className="mr-2">🥗</span>
              <span>DietGenius</span>
            </Link>
            <p className="mt-2 text-gray-600">
              Your free AI-powered diet and nutrition assistant.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/meal-planner" className="text-gray-600 hover:text-primary transition-colors">
                  AI Meal Planner
                </Link>
              </li>
              <li>
                <Link to="/bmi-calculator" className="text-gray-600 hover:text-primary transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/nutrition-database" className="text-gray-600 hover:text-primary transition-colors">
                  Nutrition Database
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">
                  Nutrition Blog
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-gray-600 hover:text-primary transition-colors">
                  Healthy Recipes
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@dietgenius.com" className="text-gray-600 hover:text-primary transition-colors">
                  support@dietgenius.com
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} DietGenius. All rights reserved.</p>
          <p className="mt-1 text-sm">100% Free, No Premium Restrictions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
