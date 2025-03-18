"use client";

import { Star, ChevronDown, ChevronUp, Tag, Gift, Share, Download, Edit, Wand2, Trash2, MoreHorizontal, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface TestimonialCardProps {
  type: "Text" | "Video";
  rating: number;
  content: string;
  name: string;
  date: string;
}

export function TestimonialCard({ type, rating, content, name, date }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const stars = Array(5).fill(0);

  return (
    <div className="w-full bg-card rounded-lg p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            {type}
          </Badge>
          <div className="flex">
            {stars.map((_, index) => (
              <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-lg">{content}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <Badge variant="secondary" className="ml-2">Good</Badge>
        </div>
      </div>

      {isExpanded && (
        <div className="flex items-center space-x-4 pt-2">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Tag className="w-4 h-4 mr-2" />
            Tags
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Gift className="w-4 h-4 mr-2" />
            Incentivize
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Wand2 className="w-4 h-4 mr-2" />
            AI
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="w-4 h-4 mr-2" />
            More
          </Button>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        className="w-full mt-2 text-muted-foreground hover:text-foreground"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}