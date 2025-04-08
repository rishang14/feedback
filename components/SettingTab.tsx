import React from 'react'; 
import z from "zod";
import { spaceFormSchema } from "@/app/types/schema";
import { Input } from "./ui/input";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardContent } from "./ui/card"; 
import { Select,SelectTrigger,SelectContent ,SelectValue,SelectItem} from '@radix-ui/react-select';
type spaceformtype = z.infer<typeof spaceFormSchema>;
type props = {
  dynamicData: z.infer<typeof spaceFormSchema>;
  handleDynamicChange: (fieldName: keyof spaceformtype, value: any) => void;
  validationErrors: Record<string, string>;
};
const SettingTab = ({dynamicData,handleDynamicChange,validationErrors}:props) => {
  return (
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
                          placeholder= "Submit text testimonial"
                          onChange={(e) =>
                            handleDynamicChange(
                              "textbuttonText",
                              e.target.value
                            )
                          }
                        />
                        {validationErrors["textbuttonText"] && (
                          <p className="text-red-500">
                            {validationErrors["textbuttonText"]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="videoButtonText">
                          Review Video button text
                        </label>
                        <Input
                          value={dynamicData.videoButtonText}
                          placeholder="Submit Video testimonials"
                          onChange={(e) =>
                            handleDynamicChange(
                              "videoButtonText",
                              e.target.value
                            )
                          }
                        />
                        {validationErrors["textbuttonText"] && (
                          <p className="text-red-500">
                            {validationErrors["textbuttonText"]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="questionlabel"> Question Label</label>
                        <Input
                          value={dynamicData.questionlabel}
                          placeholder='Questions'
                          onChange={(e) =>
                            handleDynamicChange("questionlabel", e.target.value)
                          }
                        />
                        {validationErrors["questionlabel"] && (
                          <p className="text-red-500">
                            {validationErrors["questionlabel"]}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
  )
}

export default SettingTab