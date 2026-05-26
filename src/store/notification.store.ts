import { create }
from "zustand";

interface Notification {

  id: number;

  message: string;
}

interface NotificationState {

  notifications:
    Notification[];

  addNotification:
    (message: string) => void;

  clearNotifications:
    () => void;
}

export const
useNotificationStore =
create<NotificationState>(
(set) => ({

  notifications: [],

  addNotification:
    (message) =>

      set((state) => ({

        notifications: [

          {
            id: Date.now(),
            message,
          },

          ...state.notifications,
        ],
      })),

  clearNotifications:
    () =>

      set({
        notifications: [],
      }),
}));