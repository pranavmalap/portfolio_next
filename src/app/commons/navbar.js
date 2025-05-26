"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "Case Study", href: "#case-study" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const nav = navRef.current;

    gsap.to(nav, {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      duration: 0.3,
      scrollTrigger: {
        trigger: nav,
        start: "top top",
        end: "+=100",
        scrub: true,
      },
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-[var(--navbar)] text-white px-6 py-4 shadow-md z-50 backdrop-blur"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-cyan-400 font-extrabold text-xl tracking-wide">
          PRANAV
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-cyan-300 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-sm font-medium flex flex-col items-start px-2 w-full max-w-full overflow-x-hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-300 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
