
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/components/ui/sonner';
import { Loader2, UserCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

const preferencesSchema = z.object({
  dietType: z.string().default('balanced'),
  calorieGoal: z.coerce.number().min(1000, { message: 'Calorie goal must be at least 1000' }).max(5000, { message: 'Calorie goal must be less than 5000' }),
  allergies: z.array(z.string()).default([]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PreferencesFormValues = z.infer<typeof preferencesSchema>;

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

const Profile = () => {
  const { user, updateUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPreferences, setIsUpdatingPreferences] = useState(false);
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      dietType: user?.preferences?.dietType || 'balanced',
      calorieGoal: user?.preferences?.calorieGoal || 2000,
      allergies: user?.preferences?.allergies || [],
    },
  });

  const onProfileSubmit = async (values: ProfileFormValues) => {
    setIsUpdatingProfile(true);
    try {
      updateUser({
        name: values.name,
        email: values.email,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onPreferencesSubmit = async (values: PreferencesFormValues) => {
    setIsUpdatingPreferences(true);
    try {
      updateUser({
        preferences: {
          ...user?.preferences,
          dietType: values.dietType,
          calorieGoal: values.calorieGoal,
          allergies: values.allergies,
        }
      });
      toast.success("Preferences updated successfully!");
    } catch (error) {
      toast.error("Failed to update preferences");
    } finally {
      setIsUpdatingPreferences(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Diet Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isUpdatingProfile}>
                        {isUpdatingProfile ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>
                    Your personal health information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.healthMetrics && Object.keys(user.healthMetrics).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.healthMetrics.height && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Height:</span>
                          <span className="font-medium">{user.healthMetrics.height} cm</span>
                        </div>
                      )}
                      {user.healthMetrics.weight && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Weight:</span>
                          <span className="font-medium">{user.healthMetrics.weight} kg</span>
                        </div>
                      )}
                      {user.healthMetrics.bmi && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">BMI:</span>
                          <span className="font-medium">{user.healthMetrics.bmi}</span>
                        </div>
                      )}
                      {user.healthMetrics.age && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Age:</span>
                          <span className="font-medium">{user.healthMetrics.age}</span>
                        </div>
                      )}
                      {user.healthMetrics.gender && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Gender:</span>
                          <span className="font-medium">{user.healthMetrics.gender}</span>
                        </div>
                      )}
                      {user.healthMetrics.activityLevel && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Activity Level:</span>
                          <span className="font-medium">
                            {user.healthMetrics.activityLevel.charAt(0).toUpperCase() + user.healthMetrics.activityLevel.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-4">
                        No health metrics recorded yet.
                      </p>
                      <Button onClick={() => navigate('/bmi-calculator')}>
                        Calculate BMI & Metrics
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Diet Preferences</CardTitle>
                  <CardDescription>
                    Update your dietary preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...preferencesForm}>
                    <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-4">
                      <FormField
                        control={preferencesForm.control}
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
                        control={preferencesForm.control}
                        name="calorieGoal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Daily Calorie Goal</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-2">
                        <FormLabel>Food Allergies & Restrictions</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {commonAllergies.map((allergy) => (
                            <FormField
                              key={allergy.id}
                              control={preferencesForm.control}
                              name="allergies"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={allergy.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={allergy.id}
                                      checked={field.value?.includes(allergy.id)}
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        const newValue = checked
                                          ? [...field.value, allergy.id]
                                          : field.value.filter((value) => value !== allergy.id);
                                        field.onChange(newValue);
                                      }}
                                      className="form-checkbox h-4 w-4 text-primary"
                                    />
                                    <label htmlFor={allergy.id} className="text-sm">
                                      {allergy.label}
                                    </label>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <Button type="submit" disabled={isUpdatingPreferences}>
                        {isUpdatingPreferences ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Save Preferences'
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center">
                      <UserCircle className="h-10 w-10 mr-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
