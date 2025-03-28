
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const dietTypes = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'low-carb', label: 'Low Carb' },
  { value: 'low-fat', label: 'Low Fat' },
  { value: 'high-protein', label: 'High Protein' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
];

const commonAllergies = [
  { id: 'dairy', label: 'Dairy' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'nuts', label: 'Nuts' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'soy', label: 'Soy' },
  { id: 'seafood', label: 'Seafood' },
];

const formSchema = z.object({
  dietType: z.string().default('balanced'),
  calorieTarget: z.number().min(1200).max(3500),
  allergies: z.array(z.string()).default([]),
  preferredProtein: z.string().optional(),
  includeBreakfast: z.boolean().default(true),
  includeLunch: z.boolean().default(true),
  includeDinner: z.boolean().default(true),
  includeSnacks: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const MealPlanGenerator = () => {
  const { user, updateUser } = useAuth();
  const { generateMealPlan, isLoading } = useMealPlan();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietType: user?.preferences?.dietType || 'balanced',
      calorieTarget: user?.preferences?.calorieGoal || 2000,
      allergies: user?.preferences?.allergies || [],
      includeBreakfast: true,
      includeLunch: true,
      includeDinner: true,
      includeSnacks: true,
    },
  });

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (values: FormValues) => {
    // Update user preferences
    if (user) {
      updateUser({
        preferences: {
          ...user.preferences,
          dietType: values.dietType,
          allergies: values.allergies,
          calorieGoal: values.calorieTarget,
        }
      });
    }
    
    // Generate meal plan
    await generateMealPlan(values);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Generate Your Meal Plan</CardTitle>
        <CardDescription>
          Customize your preferences and our AI will create a personalized meal plan for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="dietType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diet Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select diet type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dietTypes.map((diet) => (
                            <SelectItem key={diet.value} value={diet.value}>
                              {diet.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="calorieTarget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Daily Calorie Target: {field.value}
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={1200}
                          max={3500}
                          step={50}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1200</span>
                        <span>3500</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allergies"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Food Allergies & Restrictions</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {commonAllergies.map((allergy) => (
                          <FormField
                            key={allergy.id}
                            control={form.control}
                            name="allergies"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={allergy.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(allergy.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, allergy.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== allergy.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {allergy.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferredProtein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Protein Source (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Chicken, Tofu, Beans"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="meals-to-include">
                    <AccordionTrigger>Meals to Include</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="includeBreakfast"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Breakfast
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="includeLunch"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Lunch
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="includeDinner"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Dinner
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="includeSnacks"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Snacks
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              
              {currentStep < 2 ? (
                <Button type="button" className="ml-auto" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="ml-auto" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Meal Plan'
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MealPlanGenerator;
