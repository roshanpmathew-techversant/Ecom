import React, { useState, useEffect, useRef } from "react";
import { currentUser, LogoutUser } from "../services/api/services";
import { User, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileIcon = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const logged = Boolean(user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await currentUser();
        if (fetchedUser) setUser(fetchedUser);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await LogoutUser();
      setUser(null);
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div
      className="relative flex flex-row gap-5 items-center"
      ref={dropdownRef}
    >
      {/* Profile display */}
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span>{logged ? user.name : "Guest"}</span>
        <span className="border rounded-2xl p-1">
          <User />
        </span>
      </div>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          {logged ? (
            <>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate("/profile");
                  setDropdownOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                navigate("/login");
                setDropdownOpen(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Cart icon */}
      <div
        onClick={() => navigate("/cart")}
        className="relative flex items-center cursor-pointer"
      >
        <ShoppingBasket />
        {logged && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {user.cart?.length || 0}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileIcon;
