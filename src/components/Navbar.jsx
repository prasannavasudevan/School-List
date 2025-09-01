import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-5 px-15 flex justify-between items-center bg-[#9112BC] text-gray-200">
      <Link to="/" className="text-lg font-semibold">
        Reno Platforms
      </Link>
      <div className="flex gap-10 font-medium">
        <Link className="hover:bg-white hover:text-gray-600 p-2 rounded-lg cursor-pointer" to="/">Home</Link>
        <NavLink className="hover:bg-white hover:text-gray-600 p-2 rounded-lg cursor-pointer" to="/add-school">Add School</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
