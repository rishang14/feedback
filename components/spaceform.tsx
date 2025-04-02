"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  ThumbsUp,
  Trash2,
  CirclePlus,
} from "lucide-react";
import { boolean } from "zod";
import { spaceFormSchema } from "@/app/types/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { FormProvider } from "react-hook-form";
import { redirect } from "next/dist/server/api-utils";
type Question = {
  id: string;
  questions: string;
};

type spaceformtype = z.infer<typeof spaceFormSchema>;

const defaultSpaceValues = {
  spaceName: "",
  header: "",
  customDescription: "",
  textbuttonText: "Submit Review",
  videoButtonText: "Start Recording",
  questions: [{ id: "1", questions: "" }],
  questionlabel: "Questions",
  thankYouTitle: "Thank You",
  thankYouMessage: "",
  theme: "light",
  thankyouimg: false,
  videoreviewEnabled: false,
  videotime: "30",
  ratingEnabled: false,
  redirectUrl: "",
};

const inputValues = {
  spaceName: "",
  header: "header goes here",
  customDescription: "We would love to hear your feedback!",
  textbuttonText: "Submit text testimonial",
  videoButtonText: "Submit Video testimonials",
  questions: [
    {
      id: "1",
      questions: "whats your thoughts on our product ? ",
    },
    {
      id: "2",
      questions: "Pls Share ur expreience",
    },
    {
      id: "3",
      questions: "Anything you want us to improve",
    },
  ],
  questionlabel: "Questions",
  thankYouTitle: "Thank You!",
  thankYouMessage: "Your testimonial has been submitted successfully.",
  theme: "light",
  thankyouimg: false,
  videoreviewEnabled: false,
  videotime: "30",
  ratingEnabled: false,
  redirectUrl: "",
};

