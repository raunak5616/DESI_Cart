import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useEffect } from "react";
import { getProfile } from "../../apiCalls/productapi";
export default function Profile() {
  const { logout } = useAuth();
  const navigater = useNavigate();
  const [popup, setpopup] = useState(false);
  const [image, setimage] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const fetchProfile = async (id) => {
      const data = await getProfile(id);
      setUser(data);
    }
    const fetchOrders = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_MONGO_URI}/orders/${id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    }
    if (id) {
      fetchProfile(id);
      fetchOrders();
    }
  }, [id]);



  const handleSave = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formdata.append(key, value);
    })
    if (image) {
      formdata.append("images", image);
    }
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // ✅ add this for debugging
      const response = await axios.post(`${import.meta.env.VITE_MONGO_URI}/profileUpdate`, formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
        }
      );
      alert(response.data.message);
      setpopup(false);
      // Make API call to save updated profile
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        logout();
        navigater("/login");
        // redirect to login
        console.log("error updating profile❌❌:", err);
      }
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {popup && (<div className="fixed inset-0 backdrop-blur-md bg-white/30 flex justify-center items-center z-50">

        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={user?.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border p-2 mb-3 rounded"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={user?.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border p-2 mb-3 rounded"
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone"
            value={user?.phone || ""}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="w-full border p-2 mb-3 rounded"
          />

          {/* Address */}
          <textarea
            placeholder="Address"
            value={user?.address || ""}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            className="w-full border p-2 mb-3 rounded"
          />
          <input
            type="file"
            onChange={(e) => setimage(e.target.files[0])}
            className="block w-full text-sm text-gray-600
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:bg-green-500 file:text-white
                         hover:file:bg-green-600 cursor-pointer"
          />
          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setpopup(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>

      </div>
      )}
      <div className="max-w-5xl mx-auto">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold overflow-hidden">
            {user?.images?.url ? (
              <img src={user.images.url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0) || "U"
            )}
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.name || "User"}
            </h2>
            <p className="text-gray-500">{user?.email || "No email provided"}</p>
            <button className="mt-3 bg-emerald-600 text-white px-4 py-1 rounded-md hover:bg-emerald-700 transition" onClick={() => setpopup(true)}>
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
                  value={user?.name || ""}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <input
                  type="text"
                  value={user?.phone || ""}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50"
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
              rows="5"
              value={user?.address || ""}
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50"
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

          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="flex justify-between items-center border-b pb-4 last:border-0">
                  <div>
                    <p className="font-semibold text-gray-800">Order #{order.razorpay_order_id?.slice(-8) || order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-500">
                      {order.items?.length || 0} items • ₹{order.amount}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full 
                      ${order.status === 'Success' || order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderModal(true);
                      }}
                      className="text-emerald-600 text-sm font-medium hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ORDER DETAILS MODAL */}
        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                <button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-gray-500">Razorpay Order ID</p>
                    <p className="font-mono font-medium truncate">{selectedOrder.razorpay_order_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Status</p>
                    <p className={`font-bold ${selectedOrder.status === 'Success' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {selectedOrder.status}
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-gray-800 mb-3 border-b pb-1">Items</h3>
                <div className="space-y-3 mb-6">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        {item.images?.[0]?.url && (
                          <img src={item.images[0].url} alt="" className="w-10 h-10 object-cover rounded" />
                        )}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-emerald-600">₹{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 text-center">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="w-full bg-emerald-600 text-white py-2 rounded-xl font-bold hover:bg-emerald-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
