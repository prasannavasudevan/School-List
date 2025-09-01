import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    try {

      const formData = new FormData();
      formData.append("school_name", data.school_name);
      formData.append("email", data.email);
      formData.append("contact_number", data.contact_number);
      formData.append("state", data.state);
      formData.append("city", data.city);
      formData.append("address", data.address);
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await axios.post(`${API}/add-schools`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("School added successfully");
      reset();
    } catch (error) {
      console.error(error);
      setMessage("Error while adding school");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 mt-8 mb-20 pt-20 pb-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Add School</h2>

      {message && (
        <p className="text-center text-sm mb-3 text-green-600">{message}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="School Name"
          {...register("school_name", { required: true })}
          className="w-full p-2 border rounded-md"
        />
        {errors.school_name && (
          <span className="text-red-500 text-sm">School name is required</span>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full p-2 border rounded-md"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">Email is required</span>
        )}

        <input
          type="text"
          placeholder="Contact Number"
          {...register("contact_number", { required: true })}
          className="w-full p-2 border rounded-md"
        />
        {errors.contact_number && (
          <span className="text-red-500 text-sm">
            Contact number is required
          </span>
        )}

        <input
          type="text"
          placeholder="State"
          {...register("state", { required: true })}
          className="w-full p-2 border rounded-md"
        />
        {errors.state && (
          <span className="text-red-500 text-sm">State is required</span>
        )}

        <input
          type="text"
          placeholder="City"
          {...register("city", { required: true })}
          className="w-full p-2 border rounded-md"
        />
        {errors.city && (
          <span className="text-red-500 text-sm">City is required</span>
        )}

        <textarea
          placeholder="Address"
          {...register("address", { required: true })}
          className="w-full p-2 border rounded-md"
        />
        {errors.address && (
          <span className="text-red-500 text-sm">Address is required</span>
        )}

        <input
          type="file"
          {...register("image")}
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


