import React from "react";
import z from "zod";
import { TabsContent } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { spaceFormSchema } from "@/app/types/schema";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Trash2, CirclePlus } from "lucide-react";
type Question = {
  id: string;
  question: string;
};
type spaceformtype = z.infer<typeof spaceFormSchema>;
type Props = {
  dynamicData: z.infer<typeof spaceFormSchema>;
  handleDynamicChange: (fieldName: keyof spaceformtype, value: any) => void;
  validationErrors: Record<string, string>;
  setDynamicData: React.Dispatch<React.SetStateAction<spaceformtype>>;
//   handleQuestionChange: (index: number, value: string) => void;
deletQuestionBox: (id: string) => void;
  addQuestionBox: () => void; 
  edit:boolean
};
const BasicTab = ({
  dynamicData,
  handleDynamicChange,
  validationErrors,
  deletQuestionBox,
  addQuestionBox,
  setDynamicData, 
  edit
}: Props) => { 
  // console.log(validationErrors,"i am getting the value in basic tab")
  return (
    <TabsContent value="basic" className="space-y-6 mt-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          {
            !edit && (
              <div className="space-y-2">
            <label htmlFor="space Name">Space Name</label>
            <Input
              value={dynamicData.spaceName}
              placeholder="Enter Space Name"
              onChange={(e) => handleDynamicChange("spaceName", e.target.value)}
            />
            {validationErrors["spaceName"] && (
              <p className="text-red-500">{validationErrors["spaceName"]}</p>
            )}
          </div>
            )
          }
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
              <p className="text-red-500">{validationErrors["header"]}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="customDescription"> Review Form Description</label>
            <Textarea
              value={dynamicData.customDescription}
              placeholder='We would love to hear your feedback!'
              onChange={(e) =>
                handleDynamicChange("customDescription", e.target.value)
              }
            />
            {validationErrors["customDescription"] && (
              <p className="text-red-500">
                {validationErrors["customDescription"]}
              </p>
            )}
          </div>
          <div className="flex  space-y-2  flex-col">
            <label htmlFor="Review Form question">Review Form question</label> 
            {validationErrors["questions"] && (
              <p className="text-red-500">
                {validationErrors["questions"]}
              </p>
            )}
            {dynamicData.questions.map((item: Question, ind: any) => {
              return (
                <div
                  className=" flex gap-2 flex-col items-center w-full "
                  key={item.id}
                >
                  <div className="flex gap-2 items-center w-full">
                    <Input
                      className=""
                      value={item.question}
                      placeholder={"write ur questions here"}
                      onChange={(e) => {
                        setDynamicData((prev: any) => {
                          const updatedQuestions = [...prev.questions];
                          updatedQuestions[ind] = {
                            ...updatedQuestions[ind],
                            question: e.target.value,
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
                  {validationErrors[`questions.${ind}.question`] && (
                    <p className="text-red-500 text-start">
                      {validationErrors[`questions.${ind}.question`]}
                    </p>
                  )}
                </div>
              );
            })}

            <Button
              className=" w-[100px] p-2  flex items-center text-gray-500 font-bold cursor-pointer"
              variant={"ghost"}
              onClick={addQuestionBox}
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
             { edit ? "Update Space" :   "Create Space"  }
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BasicTab;
