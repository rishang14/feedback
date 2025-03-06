import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className=" text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"> 
            Unlock the Power of Testimonials.
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Capture genuine customer voices and turn their experiences into
            trust-building assets for your business
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
             <Button className="bg-blue-500   text-white cursor-pointer " size={"lg"} variant={"default"} >
              Get Started 
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
