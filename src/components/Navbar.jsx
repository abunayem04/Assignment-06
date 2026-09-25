"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import logoImg from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = usePlan();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-icon">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
          <span className="nav-logo-text">
            FITLOG
          </span>
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
            <span className="badge-plan-count">
              {todayPlan.length}
            </span>
          </Link>

          <Link href="/my-plan" className="badge-saved" title="Saved Workouts">
            <span>Saved</span>
            <span className="badge-saved-count">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
