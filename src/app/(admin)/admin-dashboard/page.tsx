"use client";

import Link from "next/link";

export default function AdminDashboardPage() {

  return (

    <div className="p-8">

      {/* HEADER */}

      <div className="space-y-2">

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Admin Dashboard
        </h1>

        <p
          className="
            text-gray-500
          "
        >
          Manage the entire platform
        </p>

      </div>

      {/* STATS */}

      <div
        className="
          mt-10
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-4
        "
      >

        <div
          className="
            rounded-2xl
            border
            p-6
            shadow-sm
          "
        >

          <h2
            className="
              text-gray-500
            "
          >
            Total Users
          </h2>

          <p
            className="
              mt-3
              text-4xl
              font-bold
            "
          >
            120
          </p>

        </div>

        <div
          className="
            rounded-2xl
            border
            p-6
            shadow-sm
          "
        >

          <h2
            className="
              text-gray-500
            "
          >
            Restaurants
          </h2>

          <p
            className="
              mt-3
              text-4xl
              font-bold
            "
          >
            24
          </p>

        </div>

        <div
          className="
            rounded-2xl
            border
            p-6
            shadow-sm
          "
        >

          <h2
            className="
              text-gray-500
            "
          >
            Orders
          </h2>

          <p
            className="
              mt-3
              text-4xl
              font-bold
            "
          >
            560
          </p>

        </div>

        <div
          className="
            rounded-2xl
            border
            p-6
            shadow-sm
          "
        >

          <h2
            className="
              text-gray-500
            "
          >
            Revenue
          </h2>

          <p
            className="
              mt-3
              text-4xl
              font-bold
              text-green-600
            "
          >
            ₹ 1.2L
          </p>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="mt-14">

        <h2
          className="
            text-3xl
            font-bold
          "
        >
          Quick Actions
        </h2>

        <div
          className="
            mt-6
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-4
          "
        >

          {/* USERS */}

          <Link
            href="/admin/users"
            className="
              rounded-2xl
              border
              p-6
              transition
              hover:bg-black
              hover:text-white
            "
          >

            <h3
              className="
                text-2xl
                font-semibold
              "
            >
              Users
            </h3>

            <p className="mt-2 text-sm">
              Manage all users
            </p>

          </Link>

          {/* RESTAURANTS */}

          <Link
            href="/admin/restaurants"
            className="
              rounded-2xl
              border
              p-6
              transition
              hover:bg-black
              hover:text-white
            "
          >

            <h3
              className="
                text-2xl
                font-semibold
              "
            >
              Restaurants
            </h3>

            <p className="mt-2 text-sm">
              Manage restaurants
            </p>

          </Link>

          {/* DELIVERY */}

          <Link
            href="/admin/delivery-partners"
            className="
              rounded-2xl
              border
              p-6
              transition
              hover:bg-black
              hover:text-white
            "
          >

            <h3
              className="
                text-2xl
                font-semibold
              "
            >
              Delivery
            </h3>

            <p className="mt-2 text-sm">
              Manage delivery partners
            </p>

          </Link>

          {/* ANALYTICS */}

          <Link
            href="/admin/analytics"
            className="
              rounded-2xl
              border
              p-6
              transition
              hover:bg-black
              hover:text-white
            "
          >

            <h3
              className="
                text-2xl
                font-semibold
              "
            >
              Analytics
            </h3>

            <p className="mt-2 text-sm">
              View platform insights
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}