import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Raunak Kumar",
    email: "raunak@example.com",
    phone: "9876543210",
    address: "Sitamarhi, Bihar",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold">
            {user.name.charAt(0)}
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
            <button className="mt-3 bg-emerald-600 text-white px-4 py-1 rounded-md hover:bg-emerald-700 transition">
              Edit Profile
            </button>
          </div>

        </div>

        {/* PROFILE DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          {/* PERSONAL INFO */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Personal Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 outline-none"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 outline-none"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <input
                  type="text"
                  value={user.phone}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* ADDRESS SECTION */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Delivery Address
            </h3>

            <textarea
              value={user.address}
              rows="5"
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              readOnly
            />

            <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition">
              Change Address
            </button>
          </div>

        </div>

        {/* ORDER HISTORY */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Recent Orders
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="font-medium">Order #12345</p>
                <p className="text-sm text-gray-500">
                  2 items • ₹450
                </p>
              </div>
              <span className="text-emerald-600 font-medium">
                Delivered
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="font-medium">Order #12344</p>
                <p className="text-sm text-gray-500">
                  1 item • ₹120
                </p>
              </div>
              <span className="text-yellow-500 font-medium">
                Pending
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
