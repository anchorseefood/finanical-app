"use client";

import {
  FaChartArea,
  FaRegEdit,
  FaMoneyBill,
  FaShoppingCart,
  FaListAlt,
  FaTruck,
  FaUsers,
  FaWallet,
  FaClock,
  FaUtensils,
  FaPlaneDeparture,
  FaListUl,
  FaCog,
  FaChartBar,
} from "react-icons/fa";
import NavDrawer from "./components/Drawers/NavDrawer";
import "./globals.css";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Layout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCostDropdownOpen, setIsCostDropdownOpen] = useState(false);
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const dropdownRef = useRef(null);

  // Handle click outside to close the dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close Employees dropdown
        setIsCostDropdownOpen(false); // Close Costs dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll to change navbar opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 300, 0.7); // Reduce opacity as user scrolls down
      setNavbarOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav
          dir="rtl"
          className="sticky top-0 z-50 bg-blue-500 relative transition-opacity duration-300"
          style={{ opacity: navbarOpacity }}
        >
          {/* Mobile Navigation */}
          <div className="p-4 bg-blue-500 text-white font-bold flex justify-between items-center md:hidden">
            <button
              className="text-white hover:text-yellow-300"
              onClick={() => setIsDrawerOpen(true)}
            >
              <div>
                <FaListUl className="" size={20} />
              </div>
            </button>{" "}
            <div className="flex gap-2 items-center">
              <h1>MR. HOTDOG</h1>
              <Image width={25} height={25} src="/logoHotDog.jpg" />
            </div>
          </div>

          {/* Drawer for mobile */}
          <NavDrawer
            title="التنقل"
            open={isDrawerOpen}
            setOpen={setIsDrawerOpen}
          >
            <ul className="space-y-4">
              <li>
                <a href="/" className="hover:text-yellow-300">
                  لوحة التحكم {/* Dashboard */}
                </a>
              </li>
              <li>
                <a href="/costs" className="hover:text-yellow-300">
                  التكاليف {/* Costs */}
                </a>
              </li>
              <li>
                <a href="/sales" className="hover:text-yellow-300">
                  المبيعات {/* Sales */}
                </a>
              </li>
              <li>
                <a href="/purchases" className="hover:text-yellow-300">
                  المشتريات {/* Purchases */}
                </a>
              </li>
              <li>
                <a href="/suppliers" className="hover:text-yellow-300">
                  الموردون {/* Suppliers */}
                </a>
              </li>
              <li>
                <a href="/employees" className="hover:text-yellow-300">
                  الموظفين {/* Employees */}
                </a>
              </li>
              <li>
                <a href="/withdrawals" className="hover:text-yellow-300">
                  السحوبات {/* Withdrawals */}
                </a>
              </li>
              <li>
                <a href="/salaryAccount" className="hover:text-yellow-300">
                  حساب الرواتب {/* Salary Account */}
                </a>
              </li>
              <li>
                <a href="/attendance" className="hover:text-yellow-300">
                  الحضور {/* Attendance */}
                </a>
              </li>
              <li>
                <a href="/costsTypes" className="hover:text-yellow-300">
                  أنواع التكاليف {/* Costs Types */}
                </a>
              </li>
              <li>
                <a href="/overTime" className="hover:text-yellow-300">
                  العمل الإضافي {/* Over Time */}
                </a>
              </li>
              <li>
                <a href="/staffFood" className="hover:text-yellow-300">
                  طعام الموظفين {/* Staff Food */}
                </a>
              </li>
              <li>
                <a href="/Vacations" className="hover:text-yellow-300">
                  الإجازات {/* Vacations */}
                </a>
              </li>
            </ul>
          </NavDrawer>

          <ul className="hidden md:flex justify-around p-4 bg-blue-500 text-white font-bold space-x-4">
            <li>
              <a
                className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                href="/"
              >
                <FaChartBar className="flex-shrink-0" /> لوحة التحكم{" "}
                {/* Dashboard */}
              </a>
            </li>

            {/* Costs dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                className="cursor-pointer hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform"
                onClick={() => setIsCostDropdownOpen(!isCostDropdownOpen)}
              >
                <FaCog className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                التكاليف {/* Costs */}
              </button>

              {isCostDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white text-black rounded-md p-2 w-40 shadow-lg space-y-2 z-10">
                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/costs"
                    >
                      <FaCog className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      التكاليف {/* Costs */}
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/costsTypes"
                    >
                      <FaListAlt className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      أنواع التكاليف {/* Cost Types */}
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                href="/sales"
              >
                <FaMoneyBill className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                المبيعات {/* Sales */}
              </a>
            </li>

            <li>
              <a
                className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                href="/purchases"
              >
                <FaShoppingCart className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                المشتريات {/* Purchases */}
              </a>
            </li>

            <li>
              <a
                className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                href="/suppliers"
              >
                <FaTruck className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                الموردون {/* Suppliers */}
              </a>
            </li>

            {/* Employees dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                className="cursor-pointer hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUsers className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                الموظفين {/* Employees */}
              </button>

              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white text-black rounded-md p-2 w-40 shadow-lg space-y-2 z-10">
                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/employees"
                    >
                      <FaUsers className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      الموظفين {/* Employees */}
                    </a>
                  </li>

                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/deductions"
                    >
                      <FaWallet className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      الخصومات {/* Deductions */}
                    </a>
                  </li>

                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/withdrawals"
                    >
                      <FaMoneyBill className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      السحوبات {/* Withdrawals */}
                    </a>
                  </li>

                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/salaryAccount"
                    >
                      <FaWallet className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      حساب الرواتب {/* Salary Account */}
                    </a>
                  </li>

                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/attendance"
                    >
                      <FaClock className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      الحضور {/* Attendance */}
                    </a>
                  </li>

                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/overTime"
                    >
                      <FaClock className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      العمل الإضافي {/* Over Time */}
                    </a>
                  </li>

                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/staffFood"
                    >
                      <FaUtensils className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      طعام الموظفين {/* Staff Food */}
                    </a>
                  </li>

                  <li>
                    <a
                      className="hover:text-yellow-300 gap-1 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      href="/Vacations"
                    >
                      <FaPlaneDeparture className="flex-shrink-0 hover:text-yellow-300 cursor-pointer" />
                      الإجازات {/* Vacations */}
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
