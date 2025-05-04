import React from "react";
import z from "zod";
import { spaceFormSchema } from "@/app/types/schema";
import { Input } from "./ui/input";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
type spaceformtype = z.infer<typeof spaceFormSchema>;
type props = {
  dynamicData: z.infer<typeof spaceFormSchema>;
  handleDynamicChange: (fieldName: keyof spaceformtype, value: any) => void;
  validationErrors: Record<string, string>;
};

const ThankyouTab = ({
  dynamicData,
  handleDynamicChange,
  validationErrors,
}: props) => {
  return (
    <TabsContent value="thankyou" className="space-y-6 mt-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 sapce-x-2">
              <label htmlFor="thankyou img "> Hide this img ?</label>
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
              placeholder="ThankYou!"
              onChange={(e) =>
                handleDynamicChange("thankYouTitle", e.target.value)
              }
            />
            {validationErrors["thankYouTitle"] && (
              <p className="text-red-500">
                {validationErrors["thankYouTitle"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="thankyouMsg">Thank You Message</label>

            <Textarea
              value={dynamicData.thankYouMessage}
              placeholder="Your testimonial has been submitted successfully."
              onChange={(e) =>
                handleDynamicChange("thankYouMessage", e.target.value)
              }
            />
            {validationErrors["thankYouMessage"] && (
              <p className="text-red-500">
                {validationErrors["thankYouMessage"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="redirecturl"> Redirect URL (Optional)</label>
            <Input
              placeholder="www.yourWebsiteName.com"
              onChange={(e) =>
                handleDynamicChange("redirectUrl", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ThankyouTab;
