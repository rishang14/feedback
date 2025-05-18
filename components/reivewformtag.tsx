  import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"  
import { Button } from "./ui/button"
import React from "react"

type props ={
    isTagDialogOpen:boolean,
    setIsTagDialogOpen:(open: boolean) => void; 
    tags:Array<string>
} 
 const    ManageReviewTags=({isTagDialogOpen,setIsTagDialogOpen,tags}:props )=>{
    return (
       <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Apply tags to this testimonial</DialogTitle>
            <DialogDescription>
              You can add multiple tags if you want. Manage all your tags{" "}
            
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-2">
              {/* {tempSelectedTags.map((tag) => (
                <Badge key={tag} className="flex items-center gap-1 bg-blue-500 text-white">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                </Badge>
              ))} */}
            </div>

            <Input
              placeholder="Search"
            //   value={searchQuery}
            //   onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2 text-white"
            />

            <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
              <div className="flex items-center space-x-2 p-2 hover:bg-neutral-800 rounded-md">
                <input
                  type="checkbox"
                  id="select-all"  
                //   checked={isAllSelected}
                //   onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-white"
                />
                <label htmlFor="select-all" className="text-sm font-medium text-white">
                  Select All
                </label>
              </div>
{/* 
              {filteredTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md"
                >
                  <input
                    type="checkbox"
                    id={`tag-${tag}`}
                    // checked={tempSelectedTags.includes(tag)}
                    // onChange={() => handleTagToggle(tag)}
                    className="h-4 w-4"
                  />
                  <label htmlFor={`tag-${tag}`} className="text-sm font-medium">
                    {tag}
                  </label>
                </div>
              ))} */}
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button type="button" variant="outline" className="text-neutral-400" onClick={() => setIsTagDialogOpen(false)}>
              Close
            </Button>
            <Button type="button" 
            // onClick={handleApplyTags} 
            className="bg-blue-600 hover:bg-blue-700 text-white">
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>  
    )
} 

export default ManageReviewTags;