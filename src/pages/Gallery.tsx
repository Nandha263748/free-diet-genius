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
  
  const photos = [
    {
      id: 1,
      title: "Balanced Meal Plate",
      description: "A perfectly portioned plate with lean protein, healthy carbs, and colorful vegetables following the DietGenius meal principles",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
      category: "meals"
    },
    {
      id: 2,
      title: "Weekly Meal Prep",
      description: "Organized meal preparation in containers showcasing DietGenius meal planning in action",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800",
      category: "meals"
    },
    {
      id: 3,
      title: "Nutrient-Rich Breakfast",
      description: "A protein-packed breakfast bowl with fruits, nuts and yogurt as recommended in DietGenius morning meal plans",
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800",
      category: "meals"
    },
    {
      id: 4,
      title: "DietGenius Mobile Experience",
      description: "User tracking nutrition information using the DietGenius mobile-responsive interface",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800",
      category: "app"
    },
    {
      id: 5,
      title: "Nutrition Calculator Interface",
      description: "Screenshot of DietGenius nutrition calculator showing macronutrient breakdown",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800",
      category: "app"
    },
    {
      id: 6,
      title: "Vegetable-Forward Diet",
      description: "Fresh produce arrangement highlighting the plant-based options available in DietGenius meal plans",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800",
      category: "nutrition"
    },
    {
      id: 7,
      title: "Macronutrient Distribution",
      description: "Visual representation of optimal macronutrient balance as calculated by DietGenius algorithms",
      image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800",
      category: "nutrition"
    },
    {
      id: 8,
      title: "Caloric Intake Tracking",
      description: "DietGenius dashboard showing daily calorie goal vs. actual consumption with progress visualization",
      image: "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?w=800",
      category: "app"
    },
    {
      id: 9,
      title: "Heart-Healthy Foods",
      description: "Collection of heart-healthy foods recommended by DietGenius for cardiovascular wellness",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
      category: "nutrition"
    },
    {
      id: 10,
      title: "Personalized Diet Settings",
      description: "DietGenius preference configuration screen showing dietary restriction options",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
      category: "app"
    },
    {
      id: 11,
      title: "Nutrition Planning Evolution",
      description: "The journey from traditional diet planning to DietGenius AI-assisted approach",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800",
      category: "nutrition"
    },
    {
      id: 12,
      title: "AI-Driven Meal Suggestions",
      description: "Visualization of how DietGenius AI analyzes nutritional needs to generate personalized meal recommendations",
      image: "https://images.unsplash.com/photo-1566598359998-62217fd5c588?w=800",
      category: "app"
    },
    {
      id: 13,
      title: "Weight Management Journey",
      description: "Before and after results from a DietGenius user showing successful weight management",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      category: "success"
    },
    {
      id: 14,
      title: "Hydration Tracking",
      description: "DietGenius water intake monitoring feature helping users maintain optimal hydration",
      image: "https://images.unsplash.com/photo-1560787313-5dff3307e257?w=800",
      category: "nutrition"
    },
    {
      id: 15,
      title: "Nutrition Goals Dashboard",
      description: "DietGenius user dashboard showing progress toward customized nutrition objectives",
      image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800",
      category: "app"
    },
    {
      id: 16,
      title: "Healthy Recipe Collection",
      description: "Screenshot of DietGenius recipe library with nutritionally-balanced meal options",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
      category: "meals"
    },
    {
      id: 17,
      title: "Portion Control Guide",
      description: "Visual guide showing proper portion sizes as recommended by DietGenius nutritionists",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
      category: "nutrition"
    },
    {
      id: 18,
      title: "Weekly Meal Schedule",
      description: "DietGenius weekly meal planner interface showing balanced nutrition across seven days",
      image: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=800",
      category: "app"
    },
    {
      id: 19,
      title: "Nutrition Label Scanner",
      description: "DietGenius mobile feature scanning food labels to instantly add items to daily tracking",
      image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800",
      category: "app"
    },
    {
      id: 20,
      title: "Healthy Protein Sources",
      description: "Variety of lean protein options recommended in DietGenius meal plans",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
      category: "nutrition"
    },
    {
      id: 21,
      title: "Restaurant Meal Analyzer",
      description: "DietGenius feature helping users make healthier choices when dining out",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
      category: "app"
    },
    {
      id: 22,
      title: "Fitness Integration",
      description: "DietGenius calorie adjustment based on workout intensity and duration",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800",
      category: "success"
    },
    {
      id: 23,
      title: "Nutritional Progress Report",
      description: "Monthly nutrition analytics showing improvements in dietary quality",
      image: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=800",
      category: "app"
    },
    {
      id: 24,
      title: "User Testimonial Snapshot",
      description: "Screenshot of DietGenius user sharing their success story and improved health metrics",
      image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=800",
      category: "success"
    },
    {
      id: 25,
      title: "Grocery Shopping Guide",
      description: "DietGenius-generated shopping list organized by store section for efficient healthy shopping",
      image: "https://images.unsplash.com/photo-1543168256-418811576931?w=800",
      category: "meals"
    },
    {
      id: 26,
      title: "Mindful Eating Practice",
      description: "DietGenius mindfulness feature encouraging slower, more conscious eating habits",
      image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800",
      category: "nutrition"
    },
    {
      id: 27,
      title: "Nutritional Success Story",
      description: "Before and after transformation highlighting DietGenius effectiveness",
      image: "https://images.unsplash.com/photo-1519311726-1bcd4bc15713?w=800",
      category: "success"
    }
  ];

  const categories = [
    { id: "all", name: "All Images" },
    { id: "meals", name: "Meal Plans" },
    { id: "nutrition", name: "Nutrition Info" },
    { id: "app", name: "App Features" },
    { id: "success", name: "Success Stories" }
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
          This gallery showcases visual representations of DietGenius features, healthy meal options, 
          nutrition information, and success stories. Each image illustrates how DietGenius 
          can help you achieve your dietary and health goals.
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

        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6">Featured Nutrition Highlights</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {photos.filter(p => [1, 2, 6, 17, 20].includes(p.id)).map(photo => (
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
