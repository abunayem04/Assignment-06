"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import bannerImg from "@/assets/banner.png";

export default function Hero() {
  const handleScrollToLibrary = () => {
    const libraryElement = document.getElementById("library");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-left">
          <span className="hero-tag">
            WORKOUT LIBRARY
          </span>

          <h1 className="hero-title">
            TRAIN WITH INTENT. <br />
            <span>LOG EVERY SET.</span>
          </h1>

          <p className="hero-desc">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <button onClick={handleScrollToLibrary} className="btn-primary">
            <span>BROWSE WORKOUTS</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="hero-right">
          <div className="hero-img-box">
            <Image
              src={bannerImg}
              alt="Gym Workout"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
