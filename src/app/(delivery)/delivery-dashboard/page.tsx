"use client";

import Link from "next/link";

export default function DeliveryDashboardPage() {
  return (
    <div className="p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          Delivery Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage your deliveries
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        
        <Link
          href="/delivery/orders"
          className="
            rounded-2xl
            border
            p-6
            hover:bg-black
            hover:text-white
            transition
          "
        >
          <h2 className="text-2xl font-semibold">
            Available Orders
          </h2>

          <p className="mt-2 text-sm">
            Accept new deliveries
          </p>
        </Link>

        <Link
          href="/delivery/my-deliveries"
          className="
            rounded-2xl
            border
            p-6
            hover:bg-black
            hover:text-white
            transition
          "
        >
          <h2 className="text-2xl font-semibold">
            My Deliveries
          </h2>

          <p className="mt-2 text-sm">
            Track assigned orders
          </p>
        </Link>

        <Link
          href="/delivery/history"
          className="
            rounded-2xl
            border
            p-6
            hover:bg-black
            hover:text-white
            transition
          "
        >
          <h2 className="text-2xl font-semibold">
            Delivery History
          </h2>

          <p className="mt-2 text-sm">
            View completed deliveries
          </p>
        </Link>
      </div>
    </div>
  );
}