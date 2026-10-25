"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import LoginModal from "@/components/LoginModal";
import HandDrawnOvalSvg from "@/components/nav/HandDrawnOvalSvg";
import AboutFlyout from "@/components/nav/AboutFlyout";
import WorkFlyout from "@/components/nav/WorkFlyout";
import WritingFlyout from "@/components/nav/WritingFlyout";
import ResumeFlyout from "@/components/nav/ResumeFlyout";
import ProductsFlyout from "@/components/nav/ProductsFlyout";
import ConnectFlyout from "@/components/nav/ConnectFlyout";
import LoginFlyout from "@/components/nav/LoginFlyout";
import ChalkStrikeThrough from "@/components/nav/ChalkStrikeThrough";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredAuthWord, setHoveredAuthWord] = useState<"login" | "signup" | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<{ username: string; role: string; displayName: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 380);
  };

  // Active state: hovered item, or fallback to current route
  const activeItem =
    hoveredItem ||
    (pathname === "/"
      ? null
      : pathname.startsWith("/products")
      ? "products"
      : pathname.startsWith("/work")
      ? "work"
      : pathname.startsWith("/about")
      ? "about"
      : pathname.startsWith("/blog")
      ? "writing"
      : pathname.startsWith("/resume")
      ? "resume"
      : null);

  const handleAuthAction = async () => {
    if (user) {
      try {
        await fetch("/api/auth", { method: "DELETE" });
        setUser(null);
        if (pathname.startsWith("/admin")) {
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Logout failed", err);
      }
    } else {
      setAuthModalTab("login");
      setLoginModalOpen(true);
    }
  };

  return (
    <header
      className="relative w-full flex flex-col items-center pt-4 sm:pt-8 lg:pt-12 pb-6 sm:pb-10 lg:pb-16 select-none z-50 pointer-events-auto px-4 sm:px-6"
      onMouseLeave={handleMouseLeave}
    >
      {/* Mobile / Tablet Top Bar (< lg) */}
      <div className="w-full max-w-4xl flex lg:hidden items-center justify-between py-2">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="relative px-3 py-1 font-chalk font-bold text-3xl tracking-tight text-neutral-800 dark:text-[#ece5d8] transition-transform active:scale-95 flex items-center justify-center"
          title="Home"
        >
          <span>:)</span>
          {pathname === "/" && <HandDrawnOvalSvg variant="circle" />}
        </Link>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-transform active:scale-95 cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-300">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path d="M 12,2 L 12,5 M 12,19 L 12,22 M 2,12 L 5,12 M 19,12 L 22,12 M 5,5 L 7,7 M 17,17 L 19,19 M 5,19 L 7,17 M 17,7 L 19,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-700">
                <path d="M 21 12.79 A 9 9 0 1 1 11.21 3 A 7 7 0 0 0 21 12.79 z" fill="currentColor" />
              </svg>
            )}
          </button>

          {/* Chalk Hamburger / Close Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-neutral-800 dark:text-[#ece5d8] hover:text-[#d94e34] dark:hover:text-[#f87171] transition-transform active:scale-95 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 32 32" className="w-7 h-7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M 8,8 L 24,24" />
                <path d="M 24,8 L 8,24" />
              </svg>
            ) : (
              <svg viewBox="0 0 32 32" className="w-7 h-7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M 5,9 C 12,8.5 20,9.5 27,9" />
                <path d="M 6,16 C 14,16.5 19,15.5 26,16" />
                <path d="M 5,23 C 11,22.5 21,23.5 27,23" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Hand-Drawn Navigation Cluster (Desktop >= lg) */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-10 font-chalk text-2xl xl:text-3xl text-neutral-800 dark:text-[#ece5d8] transition-colors">
        
        {/* ITEM 0: :) (Smiley with Red Sunburst Rays) */}
        <div
          className="relative flex items-center cursor-pointer"
          onMouseEnter={() => handleMouseEnter("home")}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/"
            className="relative px-3 py-1 flex items-center justify-center font-bold tracking-tight transition-transform hover:scale-110"
            title="Home"
          >
            <span>:)</span>

            {/* Hand-Drawn Oval Circle */}
            {activeItem === "home" && <HandDrawnOvalSvg variant="circle" />}

            {/* Red Sunburst Radiant Rays */}
            {activeItem === "home" && (
              <svg
                viewBox="0 0 54 50"
                className="absolute -top-7 -left-3 w-16 h-16 text-[#d94e34] pointer-events-none overflow-visible animate-doodle-drop-spring"
              >
                <path d="M 14,14 L 4,3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M 28,10 L 28,-3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M 42,14 L 52,3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M 8,26 L -4,26" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            )}
          </Link>
        </div>

        {/* ITEM 1: about (with Horizontal Right Flyout: Avatar & Sparkles) */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/about"
            onMouseEnter={() => handleMouseEnter("about")}
            onFocus={() => handleMouseEnter("about")}
            onBlur={handleMouseLeave}
            className="relative px-4 py-1 font-normal lowercase tracking-wide transition-colors"
          >
            <span>about</span>
            {activeItem === "about" && <HandDrawnOvalSvg />}
          </Link>

          {activeItem === "about" && <AboutFlyout />}
        </div>

        {/* ITEM 2: Work (with Horizontal Right Flyout: Lanyard Badge & Cursor) */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => handleMouseEnter("work")}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/work"
            onMouseEnter={() => handleMouseEnter("work")}
            onFocus={() => handleMouseEnter("work")}
            onBlur={handleMouseLeave}
            className="relative px-4 py-1 font-normal tracking-wide transition-colors"
          >
            <span>Work</span>
            {activeItem === "work" && <HandDrawnOvalSvg />}
          </Link>

          {activeItem === "work" && <WorkFlyout />}
        </div>

        {/* ITEM 2.5: Products (with Physical Price Tag Flyout) */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => handleMouseEnter("products")}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/products"
            onMouseEnter={() => handleMouseEnter("products")}
            onFocus={() => handleMouseEnter("products")}
            onBlur={handleMouseLeave}
            className="relative px-4 py-1 font-normal tracking-wide transition-colors"
          >
            <span>Products</span>
            {activeItem === "products" && <HandDrawnOvalSvg />}
          </Link>

          {activeItem === "products" && <ProductsFlyout />}
        </div>

        {/* ITEM 3: Writing (with Horizontal Right Flyout: Open Notebook & Quill) */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => handleMouseEnter("writing")}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/blog"
            onMouseEnter={() => handleMouseEnter("writing")}
            onFocus={() => handleMouseEnter("writing")}
            onBlur={handleMouseLeave}
            className="relative px-4 py-1 font-normal lowercase tracking-wide transition-colors"
          >
            <span>writing</span>
            {activeItem === "writing" && <HandDrawnOvalSvg />}
          </Link>

          {activeItem === "writing" && <WritingFlyout />}
        </div>

        {/* ITEM 4: Resume (with Horizontal Right Flyout: Certificate & PDF Badge) */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => handleMouseEnter("resume")}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/resume"
            onMouseEnter={() => handleMouseEnter("resume")}
            onFocus={() => handleMouseEnter("resume")}
            onBlur={handleMouseLeave}
            className="relative px-4 py-1 font-normal lowercase tracking-wide transition-colors"
          >
            <span>resume</span>
            {activeItem === "resume" && <HandDrawnOvalSvg />}
          </Link>

          {activeItem === "resume" && <ResumeFlyout />}
        </div>

        {/* ITEM 5: Connect */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => handleMouseEnter("connect")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            onMouseEnter={() => handleMouseEnter("connect")}
            onFocus={() => handleMouseEnter("connect")}
            onBlur={handleMouseLeave}
            className="relative px-4 py-1 font-normal tracking-wide transition-colors cursor-pointer text-neutral-800 dark:text-[#ece5d8]"
            onClick={() => {
              const el = document.getElementById("connect-footer");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Connect</span>
            {activeItem === "connect" && <HandDrawnOvalSvg />}
          </button>

          {activeItem === "connect" && (
            <ConnectFlyout onMouseEnter={() => handleMouseEnter("connect")} />
          )}
        </div>

        {/* ITEM 6: login / signup or logout */}
        <div
          className="relative flex items-center group/auth"
          onMouseEnter={() => handleMouseEnter("login")}
          onMouseLeave={() => {
            handleMouseLeave();
            setHoveredAuthWord(null);
          }}
        >
          {user ? (
            <button
              type="button"
              onMouseEnter={() => handleMouseEnter("login")}
              onFocus={() => handleMouseEnter("login")}
              onBlur={handleMouseLeave}
              onClick={handleAuthAction}
              className="relative px-3 sm:px-4 py-1 font-normal tracking-wide transition-colors cursor-pointer text-neutral-800 dark:text-[#ece5d8] flex items-center gap-1.5"
              title={`Signed in as ${user.displayName} (click to log out)`}
            >
              <span>logout</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {activeItem === "login" && <HandDrawnOvalSvg />}
            </button>
          ) : (
            <div
              className="relative px-3 sm:px-4 py-1 flex items-center font-normal tracking-wide text-neutral-800 dark:text-[#ece5d8] select-none"
              onMouseEnter={() => handleMouseEnter("login")}
            >
              {/* Outer shared oval ring encircling BOTH of them together */}
              {(activeItem === "login" || !!hoveredAuthWord) && <HandDrawnOvalSvg />}

              {/* "login" sub-button */}
              <button
                type="button"
                onMouseEnter={() => {
                  handleMouseEnter("login");
                  setHoveredAuthWord("login");
                }}
                onClick={() => {
                  setAuthModalTab("login");
                  setLoginModalOpen(true);
                }}
                className={`login-btn relative px-1 py-0.5 cursor-pointer transition-all duration-200 group-has-[.signup-btn:hover]:opacity-35 group-has-[.signup-btn:hover]:text-neutral-500 ${
                  hoveredAuthWord === "signup" ? "opacity-35 text-neutral-500" : ""
                } hover:text-[#d94e34] dark:hover:text-[#f87171]`}
                title="Log in to your account"
              >
                <span>login</span>
                <span className={`${hoveredAuthWord === "signup" ? "block" : "hidden"} group-has-[.signup-btn:hover]:block`}>
                  <ChalkStrikeThrough />
                </span>
              </button>

              {/* Slash separator */}
              <span className="px-1 text-neutral-400 dark:text-neutral-600 pointer-events-none">
                /
              </span>

              {/* "signup" sub-button */}
              <button
                type="button"
                onMouseEnter={() => {
                  handleMouseEnter("login");
                  setHoveredAuthWord("signup");
                }}
                onClick={() => {
                  setAuthModalTab("signup");
                  setLoginModalOpen(true);
                }}
                className={`signup-btn relative px-1 py-0.5 cursor-pointer transition-all duration-200 group-has-[.login-btn:hover]:opacity-35 group-has-[.login-btn:hover]:text-neutral-500 ${
                  hoveredAuthWord === "login" ? "opacity-35 text-neutral-500" : ""
                } hover:text-[#d94e34] dark:hover:text-[#f87171]`}
                title="Create a new account"
              >
                <span>signup</span>
                <span className={`${hoveredAuthWord === "login" ? "block" : "hidden"} group-has-[.login-btn:hover]:block`}>
                  <ChalkStrikeThrough />
                </span>
              </button>
            </div>
          )}

          {activeItem === "login" && (
            <LoginFlyout
              user={user}
              onMouseEnter={() => handleMouseEnter("login")}
              onClick={handleAuthAction}
            />
          )}
        </div>

        {/* RIGHT UTILITIES: Sun/Moon Theme Toggle with clean divider */}
        <div className="flex items-center pl-3 sm:pl-4 border-l border-neutral-300 dark:border-neutral-700">
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-transform hover:scale-110 cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-300">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path d="M 12,2 L 12,5 M 12,19 L 12,22 M 2,12 L 5,12 M 19,12 L 22,12 M 5,5 L 7,7 M 17,17 L 19,19 M 5,19 L 7,17 M 17,7 L 19,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-700">
                <path d="M 21 12.79 A 9 9 0 1 1 11.21 3 A 7 7 0 0 0 21 12.79 z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Chalk Drawer Overlay (< lg) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] sm:top-[76px] bottom-0 z-40 bg-[#f6f4ee]/98 dark:bg-[#121316]/98 backdrop-blur-md flex flex-col items-center justify-start pt-8 pb-16 px-6 overflow-y-auto lg:hidden border-t border-neutral-200 dark:border-neutral-800 transition-all animate-fadeIn">
          <nav className="flex flex-col items-center gap-6 font-chalk text-3xl sm:text-4xl text-neutral-800 dark:text-[#ece5d8] w-full max-w-xs">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="relative px-6 py-2 tracking-tight transition-transform active:scale-95 text-center"
            >
              <span>home :)</span>
              {pathname === "/" && <HandDrawnOvalSvg />}
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="relative px-6 py-2 lowercase tracking-wide transition-transform active:scale-95 text-center"
            >
              <span>about</span>
              {pathname.startsWith("/about") && <HandDrawnOvalSvg />}
            </Link>

            <Link
              href="/work"
              onClick={() => setMobileMenuOpen(false)}
              className="relative px-6 py-2 tracking-wide transition-transform active:scale-95 text-center"
            >
              <span>Work</span>
              {pathname.startsWith("/work") && <HandDrawnOvalSvg />}
            </Link>

            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="relative px-6 py-2 tracking-wide transition-transform active:scale-95 text-center"
            >
              <span>Products</span>
              {pathname.startsWith("/products") && <HandDrawnOvalSvg />}
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="relative px-6 py-2 lowercase tracking-wide transition-transform active:scale-95 text-center"
            >
              <span>writing</span>
              {pathname.startsWith("/blog") && <HandDrawnOvalSvg />}
            </Link>

            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="relative px-6 py-2 lowercase tracking-wide transition-transform active:scale-95 text-center"
            >
              <span>resume</span>
              {pathname.startsWith("/resume") && <HandDrawnOvalSvg />}
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const el = document.getElementById("connect-footer");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
              className="relative px-6 py-2 tracking-wide transition-transform active:scale-95 text-center text-neutral-800 dark:text-[#ece5d8] cursor-pointer"
            >
              <span>Connect</span>
            </button>

            {/* Mobile Auth Button */}
            <div className="pt-4 border-t border-neutral-300 dark:border-neutral-700 w-full flex items-center justify-center">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAuthAction();
                  }}
                  className="relative px-6 py-2 tracking-wide transition-transform active:scale-95 text-center text-neutral-800 dark:text-[#ece5d8] flex items-center gap-2 cursor-pointer"
                >
                  <span>logout</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
              ) : (
                <div className="flex items-center gap-3 text-2xl sm:text-3xl">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalTab("login");
                      setLoginModalOpen(true);
                    }}
                    className="hover:text-[#d94e34] dark:hover:text-[#f87171] transition-colors cursor-pointer px-3 py-1"
                  >
                    login
                  </button>
                  <span className="text-neutral-400 dark:text-neutral-600">/</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalTab("signup");
                      setLoginModalOpen(true);
                    }}
                    className="hover:text-[#d94e34] dark:hover:text-[#f87171] transition-colors cursor-pointer px-3 py-1"
                  >
                    signup
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* In-Place Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        initialTab={authModalTab}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={(authResult, redirectUrl) => {
          setUser(authResult);
          setTimeout(() => {
            window.location.href = redirectUrl || "/admin/projects";
          }, 400);
        }}
      />
    </header>
  );
}
