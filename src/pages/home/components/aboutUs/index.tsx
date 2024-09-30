import { useStore } from "../../../../context/shopStore";

export function AboutUs() {
  const { theme } = useStore();

  return (
    <div
      className={`py-12 px-5 text-center ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}
    >
      <img
        src="/brand-logo.png"
        alt="GadgetHub Logo"
        className="mx-auto mb-6 w-72"
      />
      <h2 className="text-3xl font-bold mb-4">درباره ما</h2>
      <p className="text-lg mb-4">
        در گجت هاب، ما به ارائه برترین و به‌روزترین محصولات تکنولوژی افتخار
        می‌کنیم. تیم ما با تجربه و تخصص، بهترین خدمات و تجربه خرید را برای شما
        فراهم می‌کند.
      </p>
      <p className="text-lg mb-4">
        هدف ما این است که با ارائه محصولاتی با کیفیت بالا، رضایت شما را جلب
        کنیم. ما همواره تلاش می‌کنیم تا با نوآوری و خلاقیت، نیازهای شما را به
        بهترین شکل ممکن پاسخ دهیم.
      </p>
      <p className="text-lg">
        از اینکه ما را برای خرید محصولات تکنولوژی انتخاب کرده‌اید، سپاسگزاریم.
        ما همیشه آماده‌ایم تا به سوالات شما پاسخ دهیم و تجربه خرید شما را بهبود
        بخشیم.
      </p>
    </div>
  );
}
