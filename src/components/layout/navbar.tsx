"use client";

import Link from "next/link";

import { useRouter }
from "next/navigation";

import { useAuthStore }
from "@/store/auth.store";

import NotificationBell from "@/components/layout/notification-bell";
export default function Navbar() {

  const router = useRouter();

  const {
    role,
    logout,
  } = useAuthStore();

  const handleLogout = () => {

    logout();

    router.push("/login");
  };

  return (

    <nav
      className="
        flex
        items-center
        justify-between
        border-b
        px-8
        py-4
      "
    >

      <Link
        href="/"
        className="
          text-2xl
          font-bold
        "
      >
        FoodDelivery
      </Link>

      <div
        className="
          flex
          items-center
          gap-6
        "
      >

        {/* CUSTOMER */}

        {role === "CUSTOMER" && (
          <>
            <Link href="/">
              Home
            </Link>

            <Link href="/cart">
              Cart
            </Link>

            <Link href="/my-orders">
              My Orders
            </Link>
          </>
        )}

        {/* RESTAURANT */}

        {role ===
          "RESTAURANT_OWNER" && (
          <>
            <Link
              href="/restaurant-dashboard"
            >
              Dashboard
            </Link>

            <Link href="/orders">
              Orders
            </Link>

            <Link
              href="/restaurant/foods"
            >
              Foods
            </Link>
          </>
        )}

        {/* DELIVERY */}

        {role ===
          "DELIVERY_PARTNER" && (
          <>
            <Link
              href="/delivery-dashboard"
            >
              Dashboard
            </Link>

            <Link
              href="/delivery/orders"
            >
              Orders
            </Link>

            <Link
              href="/delivery/my-deliveries"
            >
              My Deliveries
            </Link>
          </>
        )}

        {/* ADMIN */}

        {role === "ADMIN" && (
          <>
            <Link
              href="/admin-dashboard"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/users"
            >
              Users
            </Link>

            <Link
              href="/admin/analytics"
            >
              Analytics
            </Link>
          </>
        )}
        <NotificationBell />

        {/* LOGOUT */}

        {role && (
            
          <button
            onClick={handleLogout}
            className="
              rounded-xl
              bg-black
              px-4
              py-2
              text-white
            "
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}