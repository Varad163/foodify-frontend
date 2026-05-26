"use client";

import {
  Bell
} from "lucide-react";

import {
  useNotificationStore
} from "@/store/notification.store";

export default function
NotificationBell() {

  const {

    notifications,

    clearNotifications,

  } =
  useNotificationStore();

  return (

    <div className="relative">

      <button
        className="
          relative
        "
      >

        <Bell size={24} />

        {notifications.length > 0 && (

          <span
            className="
              absolute
              -right-2
              -top-2
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-xs
              text-white
            "
          >
            {notifications.length}
          </span>
        )}

      </button>

      <div
        className="
          absolute
          right-0
          mt-4
          w-80
          rounded-2xl
          border
          bg-white
          p-4
          shadow-xl
        "
      >

        <div
          className="
            mb-4
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-lg
              font-bold
            "
          >
            Notifications
          </h2>

          <button
            onClick={
              clearNotifications
            }
            className="
              text-sm
              text-red-500
            "
          >
            Clear
          </button>

        </div>

        <div
          className="
            space-y-3
          "
        >

          {notifications.length === 0 ? (

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              No notifications
            </p>

          ) : (

            notifications.map(
              (notification) => (

                <div
                  key={
                    notification.id
                  }
                  className="
                    rounded-xl
                    border
                    p-3
                    text-sm
                  "
                >
                  {
                    notification.message
                  }
                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}