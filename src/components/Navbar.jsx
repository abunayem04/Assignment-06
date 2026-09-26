"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import logoImg from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { todayPlan, savedWorkouts } = usePlan();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <div className="nav-logo-icon">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
          <span className="nav-logo-text">FITLOG</span>
        </Link>

        <div className="nav-menu">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`nav-link ${pathname === "/my-plan" ? "active" : ""}`}
          >
            My Plan
          </Link>
        </div>

        <div className="nav-actions">
          <Link href="/my-plan" className="badge-plan" title="Today's Plan">
            <span>Plan</span>
            <span className="badge-plan-count">{todayPlan.length}</span>
          </Link>

          <Link href="/my-plan" className="badge-saved" title="Saved Workouts">
            <span>Saved</span>
            <span className="badge-saved-count">{savedWorkouts.length}</span>
          </Link>
        </div>

        <div className="nav-mobile-controls">
          <Link
            href="/my-plan"
            className="badge-plan"
            title="Today's Plan"
            onClick={() => setIsOpen(false)}
          >
            <span>Plan</span>
            <span className="badge-plan-count">{todayPlan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="badge-saved"
            title="Saved Workouts"
            onClick={() => setIsOpen(false)}
          >
            <span>Saved</span>
            <span className="badge-saved-count">{savedWorkouts.length}</span>
          </Link>

          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <Link
            href="/"
            className={`mobile-link ${pathname === "/" ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`mobile-link ${pathname === "/my-plan" ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}
