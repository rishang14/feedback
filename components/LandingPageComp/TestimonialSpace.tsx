import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from "next/link";

export default function TestimonialSpace() {
  return (
    <main className="w-full py-12 md:py-24 lg:py-32  bg-neutral-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className=" bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent  sm:text-4xl md:text-5xl">
              Generate custom review forms in seconds
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400/100 md:text-xl">
              Create personalized forms to collect text and video testimonials
              from your customers.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 items-center mx-auto max-w-[1040px]">
          <div className="space-y-6  ">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Customizable review forms</h3>
              <p className="text-gray-400/70">
                Create forms that match your brand and ask exactly what you want
                to know from your customers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-950 p-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Custom questions</h4>
                  <p className="text-sm text-gray-400/70">
                    Ask specific questions that will help you get the most
                    valuable feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-950 p-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Text  options</h4>
                  <p className="text-sm text-gray-400/70">
                    Collect written testimonials, 
                    in form.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-950 p-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Shareable links</h4>
                  <p className="text-sm text-gray-400/70">
                    Share your form via links or embed
                    directly on your website.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-950 p-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Mobile-friendly</h4>
                  <p className="text-sm text-gray-400/70">
                    Forms work perfectly on all devices, making it easy for
                    customers to leave reviews.
                  </p>
                </div>
              </div>
            </div>
            <Link href={"/signin"}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create your first form
            </Button>
            </Link>
          </div>

          <div className="rounded-lg border shadow-lg overflow-hidden bg-slate-900/100 ">
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                     R
                    </div>
                    <h4 className="font-medium text-white">ReviewVault</h4>
                  </div>
                  {/* <div className="text-sm text-muted-foreground">1/3</div> */}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Share your experience with Acme Inc.
                  </h3>
                  <p className="text-gray-400/100">
                    We'd love to hear about your experience with our product.
                    Your feedback helps us improve!
                  </p>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Your name</label>
                    <Input disabled={true} placeholder="John doe"
                     className="placeholder:text-white!"/>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Your Email</label>
                    <Input
                      type="text" 
                      disabled={true}
                      placeholder="john@gmail.com  "
                      className="placeholder:text-white!"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Write Your feedback Here</label>
                    <Textarea
                     
                      disabled={true}
                      placeholder="Write your review here"
                      className=" min-h-40 placeholder:text-white!"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" disabled={true}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
