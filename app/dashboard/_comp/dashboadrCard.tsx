" use client"
import React from 'react'
import { Card, CardContent, } from "@/components/ui/card";
import DropdownMenuDemo from './withdropdownmenu'; 
import { useRouter } from 'next/navigation';

 const DashboardCardWithMenu = ({ item }: { item: any }) => {  
  console.log("rendered from child compoenent",)
  const router = useRouter();
  const handleClick = async (spaces: any) => { 
    const query = new URLSearchParams({
    tab: "review",
    page: "1",
  }).toString();
    router.push(`/dashboard/space/${spaces}?${query}`);
  };

  return (
      <Card className="bg-zinc-950/50 overflow-hidden relative group    rounded-lg border border-gray-500/70 shadow-sm">
        <CardContent className="max-w-[270px] flex justify-between items-center ">
          <div className="w-[260px]  flex justify-between ">
            <p
              className="text-white hover:text-gray-200/90 text-xl font-medium underline cursor-pointer"
              onClick={() => handleClick(item._id)}
            >
              {" "}
              {item.spacename}
            </p>
            <DropdownMenuDemo item={item} />
          </div>
        </CardContent>
      </Card>
  );
};


export default React.memo(DashboardCardWithMenu)