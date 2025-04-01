"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    vdeoreviewEnabled: false,
    videotime: "30",
  });

  const formController = useForm<spaceformtype>({
    resolver: zodResolver(spaceFormSchema),
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
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | boolean
      | string,
    keys: string
  ) => {
    let value: string | boolean;

    if (typeof e === "boolean" || typeof e === "string") {
      value = e;
    } else if (e.target.type === "checkbox") {
      value = (e.target as HTMLInputElement).checked;
    } else {
      value = e.target.value;
    }
    setDynamicData((prev) => ({ ...prev, [keys]: value }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
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
                    {dynamicData.Thankyouimg === false ? (
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    value={dynamicData.spaceName}
                                    placeholder="Enter Space Name"
                                    onChange={(e) =>
                                      handleDynamicChange(e, "spaceName")
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
                                    value={dynamicData.header}
                                    placeholder="Review form Header Title"
                                    onChange={(e) =>
                                      handleDynamicChange(e, "header")
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
                                    value={dynamicData.customDescription}
                                    placeholder={dynamicData.customDescription}
                                    onChange={(e) =>
                                      handleDynamicChange(
                                        e,
                                        "customDescription"
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
                                              value={
                                                dynamicData.questions[ind]
                                                  .questions
                                              }
                                              placeholder={item.questions}
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
                                                field.onChange(e.target.value);
                                              }}
                                            />
                                          </FormControl>

                                          <Button
                                            className="text-lg cursor-pointer bg-white hover:text-gray-400"
                                            variant="link"
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
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      handleDynamicChange(
                                        checked,
                                        "ratingEnabled"
                                      );
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name="vdeoreviewEnabled"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Video Review</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      handleDynamicChange(
                                        checked,
                                        "vdeoreviewEnabled"
                                      );
                                    }}
                                  />
                                </FormControl>
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
                                      onCheckedChange={(checked) => {
                                        field.onChange(checked);
                                        handleDynamicChange(
                                          checked,
                                          "Thankyouimg"
                                        );
                                      }}
                                    />
                                  </FormControl>
                                </div>
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
                                    value={dynamicData.thankYouTitle}
                                    placeholder={dynamicData.thankYouTitle}
                                    onChange={(e) =>
                                      handleDynamicChange(e, "thankYouTitle")
                                    }
                                  />
                                </FormControl>
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
                                    value={dynamicData.thankYouMessage}
                                    placeholder={dynamicData.thankYouMessage}
                                    onChange={(e) =>
                                      handleDynamicChange(e, "thankYouMessage")
                                    }
                                  />
                                </FormControl>
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
                                      handleDynamicChange(e, "redirectUrl")
                                    }
                                  />
                                </FormControl>
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
                        {dynamicData.vdeoreviewEnabled === true ? (
                          <div className="space-y-2">
                            <FormField
                              control={control}
                              name="videotime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel> Maximum Video duration</FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={(value) => {
                                        field.onChange(value);
                                      }}
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
                                    onValueChange={(value) =>
                                      field.onChange(value)
                                    }
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
                                    value={dynamicData.textbuttonText}
                                    placeholder={dynamicData.textbuttonText}
                                    onChange={(e) =>
                                      handleDynamicChange(e, "textbuttonText")
                                    }
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={control}
                            name="videoButtonnText"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Review Video button text</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={dynamicData.videoButtonnText}
                                    placeholder={dynamicData.videoButtonnText}
                                    onChange={(e) =>
                                      handleDynamicChange(e, "videoButtonnText")
                                    }
                                  />
                                </FormControl>
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
                                    value={dynamicData.questionlabel}
                                    placeholder={dynamicData.questionlabel}
                                    onChange={(e) =>
                                      handleDynamicChange(e, "questionlabel")
                                    }
                                  />
                                </FormControl> 
                                <FormMessage>{errors.questionlabel?.message}</FormMessage>
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
