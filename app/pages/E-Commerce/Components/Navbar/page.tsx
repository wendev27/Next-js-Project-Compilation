"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { account } from "../../../../../lib/E-commerce/appwriteEcommerce";

import {
  Armchair,
  Check,
  Heart,
  Info,
  Search,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";

function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-inter font-medium capitalize ${
        isActive ? "text-amber-700" : "text-black"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  // Auth account from google using appwrite
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get(); // ✅ check session
        setUser(userData);
      } catch (err) {
        setUser(null); // not logged in
      }
    };

    fetchUser();
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const pathname = usePathname();

  const navLinks = [
    { href: "/pages/E-Commerce", label: "Home" },
    { href: "/pages/E-Commerce/pages/Shop", label: "Shop" },
    { href: "/pages/E-Commerce/pages/Reviews", label: "Reviews" },
    { href: "/pages/E-Commerce/pages/Pages", label: "Pages" },
    { href: "/pages/E-Commerce/pages/About", label: "About" },
  ];

  async function logout() {
    try {
      await account.deleteSession("current"); // end session like php
      window.location.href = "/pages/E-Commerce/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div>
      {/* Navbar Top */}
      <div className="navbar_top flex items-center justify-center bg-amber-800 h-[40px] w-full">
        <div className="lg:container flex justify-between items-center">
          <p className="flex items-center gap-2 text-sm font-inter font-normal text-white capitalize">
            <Check />
            Free on all orders over $50
          </p>

          <div className="navbar_top-right flex items-center gap-6">
            <select
              defaultValue="Server Location"
              className="select select-neutral h-[30px w-[100px] text-sm font-inter font-normal capitalize"
            >
              <option value="" className="bg-black">
                ENG
              </option>
              <option value="" className="bg-black">
                FIL
              </option>
            </select>

            <Link
              href="/faqs"
              className="text-sm text-white font-inter font-normal capitalize"
            >
              Faqs
            </Link>

            <Link
              href="/help"
              className="flex items-center text-sm text-white font-inter font-normal capitalize"
            >
              <Info /> need help?
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar MIddle */}
      <div className="navbar_middle flex items-center justify-center bg-amber-700 w-full h-[84px]">
        <div className="lg:container flex justify-between items-center ">
          {/* Logo */}
          <div className="logo_wrapper">
            <Link
              href="/pages/E-Commerce"
              className="text-3xl text-white font-inter font-medium capitalize flex items-center gap-2"
            >
              <Armchair size="2rem" className="text-white" />
              Comfort
            </Link>
          </div>

          {/* Search */}
          <div className="search_box">
            <form action="#" className="w-70 h-[44px] relative">
              <input
                type="text"
                className="w-full h-full text-black bg-gray-200 rounded-lg pl-4"
                placeholder="Search here..."
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Search size="22px" className="text-amber-700" />
              </button>
            </form>
          </div>

          {/* right side */}
          <div className="navbar_middle_right flex items-center gap-4">
            {user ? (
              <>
                <button className="btn capitalize">
                  <ShoppingCart />
                </button>
                <button className="btn capitalize">
                  <Heart />
                </button>{" "}
              </>
            ) : (
              <> </>
            )}

            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                <User />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {user ? (
                  <>
                    <li>
                      <Link href="/auth/login">Account</Link>
                    </li>
                    <li>
                      <Link href="/pages/E-Commerce" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/pages/E-Commerce/auth/Login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar_bottom flex items-center justify-center w-full h-[75px] bg-white border-b-2 border-amber-700">
        <div className="lg:container flex items-center justify-between">
          {/* Categories Dropdown */}
          <div className="navbar_bottom_right flex items-center gap-8">
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 flex items-center gap-5 capitalize"
              >
                <Menu /> All categories
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>Chair</li>
                <li>Pants</li>
                <li>Shirt</li>
                <li>T-Shirt</li>
              </ul>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-inter font-medium capitalize ${
                    pathname === link.href ? "text-amber-700" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="navbar_bottom_right">
            <p>
              Contact <span className="text-black">(808)555-0111</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
