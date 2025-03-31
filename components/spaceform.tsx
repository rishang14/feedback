"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  ShipWheel as ColorWheel,
  Layout,
  MessageSquare,
  Settings,
  Star,
  ThumbsUp,
  Trash2,
  CirclePlus,
} from "lucide-react";
import { boolean } from "zod";
type Question = {
  id: string;
  questions: string;
};

const Spaceform = ({ closeModal }: { closeModal: () => void }) => {
  const [activeTab, setactiveTab] = useState("basic");
  const [dynamicData, setDynamicData] = useState<Record<string, any>>({
    spaceName: "",
    header: "header goes here",
    customDescription: "We would love to hear your feedback!",
    messageLabel: "Your Message",
    textbuttonText: "Submit text testimonial",
    videoButtonnText: "Submit Video testimonials",
    questions: [
      {
        id: "1",
        questions: "demo question",
      },
      {
        id: "2",
        questions: "demo question 2",
      },
      {
        id: "3",
        questions: "demo question 3",
      },
    ],
    questionlabel: "Questions",
    buttonColor: "black",
    buttonTextColor: "white",
    thankYouTitle: "Thank You!",
    thankYouMessage: "Your testimonial has been submitted successfully.",
    theme: "light",
    Thankyouimg: false,
  });

  const addquestionBox = () => {
    setDynamicData((item) => ({
      ...item,
      questions: [
        ...item.questions,
        { id: String(item.questions.length + 1), questions: "" },
      ],
    }));
  };

  const deletQuestionBox = (id: string) => {
    setDynamicData((prev) => ({
      ...prev,
      questions: prev.questions.filter((item: any) => item.id !== id),
    }));
  };

  const handleDynamicChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | boolean
      | string,
    keys: string
  ) => {
    setDynamicData((prev) => ({
      ...prev,
      [keys]:
        typeof e === "boolean"
          ? e
          : typeof e === "string"
          ? e
          : (e.target as HTMLInputElement).type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    }));
  };

  return (
    <main className=" p-6">
      <div className=" ">
        <div className="flex md:flex-row  flex-col-reverse   gap-8">
          <div className="w-[400px]  flex flex-col items-center mt-2 space-y-6">
            <div className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Live Preview
            </div>
            {activeTab !== "thankyou" ? (
              <Card
                className={`border-2 ${
                  dynamicData.theme === "dark"
                    ? "bg-zinc-900"
                    : "bg-white"
                } mt-2 min-w-[390px] p-4`}
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className=" flex justify-center items-center ">
                      <div className="w-[60px] max-h-[60px] bg-blue-400 p-3 flex items-center justify-center rounded-full">
                        <ThumbsUp color="white" size={60} />
                      </div>
                    </div>
                    <div className="space-y-2 p-2">
                      <h1 className="text-2xl text-center font-bold">
                        {dynamicData.header}
                      </h1>
                      <p className="text-muted-foreground text-center">
                        {dynamicData.customDescription}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2 flex flex-col gap-2 ">
                        <h3 className="p-2 text-lg  text-black ">
                          {" "}
                          {dynamicData.questionlabel}
                        </h3>
                        {dynamicData.questions.map((items: Question) => (
                          <li className="text-gray-500 " key={items.id}>
                            {items.questions}
                          </li>
                        ))}
                      </div>

                      <Button className={`w-full   text-black bg-gray-400  `}>
                        {dynamicData.textbuttonText}
                      </Button>
                      <Button className={`w-full   text-black bg-blue-500  `}>
                        {dynamicData.videoButtonnText}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="w-full h-[300px] space-y-4 p-2 rounded-sm">
                      <Image
                        src={
                          "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRxcjIxbXJobjVoNzVwempua2twZ2dmbzVjeDZzaDZweHluMnQwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gsjCZpPolPr3sBy/giphy.gif"
                        }
                        alt="thankyou"
                        objectPosition="center"
                        className="w-full h-[250px]"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <h1 className="text-4xl text-center font-bold text-gray-600">
                        {dynamicData.thankYouTitle}
                      </h1>
                      <p className="text-muted-foreground">
                        {dynamicData.thankYouMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Form Builder Section */}
          <div className="flex flex-1 space-y-6">
            <Tabs
              defaultValue="basic"
              className="w-full p-2 "
              value={activeTab}
              onValueChange={setactiveTab}
            >
              <TabsList className=" w-full bg-gray-100 p-2 border-1  rounded-sm ">
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
              <form>
                <TabsContent value="basic" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className=" text-gray-700">
                          Space Name
                        </Label>
                        <Input
                          id="title"
                          value={dynamicData.spaceName}
                          placeholder="Enter Space Name"
                          onChange={(e) => handleDynamicChange(e, "spaceName")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="header" className=" text-gray-700">
                          Header Title
                        </Label>
                        <Input
                          id="headerTitle"
                          value={dynamicData.header}
                          placeholder={dynamicData.header}
                          onChange={(e) => handleDynamicChange(e, "header")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className=" text-gray-700">
                          Form Description
                        </Label>
                        <Textarea
                          id="description"
                          value={dynamicData.customDescription}
                          placeholder={dynamicData.customDescription}
                          onChange={(e) =>
                            handleDynamicChange(e, "customDescription")
                          }
                        />
                      </div>
                      <div className="flex  space-y-2  flex-col">
                        {dynamicData.questions.map(
                          (item: Question, ind: any) => {
                            return (
                              <div className=" flex gap-2 " key={item.id}>
                                <Input
                                  id="questionlabel"
                                  placeholder={item.questions}
                                  onChange={(e) =>
                                    setDynamicData((prev) => {
                                      const updatedQuestions = [
                                        ...prev.questions,
                                      ];
                                      updatedQuestions[ind] = {
                                        ...updatedQuestions[ind],
                                        questions: e.target.value,
                                      };
                                      return {
                                        ...prev,
                                        questions: updatedQuestions,
                                      };
                                    })
                                  }
                                />
                                <Button
                                  className=" text-lg cursor-pointer bg-white hover:text-gray-400"
                                  variant={"link"}
                                  onClick={() => deletQuestionBox(item.id)}
                                >
                                  <Trash2 color="black" />
                                </Button>
                              </div>
                            );
                          }
                        )}

                        <Button
                          className=" w-[100px] p-2  flex items-center text-gray-500 font-bold cursor-pointer"
                          variant={"ghost"}
                          onClick={addquestionBox}
                        >
                          <CirclePlus color="black" /> Add more{" "}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="rating">Enable Rating</Label>
                        <Switch
                          id="rating"
                          checked={dynamicData.ratingEnabled}
                          onCheckedChange={(checked) =>
                            handleDynamicChange(checked, "ratingEnabled")
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Button
                          className="bg-blue-500 text-white p-2  w-full text-center"
                          type="submit"
                        >
                          Create Space
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="thankyou" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 sapce-x-2">
                          <label
                            htmlFor="Thankyouimg"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Hide this img ?
                          </label>
                          <Checkbox
                            id="Thankyouimg"
                            className="  data-[state==checked]:bg-blue-500 border-1 border-gray-600  "
                            checked={dynamicData.Thankyouimg}
                            onCheckedChange={(e) =>
                              handleDynamicChange(e, "Thankyouimg")
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="thankYouTitle">Thank You Title</Label>
                        <Input
                          id="thankYouTitle"
                          value={dynamicData.thankYouTitle}
                          onChange={(e) =>
                            handleDynamicChange(e, "thankYouTitle")
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="thankYouMessage">
                          Thank You Message
                        </Label>
                        <Textarea
                          id="thankYouMessage"
                          value={dynamicData.thankYouMessage}
                          onChange={(e) =>
                            handleDynamicChange(e, "thankYouMessage")
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="redirectUrl">
                          Redirect URL (Optional)
                        </Label>
                        <Input
                          id="redirectUrl"
                          placeholder="https://example.com/thank-you"
                          value={dynamicData.redirectUrl}
                          onChange={(e) =>
                            handleDynamicChange(e, "redirectUrl")
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Maximum Video duration</Label>
                        <Select
                          value={dynamicData.videotime}
                          onValueChange={(value) =>
                            handleDynamicChange(value, "videotime")
                          }
                          defaultValue="30"
                        >
                          <SelectTrigger className="p-3 ">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className=" ">
                            <SelectItem value="30">30 sec</SelectItem>
                            <SelectItem value="45">45 sec</SelectItem>
                            <SelectItem value="90">90 sec</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="theme">Review Form Theme</Label>
                        <Select
                          value={dynamicData.theme}
                          onValueChange={(value) =>
                            handleDynamicChange(value, "theme")
                          }
                          defaultValue="light"
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
                          value={dynamicData.textbuttonText}
                          placeholder={dynamicData.textbuttonText}
                          onChange={(e) =>
                            handleDynamicChange(e, "textbuttonText")
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="buttonText">Video button text </Label>
                        <Input
                          id="buttonText"
                          value={dynamicData.videoButtonnText}
                          placeholder={dynamicData.videoButtonnText}
                          onChange={(e) =>
                            handleDynamicChange(e, "videoButtonnText")
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="buttonTextcolor">Question Label</Label>
                        <Input
                          id="buttonText"
                          value={dynamicData.questionlabel}
                          placeholder={dynamicData.questionlabel}
                          onChange={(e) =>
                            handleDynamicChange(e, "questionlabel")
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </form>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Spaceform;
