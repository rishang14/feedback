import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Save,
  Trash,
  MessageCircle,
} from "lucide-react"; 
import { Button } from "./ui/button";

interface TestimonialProps {
  name: string;
  email: string;
  description: string;
  avatar: string;
  date?: string;
  isLiked?: boolean;
  isSaved?: boolean;
  isStarred?: boolean;
  // onAction?: (action: string) => void;
}

export function TestimonialCard({
  name,
  email,
  description,
  avatar,
  date = "2 days ago",
  isLiked,
  isSaved,
  isStarred,
  // onAction,
}: TestimonialProps) {
  return (
    <div className="group relative mx-auto max-w-2xl overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 sm:p-8">
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-slate-700/50 ring-offset-2 ring-offset-slate-900">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-slate-800 text-lg text-slate-200">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold text-slate-100">{name}</h3>
          <p className="text-sm text-slate-400">{email}</p>
          <p className="mt-1 text-xs text-slate-500">{date}</p>
        </div>
      </div>

      <div className="relative">
        <p className="text-lg leading-relaxed text-slate-300">{description}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button
            // onClick={() => onAction("like")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
              isLiked
                ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
            )}
          >
            <Heart className="h-4 w-4" />
            <span>Like</span>
          </Button>
          <Button
            // onClick={() => onAction("save")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
              isSaved
                ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
            )}
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
          <Button
            // onClick={() => onAction("share")}
            className="flex items-center gap-2 rounded-full bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-400 transition-all hover:bg-slate-700/50 hover:text-slate-200"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
          </Button>
          <Button
            // onClick={() => onAction("delete")}
            className="flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-400 transition-all hover:bg-rose-500/20"
          >
            <Trash className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 opacity-20 blur-2xl"></div>
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-rose-600 to-indigo-600 opacity-20 blur-2xl"></div>
    </div>
  );
}
