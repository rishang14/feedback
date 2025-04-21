"use client";
import React, { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSpaceDetails } from "@/store/spaceDetails";
import Image from "next/image";
import { Layout, MessageSquare, Settings, ThumbsUp } from "lucide-react";
import { EditFormSchema, spaceFormSchema } from "@/app/types/schema";
import axios from "axios";
import BasicTab from "./BasicTab";
import ThankyouTab from "./ThankYouTab";
import SettingTab from "./SettingTab";
import { toast } from "sonner";
import { useSpace } from "@/store/getSpace";
type Question = {
  id: string;
  question: string;
  _id?: string;
};

type spaceformtype = z.infer<typeof spaceFormSchema>;
type SpaceFormProps = {
  closeModal: () => void;
  edit: boolean;
  spaceid?: any;
};
const initialSpaceValues = {
  spaceName: "",
  header: "",
  customDescription: "",
  textbuttonText: "Submit Review",
  videoButtonText: "Start Recording",
  questions: [{ id: "1", question: "" }],
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

const initialValues = {
  spaceName: "",
  header: "header goes here",
  customDescription: "We would love to hear your feedback!",
  textbuttonText: "Submit text testimonial",
  videoButtonText: "Submit Video testimonials",
  questions: [
    {
      id: "1",
      question: "whats your thoughts on our product ? ",
    },
    {
      id: "2",
      question: "Pls Share ur expreience",
    },
    {
      id: "3",
      question: "Anything you want us to improve",
    },
  ],
  questionlabel: "Questions",
  thankYouTitle: " ThankYou!",
  thankYouMessage: "Your testimonial has been submitted successfully.",
  theme: "light",
  thankyouimg: false,
  videoreviewEnabled: false,
  videotime: "30",
  ratingEnabled: false,
  redirectUrl: "",
};

const Spaceform = ({ closeModal, edit, spaceid }: SpaceFormProps) => {
  // @ts-ignore
  const { questions, getSpaceDetails } = useSpaceDetails();
  const defaultSpaceValues = edit ? questions[0] : initialSpaceValues;
  const inputValues = edit ? questions[0] : initialValues;
  // @ts-ignore
  const { getspace, copyspaceReviewForm } = useSpace();
  const [dynamicData, setDynamicData] = useState(defaultSpaceValues);
  const [activeTab, setactiveTab] = useState("basic");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [pending, setpending] = useState<boolean>(false);

  const validateErrors = () => {
    const schema = edit
      ? EditFormSchema.safeParse(dynamicData)
      : spaceFormSchema.safeParse(dynamicData);
    const result = schema;
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      result.error.errors.forEach((err) => {
        formattedErrors[err.path.join(".")] = err.message;
      });

      return formattedErrors;
    }

    return null;
  };

  const findChangesInQuestionsArray = (
    oldArr: Question[],
    updatedArr: Question[]
  ) => {
    // const array: Question[] = [];
    // console.log(array, "before loop");
    // updatedArr.forEach((item) => {
    //   const olditem = oldArr.find((i) => i.id === item.id);
    //   if (!olditem) {
    //     array.push(item);
    //   } else if (JSON.stringify(olditem) !== JSON.stringify(item)) {
    //     array.push(item);
    //   }
    // });
    // return array;
    const changedLength = oldArr.length !== updatedArr.length;
    const modified = updatedArr.some((item) => {
      const olditem = oldArr.find((i) => i.id === item.id);
      return olditem && JSON.stringify(olditem) !== JSON.stringify(item);
    });
    const deleted = oldArr.some((item) => {
      return !updatedArr.some((i) => i.id === item.id);
    });

    const isAdded = updatedArr.some((updatedItem) => {
      return !oldArr.some((old) => old.id === updatedItem.id);
    });

    const isChanged = changedLength || modified || deleted || isAdded;

    return isChanged ? updatedArr : [];
  };

  const ChangedDataIneditFormField = (
    oldvalues: typeof EditFormSchema,
    updatedValues: typeof EditFormSchema
  ) => {
    const changedData: any = {};
    for (const key in updatedValues) {
      const oldlValue = oldvalues[key as keyof typeof oldvalues];
      const updatedValue = updatedValues[key as keyof typeof updatedValues];

      if (key === "questions") {
        const oldQuestion = oldlValue as any;
        const newQuestion = updatedValue as any;
        const questionArray = findChangesInQuestionsArray(
          oldQuestion,
          newQuestion
        );
        if (questionArray.length > 0) {
          changedData[key] = questionArray;
        }
        continue;
      } else if (oldlValue !== updatedValue) {
        changedData[key] = updatedValue;
      }
    }
    return changedData;
  };

  const handleDynamicChange = (fieldName: keyof spaceformtype, value: any) => {
    setDynamicData((prev: any) => ({ ...prev, [fieldName]: value }));
  };

  const spaceFormsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateErrors();
    if (errors) {
      setValidationErrors(errors);
      return;
    }

    if (edit) {
      const data = ChangedDataIneditFormField(defaultSpaceValues, dynamicData);
      if (Object.keys(data).length > 0) {
        setpending(true);
        try {
          const res = await axios.patch(
            `/api/editspace/editreviewform/${questions[0]._id}`,
            JSON.stringify(data),
            { withCredentials: true }
          );
          console.log(res, "res");
          if (res.data) {
            getSpaceDetails(spaceid);
            closeModal();
            toast("Edit form updated successfully");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setpending(false);
        }
      } else {
        console.log("nothing to submit");
      }
    } else {
      try {
        setpending(true);
        const res = await axios.post(
          "/api/createspace",
          JSON.stringify(dynamicData),
          {
            withCredentials: true,
          }
        );
        if (res?.data) {
          toast.success("Space is created");
          if (await copyspaceReviewForm(res?.data?.reviewFormlink as string)) {
            toast("Review form is copied to clipboard");
          } else {
            toast.error("copy space review from from spaces");
          }
          await getspace();
          closeModal();
        }
      } catch (e) {
        // @ts-ignore
        console.log(e.status);
        // @ts-ignore
        if (e?.status === 400) {
          setValidationErrors({
            // @ts-ignore
            spaceName: e?.response.data.error,
          });
        } else {
          toast.error("Internal Server error", { duration: 2000 });
        }
      } finally {
        console.log("form end successfully");
        setpending(false);
      }
    }
  };

  const addquestionBox = () => {
    setDynamicData((item: any) => ({
      ...item,
      questions: [
        ...item.questions,
        { id: String(item.questions.length + 1), question: "" },
      ],
    }));
  };

  const deletQuestionBox = (id: string) => {
    setDynamicData((prev: any) => ({
      ...prev,
      questions: prev.questions.filter((item: any) => item.id !== id),
    }));
  };
  return (
    <main className="p-6">
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
                  dynamicData?.theme === "dark" ? "bg-zinc-900" : "bg-white"
                } mt-2 min-w-[390px] max-w-[400px] p-4`}
              >
                <CardContent className="pt-6">
                  {/* <div className="space-y-4"> */}
                    <div className=" flex justify-center ">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                        <ThumbsUp color="white" className="text-white h-8 w-8"/>
                      </div>
                    </div>
                    <div className="space-y-2 p-2  text-center">
                      <h1 className="tracking-tight truncate max-w-full text-2xl font-bold">
                        {dynamicData?.header
                          ? dynamicData.header
                          : inputValues.header}
                      </h1>
                      <p className="text-gray-400 text-sm md:text-base line-clamp-2">
                        {dynamicData?.customDescription
                          ? dynamicData?.customDescription
                          : inputValues?.customDescription}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2 flex flex-col gap-2 ">
                        <h3 className="p-2 text-lg  text-black ">
                          {" "}
                          {dynamicData?.questionlabel
                            ? dynamicData.questionlabel
                            : inputValues.questionlabel}
                        </h3> 
                        <ul className="space-y-2 pl-2">
                {/* {dynamicData.questions[0].map((item:Question) => (
                  <li key={item.id} className="text-gray-600 text-sm flex items-start">
                    <span className="mr-2 text-blue-500 flex-shrink-0">•</span>
                    <span className="truncate">{item.question}</span>
                  </li>
                ))} */}
                        {dynamicData?.questions[0]?.question != ""
                          ? dynamicData.questions.map((items: Question) => (
                              <li className="text-gray-600 text-sm flex items-start" key={items.id}>
                                <span className="mr-2 text-blue-500 flex-shrink-0">•</span>
                                <span className="truncate">{items.question}</span>
                              </li>
                            ))
                          : inputValues.questions.map((items: Question) => (
                              <li className="text-gray-600 text-sm flex items-start" key={items.id}>
                                <span className="mr-2 text-blue-500 flex-shrink-0">•</span>
                                <span className="truncate">{items.question}</span>
                              </li>
                            ))} 
                             </ul>
                      </div>

                      <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium overflow-hidden"
                      variant={"secondary"} 
                      
                      >
                        {dynamicData?.textbuttonText
                          ? dynamicData.textbuttonText
                          : inputValues.textbuttonText}
                      </Button>
                      <Button className='w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium overflow-hidden'
                     >
                        {dynamicData?.videoButtonText
                          ? dynamicData.videoButtonText
                          : inputValues.videoButtonText}
                      </Button>
                    </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dynamicData?.thankyouimg === false ? (
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
                <BasicTab
                  dynamicData={dynamicData}
                  handleDynamicChange={handleDynamicChange}
                  addQuestionBox={addquestionBox}
                  deletQuestionBox={deletQuestionBox}
                  validationErrors={validationErrors}
                  setDynamicData={setDynamicData}
                  edit={edit}
                  pending={pending}
                />
                <ThankyouTab
                  dynamicData={dynamicData}
                  handleDynamicChange={handleDynamicChange}
                  validationErrors={validationErrors}
                />
                <SettingTab
                  handleDynamicChange={handleDynamicChange}
                  dynamicData={dynamicData}
                  validationErrors={validationErrors}
                />
              </form>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Spaceform;
