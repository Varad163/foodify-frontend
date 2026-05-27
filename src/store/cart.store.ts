import { create }
from "zustand";

interface CartItem {

  id: number;

  name: string;

  price: number;

  quantity: number;

  image?: string;
}

interface CartStore {

  items: CartItem[];

  addItem: (
    item: CartItem
  ) => void;

  removeItem: (
    id: number
  ) => void;

  increaseQuantity: (
    id: number
  ) => void;

  decreaseQuantity: (
    id: number
  ) => void;

  clearCart: () => void;
}

export const useCartStore =
create<CartStore>(
  (set) => ({

    items: [],

    // ======================
    // ADD ITEM
    // ======================

    addItem: (item) =>

      set((state) => {

        const existingItem =
          state.items.find(
            (i) =>
              i.id === item.id
          );

        // already exists
        if (existingItem) {

          return {

            items:
              state.items.map(
                (i) =>

                  i.id === item.id

                    ? {
                        ...i,
                        quantity:
                          i.quantity + 1,
                      }

                    : i
              ),
          };
        }

        // new item
        return {

          items: [

            ...state.items,

            {
              ...item,
              quantity: 1,
            },
          ],
        };
      }),

    // ======================
    // REMOVE ITEM
    // ======================

    removeItem: (id) =>

      set((state) => ({

        items:
          state.items.filter(
            (item) =>
              item.id !== id
          ),
      })),

    // ======================
    // INCREASE
    // ======================

    increaseQuantity: (id) =>

      set((state) => ({

        items:
          state.items.map(
            (item) =>

              item.id === id

                ? {
                    ...item,
                    quantity:
                      item.quantity + 1,
                  }

                : item
          ),
      })),

    // ======================
    // DECREASE
    // ======================

    decreaseQuantity: (id) =>

      set((state) => ({

        items:
          state.items

            .map((item) =>

              item.id === id

                ? {
                    ...item,
                    quantity:
                      item.quantity - 1,
                  }

                : item
            )

            .filter(
              (item) =>
                item.quantity > 0
            ),
      })),

    // ======================
    // CLEAR CART
    // ======================

    clearCart: () =>

      set({
        items: [],
      }),
  })
);