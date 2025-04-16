import { Palette, Layout, FileText, MessageSquare, Video, Share2, Globe, Shield } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl text-blue-500 font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful features to collect and showcase testimonials
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Everything you need to collect, manage, and display testimonials from your happy customers.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="flex flex-col items-start bg-black space-y-3 rounded-lg border p-6 shadow-sm ">
            <div className="rounded-full bg-purple-950 p-3">
              <Palette className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl text-white font-bold">Customizable Spaces</h3>
            <p className="text-gray-200">
              Create and customize dedicated spaces for collecting testimonials with your brand colors and logo.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm bg-black">
            <div className="rounded-full bg-purple-950 p-3">
              <Layout className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Beautiful Templates</h3>
            <p className="text-gray-200">
              Choose from a variety of templates to showcase your testimonials in a way that matches your brand.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm bg-black">
            <div className="rounded-full bg-purple-950 p-3">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl text-white font-bold">Review Forms</h3>
            <p className="text-gray-200">
              Generate custom review forms that are easy for your customers to fill out and submit.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm bg-card">
            <div className="rounded-full bg-purple-950 p-3">
              <MessageSquare className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Text Testimonials</h3>
            <p className="text-muted-foreground">
              Collect written testimonials from your customers with ratings, photos, and company information.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm bg-card">
            <div className="rounded-full bg-purple-950 p-3">
              <Video className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Video Testimonials</h3>
            <p className="text-muted-foreground">
              Collect powerful video testimonials directly from your customers' browsers - no software needed.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm bg-card">
            <div className="rounded-full bg-purple-950 p-3">
              <Share2 className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Easy Sharing</h3>
            <p className="text-muted-foreground">
              Share your testimonial collection page or embed testimonials directly on your website.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm bg-card">
            <div className="rounded-full bg-purple-950 p-3">
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">No Coding Required</h3>
            <p className="text-muted-foreground">
              Set up and manage your testimonial collection without any technical knowledge or developer help.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm bg-card">
            <div className="rounded-full bg-purple-950 p-3">
              <Shield className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Moderation Controls</h3>
            <p className="text-muted-foreground">
              Review and approve testimonials before they go live to ensure quality content.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
