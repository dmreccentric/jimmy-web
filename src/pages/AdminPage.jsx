import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TbHttpDelete } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/GlobalContext";

const API_URL =
  "https://improved-danell-gentlebot-a7291aca.koyeb.app/api/v1/menu";

const API_ADMIN_URL =
  "https://improved-danell-gentlebot-a7291aca.koyeb.app/api/v1/admin";

function AdminPage() {
  const { logout } = useGlobalContext();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    quantity: 1,
    category: "",
    desc: "",
    imgFile: null,
  });
  const [editId, setEditId] = useState(null);

  // Fetch all items
  const fetchItems = async () => {
    const res = await fetch(API_URL, { credentials: "include" });
    const data = await res.json();
    setItems(data.menu);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "imgFile"
          ? files[0]
          : name === "price" || name === "quantity"
          ? Number(value)
          : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editId ? "PATCH" : "POST";
    const url = editId ? `${API_ADMIN_URL}/${editId}` : API_ADMIN_URL;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category", formData.category);
    data.append("desc", formData.desc);
    if (formData.imgFile) {
      data.append("image", formData.imgFile);
    }

    await fetch(url, {
      method,
      credentials: "include",
      body: data,
    });

    setFormData({
      title: "",
      price: "",
      quantity: "",
      category: "",
      imgFile: null,
      desc: "",
    });
    setEditId(null);
    fetchItems();
  };

  // Handle edit button
  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      desc: item.desc,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      imgFile: null,
    });
    setEditId(item._id); // Assuming _id is used
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    await fetch(`${API_ADMIN_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchItems();
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-blue text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={formData.title ?? ""}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={formData.price ?? 0}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="quantity"
          className="w-full p-2 border rounded"
          value={formData.quantity ?? 1}
          onChange={handleChange}
          min={1}
          required
        />
        <label
          htmlFor="imgFile"
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-50 transition"
        >
          <span className="text-xl">➕</span>
          <span className="text-sm text-gray-600">
            {formData.imgFile?.name || "Upload image"}
          </span>
        </label>

        <input
          type="file"
          name="imgFile"
          placeholder="Img Link"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          required={!editId}
        />

        {formData.imgFile && (
          <div className="h-32 w-32 mb-4">
            <img
              src={URL.createObjectURL(formData.imgFile)}
              alt="preview"
              className="h-full w-full object-cover rounded"
            />
          </div>
        )}

        <select
          name="category"
          value={formData.category ?? ""}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        >
          <option value="">-- Select Category --</option>
          <option value="pastries">Pastries</option>
          <option value="foodtray">foodtray</option>
          <option value="cake">cake</option>
          <option value="drinks">drinks</option>
        </select>
        <textarea
          name="desc"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.desc ?? ""}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue text-white px-4 py-2 rounded">
          {editId ? "Update Item" : "Create Item"}
        </button>
      </form>

      {/* Items list */}
      <ul className="space-y-4">
        {items.length === 0 && <p>No items found.</p>}
        {items.map((item) => (
          <li
            key={item._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <div className="h-14 w-[68px] flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
            <div className="space-y-4 flex flex-col justify-center items-center ">
              <button
                className="text-blue text-xl "
                onClick={() => handleEdit(item)}
              >
                <FaRegEdit />
              </button>
              <button
                className="text-red text-2xl"
                onClick={() => handleDelete(item._id)}
              >
                <TbHttpDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
