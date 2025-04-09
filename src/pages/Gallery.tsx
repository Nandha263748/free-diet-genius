
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
  
  // Updated photos with more realistic images directly related to diet/nutrition
  const photos = [
    {
      id: 1,
      title: "Homepage of DietGenius",
      description: "Featuring a vibrant hero section with a colorful meal plan preview, green 'Get Started' button, and welcoming tagline",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800", // Healthy food layout on table
      category: "ui"
    },
    {
      id: 2,
      title: "Meal Plan Preview",
      description: "Displaying a daily schedule with breakfast (oatmeal), lunch (grilled chicken salad), and dinner (salmon with quinoa)",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800", // Meal prep containers
      category: "features"
    },
    {
      id: 3,
      title: "Testimonial Card",
      description: "Featuring a user quote: 'I've never felt so energized—DietGenius fits my vegan lifestyle perfectly!'",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800", // Person preparing healthy food
      category: "ui"
    },
    {
      id: 4,
      title: "DietGenius on Mobile",
      description: "Photo of a user accessing DietGenius on a smartphone, mirroring the website's responsive mobile view",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", // Mobile phone with food app
      category: "ui"
    },
    {
      id: 5,
      title: "Tech Stack Infographic",
      description: "Inspired by DietGenius's footer, with icons for React, Tailwind CSS, and TypeScript in a green-themed layout",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", // Computer with code
      category: "infographics"
    },
    {
      id: 6,
      title: "Nutrient-Dense Foods Pyramid",
      description: "Showing a pyramid of nutrient-dense foods like fruits, veggies, and lean proteins in green tones",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800", // Variety of vegetables in a pyramid-like arrangement
      category: "infographics"
    },
    {
      id: 7,
      title: "Macronutrient Pie Chart",
      description: "Showing a sample day's breakdown: 50% carbs, 30% protein, 20% fat",
      image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800", // Food divided into sections like a chart
      category: "infographics"
    },
    {
      id: 8,
      title: "Caloric Needs Dashboard",
      description: "Displaying a user's TDEE and goal-adjusted target with a green progress bar",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800", // Person tracking fitness on device
      category: "features"
    },
    {
      id: 9,
      title: "Health Benefits Graphic",
      description: "Showing icons for heart, brain, and energy with green checkmarks",
      image: "https://images.unsplash.com/photo-1505576633757-0ac1084af824?w=800", // Healthy heart foods
      category: "infographics"
    },
    {
      id: 10,
      title: "Personalization Settings",
      description: "Showing sliders for activity level and dietary preferences in a green-themed UI",
      image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=800", // Organized healthy food choices
      category: "ui"
    },
    {
      id: 11,
      title: "Diet Planning Evolution Timeline",
      description: "Showing diet planning evolution from paper logs to AI apps, with a green arrow pointing to DietGenius",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800", // Paper notes to mobile apps transition
      category: "infographics"
    },
    {
      id: 12,
      title: "AI Flowchart",
      description: "Showing user input → AI processing → personalized meal plan in a green-themed layout",
      image: "https://images.unsplash.com/photo-1550645612-83f5d594b671?w=800", // AI or technology visualization
      category: "tech"
    },
    {
      id: 14,
      title: "Future Trends Collage",
      description: "Showing icons for wearables, microbiome, and sustainability in a green futuristic layout",
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800", // Person with fitness tracker
      category: "infographics"
    },
    {
      id: 15,
      title: "Objectives Infographic",
      description: "Showing icons for 'Free Access,' 'AI Personalization,' and 'Health Goals' in a green circular layout",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800", // Healthy food circle arrangement
      category: "infographics"
    },
    {
      id: 16,
      title: "Architecture Diagram",
      description: "Showing React frontend → mock backend → local storage in a green flowchart",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800", // Code on a screen
      category: "tech"
    },
    {
      id: 17,
      title: "Feature Showcase",
      description: "Displaying a grid of 'Meal Planner,' 'BMI Calculator,' and 'Recipes' with green icons",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800", // Organized healthy meal
      category: "features"
    },
    {
      id: 18,
      title: "UI Mockup",
      description: "Showing the meal plan page with a daily schedule, green 'Edit' buttons, and nutrition breakdown bars",
      image: "https://images.unsplash.com/photo-1510832198440-a52376950479?w=800", // Design mockup on a screen
      category: "ui"
    },
    {
      id: 19,
      title: "Code Snippet Screenshot",
      description: "From DietGenius's dev docs, showing a MealCard component with TypeScript props and Tailwind classes",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800", // Code on a computer screen
      category: "tech"
    },
    {
      id: 20,
      title: "Meal Planner UI Screenshot",
      description: "Showing a daily plan with green 'Edit' buttons and nutritional bars",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800", // Food planner layout
      category: "ui"
    },
    {
      id: 21,
      title: "Performance Dashboard",
      description: "Showing a green 'Load Time: 1.2s' metric and optimization checklist",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", // Dashboard metrics
      category: "tech"
    },
    {
      id: 22,
      title: "Testing Screenshot",
      description: "From DietGenius's dev log, showing a Jest test suite with green 'Passed' indicators",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800", // People working on software
      category: "tech"
    },
    {
      id: 23,
      title: "Performance Report",
      description: "Showing a green Lighthouse score card with 'Load Time: 1.2s' and 'Performance: 92'",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", // Performance metrics visualization
      category: "tech"
    },
    {
      id: 24,
      title: "Feedback Form",
      description: "Showing a green 'Submit' button and comments like 'Love the simplicity!'",
      image: "https://images.unsplash.com/photo-1594578930365-18a6bc09ec38?w=800", // Person filling out form
      category: "ui"
    },
    {
      id: 25,
      title: "Database Mockup",
      description: "Showing a green 'Scan Barcode' button and food entry form",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800", // Food inventory or tracking
      category: "features"
    },
    {
      id: 26,
      title: "Mobile App Mockup",
      description: "Showing a green-themed plan screen on a phone with a 'Next Meal' notification",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800", // Mobile phone with food app
      category: "ui"
    },
    {
      id: 27,
      title: "Final Website Screenshot",
      description: "Showing a happy user with a healthy meal and green 'Join Free' CTA",
      image: "https://images.unsplash.com/photo-1530981785497-a62037228fe9?w=800", // Person happy with healthy meal
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
