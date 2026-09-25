import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-icon-box">
        <div style={{ position: "relative", width: "40px", height: "40px" }}>
          <Image
            src={logoImg}
            alt="FitLog Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <span className="not-found-tag">
        404 ERROR
      </span>

      <h1 className="not-found-title">
        PAGE NOT FOUND
      </h1>

      <p className="not-found-desc">
        Looks like you racked this weight in the wrong spot. The page you are looking for doesn't exist or was moved.
      </p>

      <Link href="/" className="btn-primary">
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Workouts</span>
      </Link>
    </div>
  );
}
