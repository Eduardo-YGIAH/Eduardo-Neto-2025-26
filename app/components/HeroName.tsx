"use client";

import dynamic from "next/dynamic";

const AnimatedHeroName = dynamic(() => import("./AnimatedHeroName"), {
  ssr: false,
  loading: () => <div className="min-h-[8rem] w-full" />,
});

export default function HeroName() {
  return (
    <div className="relative mx-auto mt-10 flex min-h-[8rem] w-full max-w-[1100px] items-center justify-center">
      <AnimatedHeroName />
    </div>
  );
}
