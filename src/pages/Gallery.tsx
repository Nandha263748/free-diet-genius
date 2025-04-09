
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Updated photos with more realistic images matching their descriptions
  const photos = [
    {
      id: 1,
      title: "Homepage of DietGenius",
      description: "Featuring a vibrant hero section with a colorful meal plan preview, green 'Get Started' button, and welcoming tagline",
      image: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800",
      category: "ui"
    },
    {
      id: 2,
      title: "Meal Plan Preview",
      description: "Displaying a daily schedule with breakfast (oatmeal), lunch (grilled chicken salad), and dinner (salmon with quinoa)",
      image: "https://images.unsplash.com/photo-1547592180-85f173990888?w=800",
      category: "features"
    },
    {
      id: 3,
      title: "Testimonial Card",
      description: "Featuring a user quote: 'I've never felt so energized—DietGenius fits my vegan lifestyle perfectly!'",
      image: "https://images.unsplash.com/photo-1551847677-dc82d764e1eb?w=800",
      category: "ui"
    },
    {
      id: 4,
      title: "DietGenius on Mobile",
      description: "Photo of a user accessing DietGenius on a smartphone, mirroring the website's responsive mobile view",
      image: "https://images.unsplash.com/photo-1550367083-9fa5411cb303?w=800",
      category: "ui"
    },
    {
      id: 5,
      title: "Tech Stack Infographic",
      description: "Inspired by DietGenius's footer, with icons for React, Tailwind CSS, and TypeScript in a green-themed layout",
      image: "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=800",
      category: "infographics"
    },
    {
      id: 6,
      title: "Nutrient-Dense Foods Pyramid",
      description: "Showing a pyramid of nutrient-dense foods like fruits, veggies, and lean proteins in green tones",
      image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800",
      category: "infographics"
    },
    {
      id: 7,
      title: "Macronutrient Pie Chart",
      description: "Showing a sample day's breakdown: 50% carbs, 30% protein, 20% fat",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
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
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      category: "infographics"
    },
    {
      id: 10,
      title: "Personalization Settings",
      description: "Showing sliders for activity level and dietary preferences in a green-themed UI",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800",
      category: "ui"
    },
    {
      id: 11,
      title: "Diet Planning Evolution Timeline",
      description: "Showing diet planning evolution from paper logs to AI apps, with a green arrow pointing to DietGenius",
      image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800",
      category: "infographics"
    },
    {
      id: 12,
      title: "AI Flowchart",
      description: "Showing user input → AI processing → personalized meal plan in a green-themed layout",
      image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800",
      category: "tech"
    },
    {
      id: 14,
      title: "Future Trends Collage",
      description: "Showing icons for wearables, microbiome, and sustainability in a green futuristic layout",
      image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800",
      category: "infographics"
    },
    {
      id: 15,
      title: "Objectives Infographic",
      description: "Showing icons for 'Free Access,' 'AI Personalization,' and 'Health Goals' in a green circular layout",
      image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800",
      category: "infographics"
    },
    {
      id: 16,
      title: "Architecture Diagram",
      description: "Showing React frontend → mock backend → local storage in a green flowchart",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
      category: "tech"
    },
    {
      id: 17,
      title: "Feature Showcase",
      description: "Displaying a grid of 'Meal Planner,' 'BMI Calculator,' and 'Recipes' with green icons",
      image: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=800",
      category: "features"
    },
    {
      id: 18,
      title: "UI Mockup",
      description: "Showing the meal plan page with a daily schedule, green 'Edit' buttons, and nutrition breakdown bars",
      image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800",
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
      image: "https://images.unsplash.com/photo-1499744937866-d7e566a20a61?w=800",
      category: "ui"
    },
    {
      id: 21,
      title: "Performance Dashboard",
      description: "Showing a green 'Load Time: 1.2s' metric and optimization checklist",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      category: "tech"
    },
    {
      id: 22,
      title: "Testing Screenshot",
      description: "From DietGenius's dev log, showing a Jest test suite with green 'Passed' indicators",
      image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=800",
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
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800",
      category: "ui"
    },
    {
      id: 25,
      title: "Database Mockup",
      description: "Showing a green 'Scan Barcode' button and food entry form",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
      category: "features"
    },
    {
      id: 26,
      title: "Mobile App Mockup",
      description: "Showing a green-themed plan screen on a phone with a 'Next Meal' notification",
      image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?w=800",
      category: "ui"
    },
    {
      id: 27,
      title: "Final Website Screenshot",
      description: "Showing a happy user with a healthy meal and green 'Join Free' CTA",
      image: "https://images.unsplash.com/photo-1530831014493-cbe3a60405c5?w=800",
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

  const getFilteredPhotos = (category: string) => {
    if (category === "all") return photos;
    return photos.filter(photo => photo.category === category);
  };

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const getSelectedImage = () => {
    if (selectedImage === null) return null;
    return photos.find(photo => photo.id === selectedImage);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">DietGenius Gallery</h1>
        <p className="mb-8 text-muted-foreground">
          This gallery showcases visual representations of DietGenius features, UI components, 
          and informational graphics. Each image corresponds to a specific aspect 
          of the DietGenius platform and is designed to help you understand our service better.
        </p>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6 flex flex-wrap justify-center">
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
                  <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative cursor-pointer" onClick={() => handleImageClick(photo.id)}>
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={photo.image} 
                          alt={photo.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="h-10 w-10 text-white" />
                        </div>
                      </div>
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

        {/* Featured Images Carousel */}
        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6">Featured Images</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {photos.filter(p => [2, 6, 9, 17, 20].includes(p.id)).map(photo => (
                <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <div className="relative cursor-pointer" onClick={() => handleImageClick(photo.id)}>
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={photo.image} 
                            alt={photo.title}
                            className="object-cover w-full h-full" 
                          />
                        </AspectRatio>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm">{photo.title}</h3>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
        
        {/* Image Detail Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={open => !open && handleCloseDialog()}>
          <DialogContent className="max-w-4xl w-full">
            <DialogHeader>
              <DialogTitle>{getSelectedImage()?.title}</DialogTitle>
              <DialogDescription>{getSelectedImage()?.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <img 
                src={getSelectedImage()?.image} 
                alt={getSelectedImage()?.title} 
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleCloseDialog}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Gallery;
