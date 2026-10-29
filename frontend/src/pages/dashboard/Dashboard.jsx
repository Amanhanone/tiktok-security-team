import { Link } from "react-router-dom";
import { ShieldCheck, CheckCircle2, Lock, ChevronLeft } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between p-4 selection:bg-[#fe2c55] selection:text-white font-sans">
      
      {/* Top Header Bar */}
      <header className="flex items-center justify-between w-full max-w-md mx-auto py-3 border-b border-gray-100">
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Back to TikTok"
          className="text-black hover:opacity-70 transition p-1"
        >
          <ChevronLeft size={28} strokeWidth={2.5} />
        </a>
        <span className="text-sm font-bold tracking-wide text-black">
          Security Review Center
        </span>
        <div className="w-7" /> {/* Spacer for symmetry */}
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto my-auto flex flex-col items-center text-center px-2 py-8">
        
        {/* Security Badge Icon Stack */}
        <div className="relative mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 border-2 border-red-100 text-[#fe2c55] shadow-sm">
            <ShieldCheck size={48} strokeWidth={2} />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#20d5ec] text-white shadow-md border-2 border-white">
            <CheckCircle2 size={20} strokeWidth={2.5} />
          </div>
        </div>

        {/* Brand / Security Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-slate-600 mb-4">
          <Lock size={12} className="text-[#fe2c55]" />
          <span>TikTok Security System</span>
        </div>

        {/* Congratulatory & Status Text */}
        <h1 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
          Congratulations, your security check has passed!
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-8">
          Our team will review your account details and notify you soon. Thank you for keeping your profile secure.
        </p>

        {/* Action Button Linking to TikTok */}
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-full bg-[#fe2c55] hover:bg-[#e62046] active:bg-[#d0193d] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition text-center"
        >
          Back to TikTok
        </a>
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-md mx-auto py-4 text-center">
        <div className="text-xs font-medium tracking-wide text-gray-400">
          TikTok Security & Privacy
        </div>
      </footer>

    </div>
  );
}