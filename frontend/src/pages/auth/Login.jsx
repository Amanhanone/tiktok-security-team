import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, HelpCircle, Check, ChevronDown, Eye, EyeOff } from "lucide-react";
import { authService } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("phone"); // 'phone' | 'email'
  const [countryCode, setCountryCode] = useState("ET +251");
  const [saveLoginInfo, setSaveLoginInfo] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const identifier = form.identifier.trim();
    const password = form.password;

    if (!identifier) {
      setError(
        activeTab === "phone"
          ? "Please enter your phone number."
          : "Please enter your email or username."
      );
      return;
    }

    if (!password || password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await authService.login({
        [activeTab === "phone" ? "phone" : "email"]: identifier,
        password,
      });

      // Redirect to dashboard after successful submit
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to continue. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-white text-slate-900 flex flex-col justify-between max-w-md mx-auto px-5 py-4 font-sans select-none">
      <div>
        {/* Top Header Bar */}
        <header className="flex items-center justify-between py-2 mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-1 text-black hover:opacity-70 transition"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <h1 className="text-lg font-bold text-black">Log in</h1>
          <button
            type="button"
            aria-label="Help"
            className="p-1 text-black hover:opacity-70 transition"
          >
            <HelpCircle size={24} strokeWidth={2} />
          </button>
        </header>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 text-sm font-semibold mb-6">
          <button
            type="button"
            onClick={() => handleTabChange("phone")}
            className={`flex-1 pb-3 text-center transition-all relative ${
              activeTab === "phone" ? "text-black" : "text-gray-400"
            }`}
          >
            Phone
            {activeTab === "phone" && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-black rounded-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("email")}
            className={`flex-1 pb-3 text-center transition-all relative ${
              activeTab === "email" ? "text-black" : "text-gray-400"
            }`}
          >
            Email / Username
            {activeTab === "email" && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-black rounded-full" />
            )}
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div
            role="alert"
            className="w-full mb-4 p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl text-center"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Main Identifier Input (Phone or Email/Username) */}
          {activeTab === "phone" ? (
            <div className="flex items-center bg-[#f3f3f5] rounded-xl px-4 py-3.5 focus-within:ring-1 focus-within:ring-gray-400 transition">
              {/* Country Selector */}
              <div className="flex items-center gap-1 text-sm font-medium text-slate-800 pr-3 border-r border-gray-300">
                <span>{countryCode}</span>
                <ChevronDown size={16} className="text-slate-600" />
              </div>

              {/* Phone Input */}
              <input
                id="identifier"
                name="identifier"
                type="tel"
                autoComplete="tel"
                required
                value={form.identifier}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full bg-transparent pl-3 text-sm text-slate-900 outline-none placeholder:text-gray-400"
              />
            </div>
          ) : (
            <div className="bg-[#f3f3f5] rounded-xl px-4 py-3.5 focus-within:ring-1 focus-within:ring-gray-400 transition">
              {/* Email / Username Input */}
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                value={form.identifier}
                onChange={handleChange}
                placeholder="Email or username"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Password Input Field */}
          <div className="relative bg-[#f3f3f5] rounded-xl px-4 py-3.5 focus-within:ring-1 focus-within:ring-gray-400 transition">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent pr-8 text-sm text-slate-900 outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-700 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Hidden Submit Button to handle Enter Key press */}
          <button type="submit" className="hidden" />
        </form>
      </div>

      {/* Bottom Section: Save Login Info + Submit Button */}
      <div className="space-y-5 pb-6 mt-6">
        {/* Save login info checkbox */}
        <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer select-none">
          <button
            type="button"
            role="checkbox"
            aria-checked={saveLoginInfo}
            onClick={() => setSaveLoginInfo(!saveLoginInfo)}
            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition ${
              saveLoginInfo
                ? "bg-[#ff3b5c] text-white"
                : "border border-gray-300 bg-white"
            }`}
          >
            {saveLoginInfo && <Check size={11} strokeWidth={3} />}
          </button>
          <span className="leading-tight">
            Save login info to log in automatically next time.
          </span>
        </label>

        {/* Submit / Continue Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-full bg-[#ff8fa0] hover:bg-[#ff3b5c] active:bg-[#e02d4c] py-3.5 text-sm font-semibold text-white transition disabled:opacity-60 shadow-none"
        >
          {loading ? "Logging in..." : "Continue"}
        </button>
      </div>
    </main>
  );
}