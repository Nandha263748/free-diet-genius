
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Gallery = () => {
  // Updated photos with more specific descriptions and better categorization
  const photos = [
    {
      id: 1,
      title: "Homepage of DietGenius",
      description: "Featuring a vibrant hero section with a colorful meal plan preview, green 'Get Started' button, and welcoming tagline",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
      category: "ui"
    },
    {
      id: 2,
      title: "Meal Plan Preview",
      description: "Displaying a daily schedule with breakfast (oatmeal), lunch (grilled chicken salad), and dinner (salmon with quinoa)",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      category: "features"
    },
    {
      id: 3,
      title: "Testimonial Card",
      description: "Featuring a user quote: 'I've never felt so energized—DietGenius fits my vegan lifestyle perfectly!'",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
      category: "ui"
    },
    {
      id: 4,
      title: "DietGenius on Mobile",
      description: "Photo of a user accessing DietGenius on a smartphone, mirroring the website's responsive mobile view",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      category: "ui"
    },
    {
      id: 5,
      title: "Tech Stack Infographic",
      description: "Inspired by DietGenius's footer, with icons for React, Tailwind CSS, and TypeScript in a green-themed layout",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      category: "infographics"
    },
    {
      id: 6,
      title: "Nutrient-Dense Foods Pyramid",
      description: "Showing a pyramid of nutrient-dense foods like fruits, veggies, and lean proteins in green tones",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800",
      category: "infographics"
    },
    {
      id: 7,
      title: "Macronutrient Pie Chart",
      description: "Showing a sample day's breakdown: 50% carbs, 30% protein, 20% fat",
      image: "https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?w=800",
      category: "infographics"
    },
    {
      id: 8,
      title: "Caloric Needs Dashboard",
      description: "Displaying a user's TDEE and goal-adjusted target with a green progress bar",
      image: "https://images.unsplash.com/photo-1593621517331-000e46d3627b?w=800",
      category: "features"
    },
    {
      id: 9,
      title: "Health Benefits Graphic",
      description: "Showing icons for heart, brain, and energy with green checkmarks",
      image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=800",
      category: "infographics"
    },
    {
      id: 10,
      title: "Personalization Settings",
      description: "Showing sliders for activity level and dietary preferences in a green-themed UI",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      category: "ui"
    },
    {
      id: 11,
      title: "Diet Planning Evolution Timeline",
      description: "Showing diet planning evolution from paper logs to AI apps, with a green arrow pointing to DietGenius",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800",
      category: "infographics"
    },
    {
      id: 12,
      title: "AI Flowchart",
      description: "Showing user input → AI processing → personalized meal plan in a green-themed layout",
      image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800",
      category: "tech"
    },
    {
      id: 14,
      title: "Future Trends Collage",
      description: "Showing icons for wearables, microbiome, and sustainability in a green futuristic layout",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800",
      category: "infographics"
    },
    {
      id: 15,
      title: "Objectives Infographic",
      description: "Showing icons for 'Free Access,' 'AI Personalization,' and 'Health Goals' in a green circular layout",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800",
      category: "infographics"
    },
    {
      id: 16,
      title: "Architecture Diagram",
      description: "Showing React frontend → mock backend → local storage in a green flowchart",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800",
      category: "tech"
    },
    {
      id: 17,
      title: "Feature Showcase",
      description: "Displaying a grid of 'Meal Planner,' 'BMI Calculator,' and 'Recipes' with green icons",
      image: "https://images.unsplash.com/photo-1559149251-e9a1dc89f0ef?w=800",
      category: "features"
    },
    {
      id: 18,
      title: "UI Mockup",
      description: "Showing the meal plan page with a daily schedule, green 'Edit' buttons, and nutrition breakdown bars",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800",
      category: "ui"
    },
    {
      id: 19,
      title: "Code Snippet Screenshot",
      description: "From DietGenius's dev docs, showing a MealCard component with TypeScript props and Tailwind classes",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
      category: "tech"
    },
    {
      id: 20,
      title: "Meal Planner UI Screenshot",
      description: "Showing a daily plan with green 'Edit' buttons and nutritional bars",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800",
      category: "ui"
    },
    {
      id: 21,
      title: "Performance Dashboard",
      description: "Showing a green 'Load Time: 1.2s' metric and optimization checklist",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
      category: "tech"
    },
    {
      id: 22,
      title: "Testing Screenshot",
      description: "From DietGenius's dev log, showing a Jest test suite with green 'Passed' indicators",
      image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800",
      category: "tech"
    },
    {
      id: 23,
      title: "Performance Report",
      description: "Showing a green Lighthouse score card with 'Load Time: 1.2s' and 'Performance: 92'",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      category: "tech"
    },
    {
      id: 24,
      title: "Feedback Form",
      description: "Showing a green 'Submit' button and comments like 'Love the simplicity!'",
      image: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?w=800",
      category: "ui"
    },
    {
      id: 25,
      title: "Database Mockup",
      description: "Showing a green 'Scan Barcode' button and food entry form",
      image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=800",
      category: "features"
    },
    {
      id: 26,
      title: "Mobile App Mockup",
      description: "Showing a green-themed plan screen on a phone with a 'Next Meal' notification",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      category: "ui"
    },
    {
      id: 27,
      title: "Final Website Screenshot",
      description: "Showing a happy user with a healthy meal and green 'Join Free' CTA",
      image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800",
      category: "ui"
    }
  ];

  const categories = [
    { id: "all", name: "All Images" },
    { id: "ui", name: "UI/UX" },
    { id: "infographics", name: "Infographics" },
    { id: "features", name: "Features" },
    { id: "tech", name: "Technical" }
  ];

  // Updated filter function that uses the category property
  const getFilteredPhotos = (category: string) => {
    if (category === "all") return photos;
    return photos.filter(photo => photo.category === category);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">DietGenius Gallery</h1>
        <p className="mb-8 text-muted-foreground">
          This gallery showcases visual representations of DietGenius features, UI components, 
          and informational graphics as requested. Each image corresponds to a specific aspect 
          of the DietGenius platform.
        </p>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredPhotos(category.id).map(photo => (
                  <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={photo.image} 
                          alt={photo.title}
                          className="object-cover w-full h-full" 
                        />
                      </AspectRatio>
                      <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
                        Figure {photo.id}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                      <p className="text-sm text-muted-foreground">{photo.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Gallery;
