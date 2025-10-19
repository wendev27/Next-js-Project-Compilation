"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Models } from "appwrite";

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
  // Auth account from google using appwriteimport type { Models } from "appwrite";

  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

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
    { href: "/pages/E-Commerce-AS", label: "Dashboard" },
    { href: "/pages/E-Commerce-AS/pages/Products", label: "Products" },
    { href: "/pages/E-Commerce-AS/pages/Reviews", label: "Reviews" },
    { href: "/pages/E-Commerce-AS/pages/Statistics", label: "Statistics" },
    { href: "/pages/E-Commerce-AS/pages/MyStore", label: "My Store" },
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
              Admin Panel
            </Link>
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

      <div className="navbar_bottom flex justify-center items-center w-full h-[75px] bg-white border-b-2 border-amber-700">
        <div className="lg:container flex justify-between items-center w-full">
          {/* Navigation Links */}
          <nav className="flex items-stretch justify-between gap-6 w-full">
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
      </div>
    </div>
  );
}
