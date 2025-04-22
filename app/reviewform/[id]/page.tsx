"use client"
import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useSpace } from "@/store/getSpace";
import { ThumbsUp } from "lucide-react";
import { TestimonialFormButton } from "@/components/Testimonialbutton";
import Loading from "@/app/loading"; 
import NotFound from "@/app/not-found";


const Page = () => {
  const { id } = useParams();
  // @ts-ignore
  const { getspaceReviewForm, spaceReviewDetail } = useSpace(); 
  const [error,setError] =useState(false)

  useEffect(() => {
    const fetchData = async () => { 
      if(id){
        const res= await getspaceReviewForm(id as string); 
        console.log(res,"res")
         if(!res.success){
          setError(true)
         }
        }else{
          console.log("hello")
        }
      };
    fetchData();
  }, []);
  
    if(error){
      return <NotFound/>
    }
  if (Object?.keys(spaceReviewDetail)?.length === 0) return <Loading />;
  return (
    <>
      <main className="min-h-screen flex items-center  bg-gray-100">
        <div className="container mx-auto max-w-4xl p-4  flex items-center justify-center md:p-8">
          <div className="bg-white rounded-lg md:min-w-150  shadow-md p-6 md:p-8">
          <div className=" flex justify-center ">
           <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
             <ThumbsUp color="white" className="text-white h-8 w-8"/>
             </div>
           </div>
            <div className="text-center mb-8">
              <h1 className="text-xl font-semibold text-gray-800">
                {spaceReviewDetail?.header}
              </h1>
              <p className="text-gray-700">
                {spaceReviewDetail?.customDescription}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 border-b-4 border-indigo-500 pb-2 inline-block">
                {spaceReviewDetail?.questionlabel}
              </h2>
              <ul className="space-y-4 mt-4">
                {spaceReviewDetail?.questions?.map((item: any) => {
                  return (
                    <li className="flex items-start" key={item._id}>
                      <span className="text-gray-600 mr-2">•</span>
                      <span>{item.question}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <TestimonialFormButton
                spacename={id as string}
                spacedetails={spaceReviewDetail}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;




