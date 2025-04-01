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
type Question = {
  id: string;
  questions: string;
};

type spaceformtype = z.infer<typeof spaceFormSchema>;

const Spaceform = ({ closeModal }: { closeModal: () => void }) => {
  const [activeTab, setactiveTab] = useState("basic");
  const [dynamicData, setDynamicData] = useState<Record<string, any>>({
    spaceName: "",
    header: "header goes here",
    customDescription: "We would love to hear your feedback!",
    messageLabel: "Your Message",
    textbuttonText: "Submit text testimonial",
    videoButtonText: "Submit Video testimonials",
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
    thankyouimg: false,
    videoreviewEnabled: false,
    videotime: "30",
  });
  const formController = useForm<spaceformtype>({
    resolver: zodResolver(spaceFormSchema), 
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formController;

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
    fieldName: keyof spaceformtype,
    value: any,
    onChange: (value: any) => void
  ) => {
    console.log("i am triggeerd");
    onChange(value);
    setDynamicData((prev) => ({ ...prev, [fieldName]: value }));
    formController.setValue(fieldName as any, value, { shouldValidate: true });
  };

  const onsubmit = (e: spaceformtype) => {
    console.log(e, "form is triggered");
    try {
    } catch (e) {
      console.log(e);
    }
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
                        {dynamicData.videoButtonText}
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
              <Form {...formController}>
                <form
                  onSubmit={handleSubmit(onsubmit)}
                >
                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <Card>
                      <CardContent className="pt-6 space-y-6">
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="spaceName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Space Name</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    // value={dynamicData.spaceName}
                                    placeholder="Enter Space Name"
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "spaceName",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.spaceName?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="header"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel> Header Title</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    // value={dynamicData.header}
                                    placeholder="Review form Header Title"
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "header",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.header?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="customDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel> Review Form Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    // value={dynamicData.customDescription}
                                    placeholder={dynamicData.customDescription}
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "customDescription",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.customDescription?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex  space-y-2  flex-col">
                          {dynamicData.questions.map(
                            (item: Question, ind: any) => {
                              return (
                                <div
                                  className=" flex gap-2 items-center w-full "
                                  key={item.id}
                                >
                                  <FormField
                                    control={control}
                                    name={`questions.${ind}.questions`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <div className="flex items-center gap-2 w-full">
                                          <FormControl className="flex-grow">
                                            <Input
                                              {...field}
                                              className="min-w-[600px]"
                                              placeholder={item.questions}
                                              onChange={(e) => {
                                                field.onChange(e.target.value);
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
                                          </FormControl>

                                          <Button
                                            className="text-lg cursor-pointer bg-white hover:text-gray-400"
                                            variant="link"
                                            type="button"
                                            onClick={() =>
                                              deletQuestionBox(item.id)
                                            }
                                          >
                                            <Trash2 color="black" />
                                          </Button>
                                        </div>
                                        <FormMessage>
                                          {
                                            errors.questions?.[ind]?.questions
                                              ?.message
                                          }
                                        </FormMessage>
                                      </FormItem>
                                    )}
                                  />
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
                          <FormField
                            control={control}
                            name="ratingEnabled"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Enable Rating</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={(checked) =>
                                      handleDynamicChange(
                                        "ratingEnabled",
                                        checked,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.ratingEnabled?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name="videoreviewEnabled"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Video Review</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={(checked) =>
                                      handleDynamicChange(
                                        "videoreviewEnabled",
                                        checked,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.videoreviewEnabled?.message}
                                </FormMessage>
                              </FormItem>
                            )}
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
                          <FormField
                            control={control}
                            name="thankyouimg"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-2 sapce-x-2">
                                  <FormLabel> Hide this img ?</FormLabel>
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      className="  data-[state==checked]:bg-blue-500 border-1 border-gray-600  "
                                      onCheckedChange={(checked) =>
                                        handleDynamicChange(
                                          "thankyouimg",
                                          checked,
                                          field.onChange
                                        )
                                      }
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage>
                                  {errors.thankyouimg?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="thankYouTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Thank You Title</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    // value={dynamicData.thankYouTitle}
                                    placeholder={dynamicData.thankYouTitle}
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "thankYouTitle",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.thankYouTitle?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="thankYouMessage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Thank You Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    // value={dynamicData.thankYouMessage}
                                    placeholder={dynamicData.thankYouMessage}
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "thankYouMessage",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.thankYouMessage?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="redirectUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel> Redirect URL (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={dynamicData.redirectUrl}
                                    placeholder={dynamicData.redirectUrl}
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "redirectUrl",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.redirectUrl?.message}
                                </FormMessage>
                              </FormItem>
                            )}
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
                            <FormField
                              control={control}
                              name="videotime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel> Maximum Video duration</FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={(value) =>
                                        handleDynamicChange(
                                          "videotime",
                                          value,
                                          field.onChange
                                        )
                                      }
                                      defaultValue={dynamicData.videotime}
                                    >
                                      <SelectTrigger className="p-3 ">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className=" ">
                                        <SelectItem value="30">
                                          30 sec
                                        </SelectItem>
                                        <SelectItem value="45">
                                          45 sec
                                        </SelectItem>
                                        <SelectItem value="90">
                                          90 sec
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage>
                                    {errors.redirectUrl?.message}
                                  </FormMessage>
                                </FormItem>
                              )}
                            />
                          </div>
                        ) : null}
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="theme"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Review Form Theme</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) => {
                                      handleDynamicChange(
                                        "theme",
                                        value,
                                        field.onChange
                                      );
                                    }}
                                    defaultValue={dynamicData.theme}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="light">
                                        Light
                                      </SelectItem>
                                      <SelectItem value="dark">Dark</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage>
                                  {errors.theme?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="textbuttonText"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Review Submit Button Text</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    // value={dynamicData.textbuttonText}
                                    placeholder={dynamicData.textbuttonText}
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "textbuttonText",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.textbuttonText?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="videoButtonText"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Review Video button text</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    // value={dynamicData.videoButtonText}
                                    placeholder={dynamicData.videoButtonText}
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "videoButtonText",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.videoButtonText?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="questionlabel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel> Question Label</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    // value={dynamicData.questionlabel}
                                    placeholder={dynamicData.questionlabel}
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        "questionlabel",
                                        e.target.value,
                                        field.onChange
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage>
                                  {errors.questionlabel?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Spaceform;
