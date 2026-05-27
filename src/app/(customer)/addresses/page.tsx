"use client";

import { useEffect, useState } from "react";

import api from "@/lib/axios";

export default function AddressesPage() {

  const [addresses, setAddresses] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    });

  // =========================
  // FETCH ADDRESSES
  // =========================

  const fetchAddresses =
    async () => {

      try {

        const response =
          await api.get(
            "/address/my"
          );

        setAddresses(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchAddresses();

  }, []);

  // =========================
  // ADD ADDRESS
  // =========================

  const addAddress =
    async () => {

      try {

        await api.post(
          "/address/add",
          form
        );

        setForm({
          fullName: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          pincode: "",
        });

        fetchAddresses();

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // DELETE ADDRESS
  // =========================

  const deleteAddress =
    async (id: number) => {

      try {

        await api.delete(
          `/address/${id}`
        );

        fetchAddresses();

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // LOADING
  // =========================

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

      {/* FORM */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          mb-8
        "
      >

        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value,
            })
          }
          className="
            border
            rounded-xl
            p-3
          "
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          className="
            border
            rounded-xl
            p-3
          "
        />

        <input
          type="text"
          placeholder="Street"
          value={form.street}
          onChange={(e) =>
            setForm({
              ...form,
              street: e.target.value,
            })
          }
          className="
            border
            rounded-xl
            p-3
          "
        />

        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value,
            })
          }
          className="
            border
            rounded-xl
            p-3
          "
        />

        <input
          type="text"
          placeholder="State"
          value={form.state}
          onChange={(e) =>
            setForm({
              ...form,
              state: e.target.value,
            })
          }
          className="
            border
            rounded-xl
            p-3
          "
        />

        <input
          type="text"
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) =>
            setForm({
              ...form,
              pincode: e.target.value,
            })
          }
          className="
            border
            rounded-xl
            p-3
          "
        />

      </div>

      <button
        onClick={addAddress}
        className="
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
          mb-10
        "
      >
        Add Address
      </button>

      {/* ADDRESS LIST */}

      <div className="space-y-6">

        {addresses.length === 0 ? (

          <p>No addresses found</p>

        ) : (

          addresses.map((address) => (

            <div
              key={address.id}
              className="
                border
                rounded-2xl
                p-6
              "
            >

              <h2
                className="
                  text-xl
                  font-bold
                "
              >
                {address.fullName}
              </h2>

              <p>{address.phone}</p>

              <p>
                {address.street},
                {" "}
                {address.city}
              </p>

              <p>
                {address.state}
                {" - "}
                {address.pincode}
              </p>

              <button
                onClick={() =>
                  deleteAddress(
                    address.id
                  )
                }
                className="
                  mt-4
                  bg-red-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}