import React from "react";

const SchoolCard = ({ schools }) => {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg bg-white
                    hover:shadow-xl transition duration-300 flex flex-col"
    >
      {schools.image && (
        <img
          className="w-full h-48 object-cover"
          src={schools.image}
          alt={schools.name}
        />
      )}
      <div className="px-6 py-4 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-900 text-black">
          {schools.name}
        </h3>
        <p className="text-gray-700 text-gray-400 text-sm mb-1">
          {schools.address}
        </p>
        <p className="text-gray-700 text-gray-400 text-sm">{schools.city}</p>
      </div>
    </div>
  );
};

export default SchoolCard;
