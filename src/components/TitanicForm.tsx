import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Anchor, Users, Ship, Star, ChevronDown, Brain, BarChart3, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { predictionService, type PassengerData, type AnalysisResult } from '@/services/predictionService';

type FormData = PassengerData;

const TitanicForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    pclass: '',
    sex: '',
    age: '',
    sibsp: '0',
    parch: '0',
    fare: '',
    cabin: false,
    embarked: ''
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.pclass || !formData.sex || !formData.age || !formData.fare || !formData.embarked) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in all required fields to calculate survival probability.",
          variant: "destructive"
        });
        return;
      }

      // Call the analysis service
      const analysis = await predictionService.analyzeSurvival(formData);
      setResult(analysis);
      
      toast({
        title: "Analysis Complete",
        description: "Your survival probability has been calculated with factor analysis.",
      });

    } catch (error) {
      toast({
        title: "Calculation Failed",
        description: "Unable to calculate survival probability. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSurvivalCategory = (probability: number): { variant: 'success' | 'warning' | 'destructive'; label: string } => {
    if (probability > 0.75) {
      return { variant: 'success', label: 'High Survival Probability' };
    } else if (probability >= 0.35) {
      return { variant: 'warning', label: 'Moderate Survival Probability' };
    } else {
      return { variant: 'destructive', label: 'Low Survival Probability' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Calculator Introduction */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Titanic Survival Probability Calculator
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 leading-relaxed">
              Calculate your hypothetical survival probability aboard the RMS Titanic using machine learning 
              trained on historical passenger data. Get insights into key factors that influenced survival rates.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Input Form Card */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Ship className="w-6 h-6 text-blue-600" />
              Calculate Your Survival Probability
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your passenger details to calculate survival probability.
            </CardDescription>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Mr. John Smith"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-input border-input-border focus:border-brass"
                />
                <p className="text-xs text-muted-foreground">Include your title (Mr., Mrs., Miss, etc.)</p>
              </div>

              {/* Passenger Class */}
              <div className="space-y-2">
                <Label htmlFor="pclass" className="text-sm font-medium">Passenger Class</Label>
                <Select value={formData.pclass} onValueChange={(value) => handleInputChange('pclass', value)}>
                  <SelectTrigger className="bg-input border-input-border focus:border-brass">
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-card-border">
                    <SelectItem value="1">1st Class (The Aristocracy)</SelectItem>
                    <SelectItem value="2">2nd Class (The Middle Class)</SelectItem>
                    <SelectItem value="3">3rd Class (Steerage)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="sex" className="text-sm font-medium">Gender</Label>
                <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                  <SelectTrigger className="bg-input border-input-border focus:border-brass">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-card-border">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age in years"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="bg-input border-input-border focus:border-brass"
                  min="0"
                  max="100"
                />
              </div>

              {/* Siblings/Spouses */}
              <div className="space-y-2">
                <Label htmlFor="sibsp" className="text-sm font-medium">Siblings/Spouses Aboard</Label>
                <Input
                  id="sibsp"
                  type="number"
                  placeholder="Number of siblings/spouses"
                  value={formData.sibsp}
                  onChange={(e) => handleInputChange('sibsp', e.target.value)}
                  className="bg-input border-input-border focus:border-brass"
                  min="0"
                />
              </div>

              {/* Parents/Children */}
              <div className="space-y-2">
                <Label htmlFor="parch" className="text-sm font-medium">Parents/Children Aboard</Label>
                <Input
                  id="parch"
                  type="number"
                  placeholder="Number of parents/children"
                  value={formData.parch}
                  onChange={(e) => handleInputChange('parch', e.target.value)}
                  className="bg-input border-input-border focus:border-brass"
                  min="0"
                />
              </div>

              {/* Fare */}
              <div className="space-y-2">
                <Label htmlFor="fare" className="text-sm font-medium">Ticket Fare (EURO)</Label>
                <Input
                  id="fare"
                  type="number"
                  placeholder="Amount paid for ticket"
                  value={formData.fare}
                  onChange={(e) => handleInputChange('fare', e.target.value)}
                  className="bg-input border-input-border focus:border-brass"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Port of Departure */}
              <div className="space-y-2">
                <Label htmlFor="embarked" className="text-sm font-medium">Port of Departure</Label>
                <Select value={formData.embarked} onValueChange={(value) => handleInputChange('embarked', value)}>
                  <SelectTrigger className="bg-input border-input-border focus:border-brass">
                    <SelectValue placeholder="Where did you board?" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-card-border">
                    <SelectItem value="S">Southampton, England</SelectItem>
                    <SelectItem value="C">Cherbourg, France</SelectItem>
                    <SelectItem value="Q">Queenstown, Ireland</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Private Cabin */}
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <Switch
                id="cabin"
                checked={formData.cabin}
                onCheckedChange={(checked) => handleInputChange('cabin', checked)}
              />
              <Label htmlFor="cabin" className="text-sm font-medium">
                Did you have a private cabin?
              </Label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                size="lg" 
                disabled={loading}
                className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Star className="w-5 h-5 mr-2" />
                    Calculate
                  </>
                )}
              </Button>
            </div>
          </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <>
            {/* Main Result */}
            <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-4">
                    {Math.round(result.base_probability * 100)}%
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Your Predicted Survival Probability
                  </h3>
                  {(() => {
                    const { variant, label } = getSurvivalCategory(result.base_probability);
                    return (
                      <div className={`inline-block px-4 py-2 rounded-lg border-2 ${
                        variant === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                        variant === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                        'bg-red-50 border-red-200 text-red-800'
                      }`}>
                        <span className="font-medium">{label}</span>
                      </div>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Interactive Insights Section */}
            <div className="space-y-4">
              {/* Machine Learning Model */}
              <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
                <Collapsible 
                  open={activeInsight === 'model'} 
                  onOpenChange={() => setActiveInsight(activeInsight === 'model' ? null : 'model')}
                >
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="hover:bg-gray-50 transition-colors">
                      <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-900">
                        <div className="flex items-center gap-3">
                          <Brain className="w-6 h-6 text-blue-600" />
                          Machine Learning Model
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                          activeInsight === 'model' ? 'rotate-180' : ''
                        }`} />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Model Used: Stacking Classifier</h4>
                          <p className="text-gray-600">
                            This is an advanced ensemble model that combines the predictions from several 
                            individual models to achieve higher accuracy and robustness.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Component Models:</h4>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Random Forest Classifier</li>
                            <li>Gradient Boosting Classifier</li>
                            <li>XGBoost Classifier</li>
                            <li>Logistic Regression</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Model Accuracy:</h4>
                          <p className="text-gray-600">
                            {(result.model_accuracy * 100).toFixed(1)}% accuracy on validation data
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* What-If Analysis */}
              {result.factor_analysis.length > 0 && (
                <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
                  <Collapsible 
                    open={activeInsight === 'whatif'} 
                    onOpenChange={() => setActiveInsight(activeInsight === 'whatif' ? null : 'whatif')}
                  >
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="hover:bg-gray-50 transition-colors">
                        <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-900">
                          <div className="flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                            What-If Analysis
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                            activeInsight === 'whatif' ? 'rotate-180' : ''
                          }`} />
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Survival Factors</h4>
                          {result.factor_analysis.map((factor, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-700">
                                <span className="font-medium">Changing your {factor.factor}</span> to{' '}
                                <span className="text-blue-600 font-medium">{factor.change_to}</span> would{' '}
                                <span className="text-green-600 font-medium">
                                  increase your survival probability by {factor.impact_on_survival}
                                </span>.
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              )}

              {/* Historical Data */}
              <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
                <Collapsible 
                  open={activeInsight === 'historical'} 
                  onOpenChange={() => setActiveInsight(activeInsight === 'historical' ? null : 'historical')}
                >
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="hover:bg-gray-50 transition-colors">
                      <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-900">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                          Historical Data
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                          activeInsight === 'historical' ? 'rotate-180' : ''
                        }`} />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">The RMS Titanic</h4>
                          <p className="text-gray-600 mb-4">
                            The RMS Titanic sank on April 15, 1912, during its maiden voyage. Here are some key 
                            historical insights that inform our model:
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">
                              <span className="font-medium">"Women and children first"</span> - The evacuation protocol 
                              significantly influenced survival rates.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">
                              <span className="font-medium">Class distinctions</span> - First-class passengers had 
                              better access to lifeboats.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">
                              <span className="font-medium">Location matters</span> - Passengers closer to the boat 
                              deck had better chances.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </div>
          </>
        )}

        {/* Disclaimer */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              <strong>Disclaimer:</strong> This is a simulation powered by a machine learning model trained on the original 
              Titanic passenger data. It is for educational and entertainment purposes only. The tragic loss of life aboard 
              the RMS Titanic was a real historical event that affected countless families and communities.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

  );
};

export default TitanicForm;