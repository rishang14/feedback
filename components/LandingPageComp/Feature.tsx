import {
  Palette,
  FileText,
  MessageSquare,
} from "lucide-react";

const datas = [
  {
    icon: <Palette className="h-6 w-6 text-blue-400" />,
    head: "Customizable Spaces",
    para: " Create and customize dedicated spaces for collecting testimonials with your brand colors and logo.",
  },
  {
    icon: <FileText className="h-6 w-6 text-blue-400" />,
    head: "Review Forms",
    para: "Generate custom review forms that are easy for your customers to fill out and submit.",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
    head: "Text Testimonials",
    para: " Collect written testimonials from your customers with ratings, photos, and company information.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-zinc-950">
      <div className="container  px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-5xl">
              Powerful features to collect and showcase testimonials
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Everything you need to collect, manage, and display testimonials
              from your happy customers.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {datas.map((item, ind) => {
            return (
              <div className="flex flex-col items-start bg-slate-900/100 space-y-3 rounded-lg border p-6 shadow-sm " key={ind}>
                <div className="rounded-full bg-blue-950 p-3">
                  {item.icon}
                </div>
                <h3 className="text-xl text-white font-bold">{item.head}</h3>
                <p className="text-gray-200">{item.para}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
