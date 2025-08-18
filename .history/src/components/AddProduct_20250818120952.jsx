import React, { useEffect, useState } from "react";
import { getCategories, getPackagesByType, joinProduct } from "../services/apiService";
import { Gift } from "lucide-react";
import { toast } from "react-toastify";

const AddProduct = ({ open, onClose, walletBalance = 0 }) => {
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    package: "",
    scheme: ""
  });
  const [errors, setErrors] = useState({});

  console.log("categories" , categories.types);
  console.log("packages" , packages);
  // Fetch categories on open
  useEffect(() => {
    if (!open) return;
    setForm({ category: "", package: "", scheme: "" });
    setPackages([]);
    setErrors({});
    setLoading(true);
    getCategories().then(setCategories).finally(() => setLoading(false));
  }, [open]);

  // Fetch packages on category change
  useEffect(() => {
    if (!form.category) {
      setPackages([]);
      setForm((f) => ({ ...f, package: "" }));
      return;
    }
    setLoading(true);
    getPackagesByType(form.category)
      .then(setPackages)
      .finally(() => setLoading(false));
  }, [form.category]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
    // If changing category, reset package
    if (name === "category") setForm((f) => ({ ...f, package: "" }));
  };

  // Form validation
  const validate = () => {
    let errs = {};
    if (!form.category) errs.category = "Please select a category.";
    if (!form.package) errs.package = "Please select a package.";
    if (!form.scheme) errs.scheme = "Please select a scheme.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await joinProduct({
        category: form.category, 
        package: form.package, 
        scheme: form.scheme
      });
      if (res.status) {
        toast.success(res.message || "Joined successfully!");
        onClose();
      } else {
        toast.error(res.message || "Something went wrong.");
      }
    } catch {
      toast.error("API Error; Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="absolute top- right-0 bg-black/30 flex items-center justify-center z-[99]">
      <div className="bg-[#222836] relative w-full max-w-md mx-auto p-7 rounded-3xl shadow-xl text-white animate-fadeIn">
        {/* Close icon */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-red-400 text-3xl font-bold outline-none"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-6">Join a Package</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-[#23293c] to-[#1f273b] rounded-xl p-3">
            <div>Wallet:</div>
            <div className="flex gap-2 font-bold text-green-400 text-lg">
              ₹ {walletBalance}
              <Gift />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Categories: <span className="text-red-500">*</span></label>
            <select
              name="category"
              className={`w-full p-3 rounded-lg bg-[#23293c] text-white border transition-all ${
                errors.category ? "border-red-500" : "border-transparent"
              }`}
              value={form.category}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select</option>
              {categories.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.category && <div className="text-red-400 text-xs">{errors.category}</div>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Packages: <span className="text-red-500">*</span></label>
            <select
              name="package"
              className={`w-full p-3 rounded-lg bg-[#23293c] text-white border transition-all ${
                errors.package ? "border-red-500" : "border-transparent"
              }`}
              value={form.package}
              onChange={handleChange}
              disabled={!form.category || loading}
            >
              <option value="">Select</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.product_name} <span className="ml-2">₹{p.product_price}</span>
                </option>
              ))}
            </select>
            {errors.package && <div className="text-red-400 text-xs">{errors.package}</div>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Scheme: <span className="text-red-500">*</span></label>
            <select
              name="scheme"
              className={`w-full p-3 rounded-lg bg-[#23293c] text-white border transition-all ${
                errors.scheme ? "border-red-500" : "border-transparent"
              }`}
              value={form.scheme}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select</option>
              <option value="Scheme A">Scheme A</option>
              <option value="Scheme B">Scheme B</option>
              {/* ...More as needed */}
            </select>
            {errors.scheme && <div className="text-red-400 text-xs">{errors.scheme}</div>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 transition-all active:scale-95"
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
