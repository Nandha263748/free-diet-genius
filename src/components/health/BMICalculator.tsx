
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { AlertCircle, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  weight: z.coerce.number().min(30, { message: "Weight must be at least 30kg/66lbs" }).max(250, { message: "Weight must be less than 250kg/550lbs" }),
  height: z.coerce.number().min(100, { message: "Height must be at least 100cm/3.3ft" }).max(250, { message: "Height must be less than 250cm/8.2ft" }),
  age: z.coerce.number().min(18, { message: "Age must be at least 18" }).max(120, { message: "Age must be less than 120" }),
  gender: z.string().optional(),
  activityLevel: z.string().default('moderate'),
  unit: z.enum(['metric', 'imperial']).default('metric'),
});

type FormValues = z.infer<typeof formSchema>;

const BMICalculator = () => {
  const { user, updateUser } = useAuth();
  const [bmiResult, setBMIResult] = useState<number | null>(null);
  const [bmiCategory, setBMICategory] = useState<string>('');
  const [calorieNeeds, setCalorieNeeds] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: user?.healthMetrics?.weight || 70,
      height: user?.healthMetrics?.height || 170,
      age: user?.healthMetrics?.age || 30,
      gender: user?.healthMetrics?.gender || 'male',
      activityLevel: user?.healthMetrics?.activityLevel || 'moderate',
      unit: 'metric',
    },
  });

  const unitType = form.watch('unit');
  
  const calculateBMI = (weight: number, height: number, unit: string) => {
    // Convert imperial to metric if needed
    if (unit === 'imperial') {
      // Convert lbs to kg
      weight = weight * 0.453592;
      // Convert inches to cm
      height = height * 2.54;
    }
    
    // BMI formula: weight (kg) / height (m)^2
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };
  
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };
  
  const calculateCalorieNeeds = (weight: number, height: number, age: number, gender: string, activityLevel: string, unit: string) => {
    // Convert imperial to metric if needed
    if (unit === 'imperial') {
      // Convert lbs to kg
      weight = weight * 0.453592;
      // Convert inches to cm
      height = height * 2.54;
    }
    
    // Basal Metabolic Rate (BMR) calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    
    // Adjust for activity level
    let activityMultiplier;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'light':
        activityMultiplier = 1.375;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'active':
        activityMultiplier = 1.725;
        break;
      case 'very-active':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.55; // Default to moderate
    }
    
    return Math.round(bmr * activityMultiplier);
  };

  const onSubmit = (values: FormValues) => {
    const bmi = calculateBMI(values.weight, values.height, values.unit);
    const category = getBMICategory(bmi);
    const calories = calculateCalorieNeeds(
      values.weight,
      values.height,
      values.age,
      values.gender || 'not specified',
      values.activityLevel,
      values.unit
    );
    
    setBMIResult(parseFloat(bmi.toFixed(1)));
    setBMICategory(category);
    setCalorieNeeds(calories);
    
    // Update user health metrics if logged in
    if (user) {
      updateUser({
        healthMetrics: {
          ...user.healthMetrics,
          weight: values.unit === 'metric' ? values.weight : values.weight * 0.453592,
          height: values.unit === 'metric' ? values.height : values.height * 2.54,
          bmi: parseFloat(bmi.toFixed(1)),
          age: values.age,
          gender: values.gender,
          activityLevel: values.activityLevel,
        }
      });
      
      // Update calorie goal if needed
      if (user.preferences && !user.preferences.calorieGoal) {
        updateUser({
          preferences: {
            ...user.preferences,
            calorieGoal: calories,
          }
        });
      }
    }
    
    toast.success("BMI and calorie needs calculated successfully!");
  };

  const getBMIColor = (bmi: number | null) => {
    if (!bmi) return 'bg-gray-300';
    if (bmi < 18.5) return 'bg-blue-500';
    if (bmi < 25) return 'bg-green-500';
    if (bmi < 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getBMIProgressValue = (bmi: number | null) => {
    if (!bmi) return 0;
    // Scale the BMI to a percentage (15-40 BMI range mapped to 0-100%)
    return Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">BMI Calculator</CardTitle>
          <CardDescription>
            Calculate your Body Mass Index and daily calorie needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit System</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit system" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                        <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight ({unitType === 'metric' ? 'kg' : 'lbs'})</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height ({unitType === 'metric' ? 'cm' : 'inches'})</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender (optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="not specified">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Activity Level
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              <strong>Sedentary:</strong> Little or no exercise<br />
                              <strong>Light:</strong> Light exercise 1-3 days/week<br />
                              <strong>Moderate:</strong> Moderate exercise 3-5 days/week<br />
                              <strong>Active:</strong> Hard exercise 6-7 days/week<br />
                              <strong>Very Active:</strong> Hard exercise & physical job
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">Lightly Active</SelectItem>
                        <SelectItem value="moderate">Moderately Active</SelectItem>
                        <SelectItem value="active">Very Active</SelectItem>
                        <SelectItem value="very-active">Extremely Active</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Results</CardTitle>
          <CardDescription>
            BMI, weight category and calorie needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {bmiResult ? (
            <>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-1">Your BMI</h3>
                <p className="text-4xl font-bold text-primary mb-2">{bmiResult}</p>
                <p className={`text-lg font-medium mb-2 ${
                  bmiCategory === 'Normal weight' 
                    ? 'text-green-600' 
                    : bmiCategory === 'Underweight' 
                      ? 'text-blue-600' 
                      : bmiCategory === 'Overweight' 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                }`}>
                  {bmiCategory}
                </p>
                
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-blue-600">Underweight</div>
                      <div className="text-xs text-green-600">Normal</div>
                      <div className="text-xs text-yellow-600">Overweight</div>
                      <div className="text-xs text-red-600">Obese</div>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-[30%] bg-blue-500"></div>
                      <div className="w-[25%] bg-green-500"></div>
                      <div className="w-[15%] bg-yellow-500"></div>
                      <div className="w-[30%] bg-red-500"></div>
                    </div>
                    <div className="relative h-0">
                      <div 
                        className="absolute top-[-7px] h-4 w-2 bg-black"
                        style={{ 
                          left: `${getBMIProgressValue(bmiResult)}%`,
                          transform: 'translateX(-50%)'
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>40</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {calorieNeeds && (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-1">Estimated Daily Calories</h3>
                  <p className="text-4xl font-bold text-secondary mb-2">{calorieNeeds}</p>
                  <p className="text-sm text-gray-600">
                    This is the estimated number of calories you need to maintain your current weight.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="p-2 bg-white rounded border border-gray-200">
                      <p className="text-xs text-muted-foreground">Weight Loss</p>
                      <p className="font-medium">{calorieNeeds - 500}</p>
                    </div>
                    <div className="p-2 bg-white rounded border border-gray-200">
                      <p className="text-xs text-muted-foreground">Maintenance</p>
                      <p className="font-medium">{calorieNeeds}</p>
                    </div>
                    <div className="p-2 bg-white rounded border border-gray-200">
                      <p className="text-xs text-muted-foreground">Weight Gain</p>
                      <p className="font-medium">{calorieNeeds + 500}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-2">No results yet</h3>
              <p className="text-muted-foreground">
                Fill out the form and click 'Calculate' to see your BMI and calorie needs.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground border-t pt-6">
          <p>
            Note: BMI is a screening tool, not a diagnostic tool. Consult a healthcare provider for a complete health assessment.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BMICalculator;
