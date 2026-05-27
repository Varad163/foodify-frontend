"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      role: "",
    });

  useEffect(() => {

    const email =
      localStorage.getItem(
        "email"
      ) || "";

    const role =
      localStorage.getItem(
        "role"
      ) || "";

    const name =
      localStorage.getItem(
        "name"
      ) || "User";

    setProfile({
      name,
      email,
      role,
    });

  }, []);

  return (

    <div className="p-8">

      <h1
        className="
          text-4xl
          font-bold
          mb-2
        "
      >
        My Profile
      </h1>

      <p className="text-gray-500 mb-8">
        Manage your account
      </p>

      <div
        className="
          max-w-2xl
          rounded-2xl
          border
          p-8
          shadow-sm
          space-y-6
        "
      >

        <div>

          <p className="text-gray-500">
            Name
          </p>

          <h2
            className="
              text-2xl
              font-semibold
            "
          >
            {profile.name}
          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Email
          </p>

          <h2
            className="
              text-xl
            "
          >
            {profile.email}
          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Role
          </p>

          <h2
            className="
              text-xl
              font-medium
            "
          >
            {profile.role}
          </h2>

        </div>

        <button
          onClick={() => {

            localStorage.clear();

            window.location.href =
              "/login";
          }}

          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}