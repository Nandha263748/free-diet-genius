
import React from 'react';
import Layout from '@/components/layout/Layout';

const Blog = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Nutrition Blog</h1>
        <p className="text-lg mb-6">
          Stay informed with the latest nutrition research, diet trends, and healthy eating tips.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600">Our first blog posts are coming soon! Check back for nutritional insights and healthy eating tips.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
