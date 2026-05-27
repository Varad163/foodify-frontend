"use client";

import {
  useEffect,
  useState,
} from "react";

import api from "@/lib/axios";

export default function
ProfilePage() {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const fetchProfile =
    async () => {

      try {

        const response =
          await api.get(
            "/user/profile"
          );

        setUser(
          response.data.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchProfile();

  }, []);

  if (loading) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (

    <div className="p-8">

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        My Profile
      </h1>

      <div
        className="
          border
          rounded-2xl
          p-8
          max-w-2xl
        "
      >

        <div className="space-y-6">

          <div>

            <p className="text-gray-500">
              Name
            </p>

            <h2 className="text-2xl font-semibold">
              {user?.name}
            </h2>

          </div>

          <div>

            <p className="text-gray-500">
              Email
            </p>

            <h2 className="text-xl">
              {user?.email}
            </h2>

          </div>

          <div>

            <p className="text-gray-500">
              Role
            </p>

            <h2 className="text-xl">
              {user?.role}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}