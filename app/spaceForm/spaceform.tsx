"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShipWheel as ColorWheel,
  Layout,
  MessageSquare,
  Settings,
  Star,
  ThumbsUp, 
  Trash2 ,
  CirclePlus
} from "lucide-react";

const Spaceform = ({ closeModal }: { closeModal: () => void }) => {
  const [activeTab, setavtiveTab] = useState("basic");
  console.log(activeTab);
  const [formData, setFormData] = useState({ 
    spaceName:"",
    header: "header goes here",
    customDescription: "We would love to hear your feedback!",
    messageLabel: "Your Message",
    ratingEnabled: true,
    buttonText: "Submit Testimonial", 
    questions:[{
      id:"1", 
      questions:"demo question"
    },
    {
      id:"2", 
      questions:"demo question 2"
    },
    {
      id:"3", 
      questions:"demo question 3"
    },
  ], 
    questionlabel:"Questions",
    buttonColor: "black",
    buttonTextColor:"white", 
    thankYouTitle: "Thank You!",
    thankYouMessage: "Your testimonial has been submitted successfully.",
    theme: "light",
    redirectUrl: "",
  });

  return (
    <main className=" p-6">
      <div className=" ">
        <div className="flex md:flex-row  flex-col-reverse   gap-8">
          <div className="w-[400px]  flex flex-col items-center mt-2 space-y-6">
            <div className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Live Preview
            </div>
            {activeTab != "thankyou" ? (
              <Card
                className={`border-2 ${
                  formData.theme === "dark" ? "bg-zinc-900" : "bg-white" 
                } mt-2 min-w-[390px] p-4`}
              >
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2 p-2">
                      <h2 className="text-2xl text-center font-bold">{formData.header}</h2>
                      <p className="text-muted-foreground text-center">
                        {formData.customDescription}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2 flex flex-col gap-2 "> 
                        <h3 className="p-2 text-lg  text-black " > {formData.questionlabel}</h3>
                        {
                          formData.questions.map(items=>(
                            <li className="text-gray-500 " key={items.id}>
                              {items.questions}
                            </li>
                          ))
                        }
                      </div>
                      {/* <div className="space-y-2">
                        <Label>{ formData.messageLabel}</Label>
                        <Textarea placeholder="Share your experience..." />
                      </div> */}
                      <Button className={`w-full   text-black bg-gray-400 cursor-pointer `}>{formData.buttonText}</Button>
                      <Button className={`w-full   text-black bg-blue-500 cursor-pointer `}>video testimonial</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        {formData.thankYouTitle}
                      </h3>
                      <p className="text-muted-foreground">
                        {formData.thankYouMessage}
                      </p>
                    </div>
                    {formData.redirectUrl && (
                      <Button variant="outline" className="w-full">
                        Continue to website
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Form Builder Section */}
          <div className="flex flex-1 space-y-6">
            <Tabs
              defaultValue="basic"
              className="w-full"
              value={activeTab}
              onValueChange={setavtiveTab}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="basic"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-colors"
                >
                  <Layout className="h-4 w-4" />
                  Basic
                </TabsTrigger>
                <TabsTrigger
                  value="thankyou"
                  className={`flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-colors `}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Thank You
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className={`flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-colors`}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
             {/* form section */}
              <TabsContent value="basic" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className=" text-gray-700">Space Name</Label>
                      <Input
                        id="title"
                        value={formData.spaceName}
                        //   onChange={(e) => updateFormData('title', e.target.value)}
                      />
                    </div> 
                    <div className="space-y-2">
                      <Label htmlFor="header" className=" text-gray-700">Header Title</Label>
                      <Input
                        id="headerTitle"
                        value={formData.header}
                        //   onChange={(e) => updateFormData('description', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className=" text-gray-700">Form Description</Label>
                      <Textarea
                        id="description"
                        value={formData.customDescription}
                        //   onChange={(e) => updateFormData('description', e.target.value)}
                      />
                    </div>
                    {/* <div className="space-y-2">
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
                    </div> */}  
                    <div className="flex  space-y-2  flex-col">
                     {
                      formData.questions.map(item=>{
                        return (
                          <div className=" flex gap-2 " key={item.id}>
                           <Input
                        id="emailLabel"
                        placeholder={item.questions}
                        //   onChange={(e) => updateFormData('emailLabel', e.target.value)}
                      /> 
                      <Button className=" text-lg cursor-pointer bg-white hover:text-gray-400" variant={"link"}><Trash2 color="black" /></Button>
                          </div>
                        )
                      })
                     } 

                     <Button className=" w-[100px] p-2  flex items-center text-gray-500 font-bold cursor-pointer" variant={"ghost"} ><CirclePlus color="black" /> Add more  </Button>
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
                     <Button className="bg-blue-500 text-white p-2  w-full text-center">Create Space</Button>
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
                      <Label htmlFor="redirectUrl">
                        Redirect URL (Optional)
                      </Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="buttonText">Submit Button Text</Label>
                      <Input
                        id="buttonText"
                        value={formData.buttonText}
                        //   onChange={(e) => updateFormData('buttonText', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buttonTextcolor">Background color of submit text</Label>
                      <Input
                        id="buttonText"
                        value={formData.buttonColor}
                        //   onChange={(e) => updateFormData('buttonText', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buttonText">Text Color of submit text</Label>
                      <Input
                        id="buttonText"
                        value={formData.buttonTextColor}
                        //   onChange={(e) => updateFormData('buttonText', e.target.value)}
                      />
                    </div> 
                    <div className="space-y-2">
                      <Label htmlFor="buttonTextcolor">Question Label</Label>
                      <Input
                        id="buttonText"
                        value={formData.questionlabel}
                        //   onChange={(e) => updateFormData('buttonText', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Spaceform;