const Spaceform = ({ closeModal }: { closeModal: () => void }) => {
  const [dynamicData, setDynamicData] = useState(defaultSpaceValues);
  const [activeTab, setactiveTab] = useState("basic");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateErrors = () => {
    const result = spaceFormSchema.safeParse(dynamicData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      result.error.errors.forEach((err) => {
        formattedErrors[err.path.join(".")] = err.message;
      });

      return formattedErrors;
    }

    return null;
  };

  const handleDynamicChange = (fieldName: keyof spaceformtype, value: any) => {
    setDynamicData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const spaceFormsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e, "form is triggered");
    const errors = validateErrors();
    if (errors) {
      setValidationErrors(errors);
      return;
    }
    try {
      console.log(dynamicData, "all form data is here ");
    } catch (e) {
      console.log(e);
    } finally {
      console.log("form end successfully");
    }
  };

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
                  dynamicData.theme === "dark" ? "bg-zinc-900" : "bg-white"
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
                        {dynamicData.header
                          ? dynamicData.header
                          : inputValues.header}
                      </h1>
                      <p className="text-muted-foreground text-center">
                        {dynamicData.customDescription
                          ? dynamicData.customDescription
                          : inputValues.customDescription}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2 flex flex-col gap-2 ">
                        <h3 className="p-2 text-lg  text-black ">
                          {" "}
                          {dynamicData.questionlabel
                            ? dynamicData.questionlabel
                            : inputValues.questionlabel}
                        </h3>
                        {dynamicData.questions[0].questions != ""
                          ? dynamicData.questions.map((items: Question) => (
                              <li className="text-gray-500" key={items.id}>
                                {items.questions}
                              </li>
                            ))
                          : inputValues.questions.map((items: Question) => (
                              <li className="text-gray-500" key={items.id}>
                                {items.questions}
                              </li>
                            ))}
                      </div>

                      <Button className={`w-full   text-black bg-gray-400  `}>
                        {dynamicData.textbuttonText
                          ? dynamicData.textbuttonText
                          : inputValues.textbuttonText}
                      </Button>
                      <Button className={`w-full   text-black bg-blue-500  `}>
                        {dynamicData.videoButtonText
                          ? dynamicData.videoButtonText
                          : inputValues.videoButtonText}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dynamicData.thankyouimg === false ? (
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
                    ) : null}
                    <div className="space-y-2">
                      <h1 className="text-4xl text-center font-bold text-gray-600">
                        {dynamicData.thankYouTitle ?? inputValues.thankYouTitle}
                      </h1>
                      <p className="text-muted-foreground">
                        {dynamicData.thankYouMessage ??
                          inputValues.thankYouMessage}
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
              <form onSubmit={spaceFormsubmit}>
                <TabsContent value="basic" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="space Name">Space Name</label>
                        <Input
                          value={dynamicData.spaceName}
                          placeholder="Enter Space Name"
                          onChange={(e) =>
                            handleDynamicChange("spaceName", e.target.value)
                          }
                        />
                        {validationErrors["spaceName"] && (
                          <p className="text-red-500">
                            {validationErrors["spaceName"]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="header"> Header Title</label>
                        <Input
                          value={dynamicData.header}
                          placeholder="Review form Header Title"
                          onChange={(e) => {
                            handleDynamicChange("header", e.target.value);
                          }}
                        />
                        {validationErrors["header"] && (
                          <p className="text-red-500">
                            {validationErrors["header"]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="customDescription">
                          {" "}
                          Review Form Description
                        </label>
                        <Textarea
                          value={dynamicData.customDescription}
                          placeholder={inputValues.customDescription}
                          onChange={(e) =>
                            handleDynamicChange(
                              "customDescription",
                              e.target.value
                            )
                          }
                        />
                        {validationErrors["customDescription"] && (
                          <p className="text-red-500">
                            {validationErrors["customDescription"]}
                          </p>
                        )}
                      </div>
                      <div className="flex  space-y-2  flex-col">
                        <label htmlFor="Review Form question">
                          Review Form question
                        </label>
                        {dynamicData.questions.map(
                          (item: Question, ind: any) => {
                            return (
                              <div
                                className=" flex gap-2 flex-col items-center w-full "
                                key={item.id}
                              > 
                             <div className="flex gap-2 items-center w-full">
                                <Input
                                  className=""
                                  value={item.questions}
                                  placeholder={"write ur questions here"}
                                  onChange={(e) => {
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
                                    });
                                  }}
                                />

                                <Button
                                  className="text-lg cursor-pointer bg-white hover:text-gray-400"
                                  variant="link"
                                  type="button"
                                  onClick={() => deletQuestionBox(item.id)}
                                >
                                  <Trash2 color="black" />
                                </Button> 
                                </div>
                                  {validationErrors[
                                    `questions.${ind}.questions`
                                  ] && (
                                    <p className="text-red-500 text-start">
                                      {
                                        validationErrors[
                                          `questions.${ind}.questions`
                                        ]
                                      }
                                    </p>
                                  )}
                              </div>
                            );
                          }
                        )}

                        <Button
                          className=" w-[100px] p-2  flex items-center text-gray-500 font-bold cursor-pointer"
                          variant={"ghost"}
                          onClick={addquestionBox}
                          type="button"
                        >
                          <CirclePlus color="black" /> Add more{" "}
                        </Button>
                      </div>

                      <div className="flex items-center justify-center space-x-10 ">
                        <label htmlFor="Enable Rating">Enable Rating</label>

                        <Switch
                          checked={dynamicData.ratingEnabled}
                          onCheckedChange={(checked) =>
                            handleDynamicChange("ratingEnabled", checked)
                          }
                        />
                        <label htmlFor="Video Review">Video Review</label>

                        <Switch
                          checked={dynamicData.videoreviewEnabled}
                          onCheckedChange={(checked) =>
                            handleDynamicChange("videoreviewEnabled", checked)
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
                          <label htmlFor="thankyou img ">
                            {" "}
                            Hide this img ?
                          </label>
                          <Checkbox
                            checked={dynamicData.thankyouimg}
                            className="  data-[state==checked]:bg-blue-500 border-1 border-gray-600  "
                            onCheckedChange={(checked) =>
                              handleDynamicChange("thankyouimg", checked)
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="thankyoutitle">Thank You Title</label>

                        <Textarea
                          value={dynamicData.thankYouTitle}
                          placeholder={inputValues.thankYouTitle}
                          onChange={(e) =>
                            handleDynamicChange("thankYouTitle", e.target.value)
                          }
                        /> 
                        {validationErrors["thankYouTitle"] && <p className="text-red-500">{validationErrors["thankYouTitle"]}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="thankyouMsg">Thank You Message</label>

                        <Textarea
                          value={dynamicData.thankYouMessage}
                          placeholder={inputValues.thankYouMessage}
                          onChange={(e) =>
                            handleDynamicChange(
                              "thankYouMessage",
                              e.target.value
                            )
                          }
                        /> 
                        {validationErrors["thankYouMessage"] && <p className="text-red-500">{validationErrors["thankYouMessage"]}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="redirecturl">
                          {" "}
                          Redirect URL (Optional)
                        </label>
                        <Input
                          placeholder={inputValues.redirectUrl}
                          onChange={(e) =>
                            handleDynamicChange("redirectUrl", e.target.value)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      {dynamicData.videoreviewEnabled === true ? (
                        <div className="space-y-2">
                          <label htmlFor="maximum video">
                            {" "}
                            Maximum Video duration
                          </label>
                          <Select
                            onValueChange={(value) =>
                              handleDynamicChange("videotime", value)
                            }
                            defaultValue={dynamicData.videotime}
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
                      ) : null}
                      <div className="space-y-2">
                        <label htmlFor="review">Review Form Theme</label>
                        <Select
                          onValueChange={(value) => {
                            handleDynamicChange("theme", value);
                          }}
                          defaultValue={dynamicData.theme}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="review form text">
                          Review Submit Button Text
                        </label>
                        <Input
                          value={dynamicData.textbuttonText}
                          placeholder={inputValues.textbuttonText}
                          onChange={(e) =>
                            handleDynamicChange(
                              "textbuttonText",
                              e.target.value
                            )
                          }
                        /> 
                         {validationErrors["textbuttonText"] && <p className="text-red-500">{validationErrors["textbuttonText"]}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="videoButtonText">
                          Review Video button text
                        </label>
                        <Input
                          value={dynamicData.videoButtonText}
                          placeholder={inputValues.videoButtonText}
                          onChange={(e) =>
                            handleDynamicChange(
                              "videoButtonText",
                              e.target.value
                            )
                          }
                        />
                         {validationErrors["textbuttonText"] && <p className="text-red-500">{validationErrors["textbuttonText"]}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="questionlabel"> Question Label</label>
                        <Input
                          value={dynamicData.questionlabel}
                          placeholder={inputValues.questionlabel}
                          onChange={(e) =>
                            handleDynamicChange("questionlabel", e.target.value)
                          }
                        />
                         {validationErrors["questionlabel"] && <p className="text-red-500">{validationErrors["questionlabel"]}</p>}
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
