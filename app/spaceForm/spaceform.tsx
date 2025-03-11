import React ,{useState} from 'react' 
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShipWheel as ColorWheel, Layout, MessageSquare, Settings, Star, ThumbsUp } from 'lucide-react';

const Spaceform = ({ closeModal }: { closeModal: () => void }) => { 

    const [formData, setFormData] = useState({
        title: 'Share Your Experience',
        description: 'We would love to hear your feedback!',
        nameLabel: 'Your Name',
        emailLabel: 'Your Email',
        messageLabel: 'Your Message',
        ratingEnabled: true,
        buttonText: 'Submit Testimonial',
        thankYouTitle: 'Thank You!',
        thankYouMessage: 'Your testimonial has been submitted successfully.',
        theme: 'light',
        redirectUrl: '',
      });
    
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Customize Your Testimonial Form</h1>
        <p className="text-muted-foreground text-lg">Design the perfect testimonial collection experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Builder Section */}
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Basic
              </TabsTrigger>
              <TabsTrigger value="thankyou" className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                Thank You
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 mt-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Form Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                    //   onChange={(e) => updateFormData('title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Form Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                    //   onChange={(e) => updateFormData('description', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nameLabel">Name Field Label</Label>
                    <Input
                      id="nameLabel"
                      value={formData.nameLabel}
                    //   onChange={(e) => updateFormData('nameLabel', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailLabel">Email Field Label</Label>
                    <Input
                      id="emailLabel"
                      value={formData.emailLabel}
                    //   onChange={(e) => updateFormData('emailLabel', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="messageLabel">Message Field Label</Label>
                    <Input
                      id="messageLabel"
                      value={formData.messageLabel}
                    //   onChange={(e) => updateFormData('messageLabel', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rating">Enable Rating</Label>
                    <Switch
                      id="rating"
                      checked={formData.ratingEnabled}
                    //   onCheckedChange={(checked) => updateFormData('ratingEnabled', checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buttonText">Submit Button Text</Label>
                    <Input
                      id="buttonText"
                      value={formData.buttonText}
                    //   onChange={(e) => updateFormData('buttonText', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="thankyou" className="space-y-6 mt-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="thankYouTitle">Thank You Title</Label>
                    <Input
                      id="thankYouTitle"
                      value={formData.thankYouTitle}
                    //   onChange={(e) => updateFormData('thankYouTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thankYouMessage">Thank You Message</Label>
                    <Textarea
                      id="thankYouMessage"
                      value={formData.thankYouMessage}
                    //   onChange={(e) => updateFormData('thankYouMessage', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="redirectUrl">Redirect URL (Optional)</Label>
                    <Input
                      id="redirectUrl"
                      placeholder="https://example.com/thank-you"
                      value={formData.redirectUrl}
                    //   onChange={(e) => updateFormData('redirectUrl', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Form Theme</Label>
                    <Select 
                    // value={formData.theme} onValueChange={(value) => updateFormData('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview Section */}
        <div className="lg:sticky lg:top-6 space-y-6">
          <div className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Live Preview
          </div>
          <Card className={`border-2 ${formData.theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{formData.title}</h2>
                  <p className="text-muted-foreground">{formData.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{formData.nameLabel}</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>{formData.emailLabel}</Label>
                    <Input placeholder="john@example.com" type="email" />
                  </div>
                  {formData.ratingEnabled && (
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            className="h-6 w-6 text-yellow-400 cursor-pointer"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>{formData.messageLabel}</Label>
                    <Textarea placeholder="Share your experience..." />
                  </div>
                  <Button className="w-full">{formData.buttonText}</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{formData.thankYouTitle}</h3>
                  <p className="text-muted-foreground">{formData.thankYouMessage}</p>
                </div>
                {formData.redirectUrl && (
                  <Button variant="outline" className="w-full">
                    Continue to website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </main>
  )
}

export default Spaceform