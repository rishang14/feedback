"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { TagIcon, TagsIcon, Trash2, X } from "lucide-react";
import { Label } from "./ui/label";

type prop = {
  open: boolean;
  onchangeopen: (open: boolean) => void;
  tags: Array<string>;
};

export default function TagManager({ open, onchangeopen, tags }: prop) {
  const [newTagName, setNewTagName] = useState("");

  const handleCreateTag = () => {
    if (newTagName.trim() === "") return;
  };
  return (
    <Dialog open={open} onOpenChange={onchangeopen}>
      <DialogContent className="flex flex-col ">
        <DialogHeader>
          <DialogTitle className="text-white">Manage tags </DialogTitle>
          <DialogDescription>You can create and delete tags</DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="space-y-4">
            <Label className="text-foreground">Create New Tag</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter tag name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateTag();
                }}
              />
              <Button
                variant={"outline"}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleCreateTag}
                //   disabled={newTagName.trim() === "" || tags.length >= 5}
              >
                Create
              </Button>
            </div>

            <div className="bg-muted-background rounded-md p-4">
              <div className="font-medium mb-2 text-foreground">Manage Tags</div>

              {tags?.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-between py-2 "
                >
                  <p className="text-white">{tag}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-neutral-400" />
                    </Button>
                  </div>
                </div>
              ))}
              {tags.length === 0 && (
                <div className="text-sm text-center flex items-center justify-center gap-2 text-muted-foreground py-2">
                 <TagsIcon className="w-4 h-4"/> Oops!! Tags is empty 
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
