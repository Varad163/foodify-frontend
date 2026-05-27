"use client";

import {
  useEffect,
  useState,
} from "react";

import api from "@/lib/axios";

export default function
AddressesPage() {

  const [addresses, setAddresses] =
    useState<any[]>([]);

  const [address, setAddress] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH
  // =========================

  const fetchAddresses =
    async () => {

      try {

        const response =
          await api.get(
            "/address/my"
          );

        setAddresses(
          response.data.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // ADD ADDRESS
  // =========================

  const addAddress =
    async () => {

      if (!address) return;

      try {

        await api.post(
          "/address/add",
          {
            address,
          }
        );

        setAddress("");

        fetchAddresses();

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // DELETE ADDRESS
  // =========================

  const deleteAddress =
    async (
      id: number
    ) => {

      try {

        await api.delete(
          `/address/${id}`
        );

        fetchAddresses();

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchAddresses();

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
          mb-2
        "
      >
        My Addresses
      </h1>

      <p
        className="
          text-gray-500
          mb-8
        "
      >
        Manage delivery addresses
      </p>

      {/* ADD */}

      <div
        className="
          flex
          gap-4
          mb-8
        "
      >

        <input

          value={address}

          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }

          placeholder="Enter address"

          className="
            flex-1
            border
            rounded-xl
            p-3
          "
        />

        <button

          onClick={addAddress}

          className="
            bg-black
            text-white
            px-6
            rounded-xl
          "
        >

          Add

        </button>

      </div>

      {/* LIST */}

      <div className="space-y-4">

        {addresses.length === 0 ? (

          <p>
            No addresses found
          </p>

        ) : (

          addresses.map(
            (item) => (

              <div

                key={item.id}

                className="
                  border
                  rounded-2xl
                  p-6
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <h2
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    {item.address}
                  </h2>

                </div>

                <button

                  onClick={() =>
                    deleteAddress(
                      item.id
                    )
                  }

                  className="
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-xl
                  "
                >

                  Delete

                </button>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}