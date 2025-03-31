
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Macronutrients: The Building Blocks of Nutrition',
    excerpt: 'Learn how proteins, carbohydrates, and fats work together to fuel your body and support your health goals.',
    author: 'Dr. Sarah Johnson',
    authorRole: 'Nutritionist',
    date: 'June 15, 2023',
    category: 'Nutrition Basics',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800'
  },
  {
    id: 2,
    title: 'How to Read Nutrition Labels Like a Pro',
    excerpt: 'Decode the information on food packaging to make healthier choices for you and your family.',
    author: 'Michael Zhang',
    authorRole: 'Dietitian',
    date: 'July 3, 2023',
    category: 'Food Science',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'
  },
  {
    id: 3,
    title: 'Meal Timing: Does When You Eat Matter?',
    excerpt: 'Exploring the science behind meal timing and its effects on metabolism, weight management, and overall health.',
    author: 'Lisa Patel',
    authorRole: 'Health Researcher',
    date: 'August 22, 2023',
    category: 'Diet Strategies',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
  }
];

const Blog = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Nutrition Blog</h1>
        <p className="text-lg mb-10 text-gray-600">
          Stay informed with the latest nutrition research, diet trends, and healthy eating tips.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center mt-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>{post.author.split(' ').map(name => name[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.authorRole}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">More articles coming soon! Check back regularly for fresh nutrition content.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
