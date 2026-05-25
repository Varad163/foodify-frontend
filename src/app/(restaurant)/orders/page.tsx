"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getRestaurantOrders,
  confirmOrder,
  prepareOrder,
  outForDelivery,
  deliverOrder,
  cancelOrder,
} from "@/services/restaurant-order.service";

export default function RestaurantOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders = async () => {

    try {

      const data =
        await getRestaurantOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  const handleAction = async (
    action: any,
    orderId: number
  ) => {

    try {

      await action(orderId);

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  if (loading) {

    return (
      <div className="p-6">
        Loading orders...
      </div>
    );
  }

  return (

    <main className="p-6">

      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Restaurant Orders
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Manage incoming orders
        </p>

      </div>

      <div className="space-y-5">

        {orders.map((order) => (

          <div
            key={order.id}
            className="
              rounded-2xl
              border
              p-5
              space-y-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                  "
                >
                  Order #{order.id}
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Status:
                  {" "}
                  {order.status}
                </p>

              </div>

              <div
                className="
                  text-right
                "
              >

                <p
                  className="
                    text-lg
                    font-bold
                  "
                >
                  ₹ {order.totalAmount}
                </p>

              </div>

            </div>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              <button
                onClick={() =>
                  handleAction(
                    confirmOrder,
                    order.id
                  )
                }
                className="
                  rounded-xl
                  bg-blue-500
                  px-4
                  py-2
                  text-white
                "
              >
                Confirm
              </button>

              <button
                onClick={() =>
                  handleAction(
                    prepareOrder,
                    order.id
                  )
                }
                className="
                  rounded-xl
                  bg-yellow-500
                  px-4
                  py-2
                  text-white
                "
              >
                Prepare
              </button>

              <button
                onClick={() =>
                  handleAction(
                    outForDelivery,
                    order.id
                  )
                }
                className="
                  rounded-xl
                  bg-purple-500
                  px-4
                  py-2
                  text-white
                "
              >
                Out For Delivery
              </button>

              <button
                onClick={() =>
                  handleAction(
                    deliverOrder,
                    order.id
                  )
                }
                className="
                  rounded-xl
                  bg-green-500
                  px-4
                  py-2
                  text-white
                "
              >
                Delivered
              </button>

              <button
                onClick={() =>
                  handleAction(
                    cancelOrder,
                    order.id
                  )
                }
                className="
                  rounded-xl
                  bg-red-500
                  px-4
                  py-2
                  text-white
                "
              >
                Cancel
              </button>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}