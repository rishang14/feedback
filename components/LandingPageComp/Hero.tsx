// import React from "react";
// import { Button } from "../ui/button";

// const Hero = () => {
//   return (
//     <main className=" text-white">
//       <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
//         <div className="mx-auto max-w-3xl text-center">
//           <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
//             Unlock the Power of Testimonials.
//           </h1>

//           <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
//             Capture genuine customer voices and turn their experiences into
//             trust-building assets for your business
//           </p>

//           <div className="mt-8 flex flex-wrap justify-center gap-4">
//              <Button className="bg-blue-500   text-white cursor-pointer " size={"lg"} variant={"default"} >
//               Get Started
//               </Button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Hero;


import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative w-full py-12 min-h-screen md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute bg-zinc-900/10 inset-0 -z-10  bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]"></div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text">
          Unlock the Power of Testimonials.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-[800px]">
          Capture genuine customer voices and turn their experiences into
                   trust-building assets for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <Link href="/signin">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Try FREE now
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


// import { motion } from "framer-motion";
// import { Pacifico } from "next/font/google";
// import Image from "next/image";
// import { cn } from "@/lib/utils";

// const pacifico = Pacifico({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-pacifico",
// });

// function ElegantShape({
//   className,
//   delay = 0,
//   width = 400,
//   height = 100,
//   rotate = 0,
//   gradient = "from-white/[0.08]",
// }: {
//   className?: string;
//   delay?: number;
//   width?: number;
//   height?: number;
//   rotate?: number;
//   gradient?: string;
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: -150,
//         rotate: rotate - 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         rotate: rotate,
//       }}
//       transition={{
//         duration: 2.4,
//         delay,
//         ease: [0.23, 0.86, 0.39, 0.96],
//         opacity: { duration: 1.2 },
//       }}
//       className={cn("absolute", className)}
//     >
//       <motion.div
//         animate={{
//           y: [0, 15, 0],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Number.POSITIVE_INFINITY,
//           ease: "easeInOut",
//         }}
//         style={{
//           width,
//           height,
//         }}
//         className="relative"
//       >
//         <div
//           className={cn(
//             "absolute inset-0 rounded-full",
//             "bg-gradient-to-r to-transparent",
//             gradient,
//             "backdrop-blur-[2px] border-2 border-white/[0.15]",
//             "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
//             "after:absolute after:inset-0 after:rounded-full",
//             "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
//           )}
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

// export default function Hero({
//   // badge = "Kokonut UI",
//   title1 = "Unlock the Power",
//   title2 = "of Reviews",
// }: {
//   badge?: string;
//   title1?: string;
//   title2?: string;
// }) {
//   const fadeUpVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 1,
//         delay: 0.5 + i * 0.2,
//         ease: [0.25, 0.4, 0.25, 1],
//       },
//     }),
//   };

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

//       <div className="absolute inset-0 overflow-hidden">
//         <ElegantShape
//           delay={0.3}
//           width={600}
//           height={140}
//           rotate={12}
//           gradient="from-indigo-500/[0.15]"
//           className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
//         />

//         <ElegantShape
//           delay={0.5}
//           width={500}
//           height={120}
//           rotate={-15}
//           gradient="from-rose-500/[0.15]"
//           className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
//         />

//         <ElegantShape
//           delay={0.4}
//           width={300}
//           height={80}
//           rotate={-8}
//           gradient="from-violet-500/[0.15]"
//           className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
//         />

//         <ElegantShape
//           delay={0.6}
//           width={200}
//           height={60}
//           rotate={20}
//           gradient="from-amber-500/[0.15]"
//           className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
//         />

//         <ElegantShape
//           delay={0.7}
//           width={150}
//           height={40}
//           rotate={-25}
//           gradient="from-cyan-500/[0.15]"
//           className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
//         />
//       </div>

//       <div className="relative z-10 container mx-auto px-4 md:px-6">
//         <div className="max-w-3xl mx-auto text-center">
//           {/* <motion.div
//             custom={0}
//             variants={fadeUpVariants}
//             initial="hidden"
//             animate="visible"
//             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
//           >
//             <Image src="https://kokonutui.com/logo.svg" alt="Kokonut UI" width={20} height={20} />
//             <span className="text-sm text-white/60 tracking-wide">{badge}</span>
//           </motion.div> */}

//           <motion.div
//             custom={1}
//             variants={fadeUpVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
//               <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
//                 {title1}
//               </span>
//               <br />
//               <span
//                 className={cn(
//                   "bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white/90 to-blue-600 ",
//                   pacifico.className
//                 )}
//               >
//                 {title2}
//               </span>
//             </h1>
//           </motion.div>

//           <motion.div
//             custom={2}
//             variants={fadeUpVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
//               Capture genuine customer voices and turn their experiences into
//               trust-building assets for your business
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
//     </div>
//   );
// }
