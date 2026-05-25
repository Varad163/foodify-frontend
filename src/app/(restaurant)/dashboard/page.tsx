"use client";

import Link from "next/link";

export default function RestaurantDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Restaurant Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your restaurant efficiently
        </p>
      </div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-3xl font-bold mt-2">
            24
          </p>
        </div>

        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-500">
            Pending Orders
          </h2>

          <p className="text-3xl font-bold mt-2 text-yellow-500">
            6
          </p>
        </div>

        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-600">
            ₹ 12,500
          </p>
        </div>

        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-500">
            Total Foods
          </h2>

          <p className="text-3xl font-bold mt-2 text-blue-600">
            18
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Quick Actions
        </h2>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          <Link
            href="/add-food"
            className="
              border
              rounded-2xl
              p-6
              hover:bg-black
              hover:text-white
              transition
            "
          >
            <h3 className="text-xl font-semibold">
              Add Food
            </h3>

            <p className="mt-2 text-sm">
              Add new food items
            </p>
          </Link>

          <Link
            href="/restaurant/foods"
            className="
              border
              rounded-2xl
              p-6
              hover:bg-black
              hover:text-white
              transition
            "
          >
            <h3 className="text-xl font-semibold">
              Manage Foods
            </h3>

            <p className="mt-2 text-sm">
              Edit and delete foods
            </p>
          </Link>

          <Link
            href="/orders"
            className="
              border
              rounded-2xl
              p-6
              hover:bg-black
              hover:text-white
              transition
            "
          >
            <h3 className="text-xl font-semibold">
              Orders
            </h3>

            <p className="mt-2 text-sm">
              View incoming orders
            </p>
          </Link>

          <Link
            href="/restaurant/analytics"
            className="
              border
              rounded-2xl
              p-6
              hover:bg-black
              hover:text-white
              transition
            "
          >
            <h3 className="text-xl font-semibold">
              Analytics
            </h3>

            <p className="mt-2 text-sm">
              View business insights
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}