import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link href="/" className="footer-logo">
          <div className="nav-logo-icon">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          <span className="footer-logo-text">
            FITLOG
          </span>
        </Link>

        <p className="footer-copy">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
