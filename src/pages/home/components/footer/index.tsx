import { useStore } from "../../../../context/shopStore";

export function Footer() {
  const { theme } = useStore();

  return (
    <footer
      className={`py-6 text-center ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}
    >
      <p className="text-sm">© 2023 گجت هاب. همه حقوق محفوظ است.</p>
      <div className="flex justify-center gap-x-4 mt-2">
        <a href="#" className="hover:text-gray-400">
          <img src="/facebook_logo.png" alt="Facebook" className="w-5" />
        </a>
        <a href="#" className="hover:text-gray-400">
          <img src="/twitter_logo.png" alt="Twitter" className="w-5" />
        </a>
        <a href="#" className="hover:text-gray-400">
          <img src="/instagram_logo.png" alt="Instagram" className="w-5" />
        </a>
      </div>
    </footer>
  );
}
