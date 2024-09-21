import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <div className="myContainer flex flex-col py-10 px-5 gap-y-8">
        <div>
          <p className="text-2xl text-slate-500">
            <span className="text-green-700 text-3xl mb-1">گجت هاب.</span>
            <br />
            بهترین جا برای خرید گجتی که دوست داری❤️
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <img src="/store-chat-specialist-icon.png" alt="_" />
          <div>
            <p className="text-slate-500">نیاز به مشاوره دارید؟</p>
            <p className="text-sm text-blue-500">به متخصص وصل شو🔹</p>
          </div>
        </div>
        <div className="flex gap-x-5 px-3 overflow-x-auto whitespace-nowrap scrollbar-hide lg:justify-center">
          <Link
            to={"/shop/headphone"}
            className="flex flex-col items-center min-w-max cursor-pointer"
          >
            <img width="100px" src="/headphone.png" alt="_" />
            <p className="text-md font-semibold text-slate-500 hover:text-slate-700">
              هدفون
            </p>
          </Link>
          <Link
            to={"/shop/smartwatch"}
            className="flex flex-col items-center min-w-max cursor-pointer"
          >
            <img width="67px" src="/smartwatch.png" alt="_" />
            <p className="text-md font-semibold text-slate-500 hover:text-slate-700">
              ساعت هوشمند
            </p>
          </Link>
          <Link
            to={"/shop/speaker"}
            className="flex flex-col items-center min-w-max cursor-pointer"
          >
            <img width="100px" src="/speaker.png" alt="_" />
            <p className="text-md font-semibold text-slate-500 hover:text-slate-700">
              بلندگو
            </p>
          </Link>
          <Link
            to={"/shop/router"}
            className="flex flex-col items-center min-w-max cursor-pointer"
          >
            <img width="100px" src="/router.png" alt="_" />
            <p className="text-md font-semibold text-slate-500 hover:text-slate-700">
              مودم
            </p>
          </Link>
          <Link
            to={"/shop"}
            className="flex flex-col items-center min-w-max cursor-pointer"
          >
            <img width="100px" src="/others.png" alt="_" />
            <p className="text-sm font-semibold text-slate-500 hover:text-slate-700 pt-2">
              همه دسته بندی ها
            </p>
          </Link>
        </div>
        <div className="pt-6">
          <p className="text-lg">
            <span className="text-gray-700 text-xl font-semibold">
              جدیدترین محصولات
            </span>{" "}
            رو میتونی از اینجا یه نگاه سریع بهشون بندازی.
          </p>
        </div>
        <div className="flex gap-x-5 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="relative flex min-w-max">
            <p className="absolute top-6 text-lg font-medium right-10">
              ساعت هوشمند اپل سری 9
            </p>
            <button className="border-none bg-slate-50 py-1 rounded-lg absolute top-16 right-20 text-blue-500 text-lg font-semibold px-4 flex gap-x-2 mt-2">
              خرید
              <img className="w-8" src="/Cart.png" alt="_" />
            </button>
            <img
              className="rounded-xl border border-slate-200"
              width="300px"
              src="/smartwatch-poster-re.png"
              alt="_"
            />
          </div>
          <div className="relative flex min-w-max">
            <p className="absolute top-6 text-lg font-medium right-10">
              هدفون القایی بوز سری جدید
            </p>
            <button className="border-none bg-slate-50 py-1 rounded-lg absolute top-16 right-20 text-blue-500 text-lg font-semibold px-4 flex gap-x-2 mt-2">
              خرید
              <img className="w-8" src="/Cart.png" alt="_" />
            </button>
            <img
              className="rounded-xl border border-slate-200"
              width="300px"
              src="/earphone-poster.webp"
              alt="_"
            />
          </div>
          <div className="relative flex min-w-max">
            <p className="absolute top-6 text-lg font-medium right-20">
              اسپیکر جیبی جی بی ال
            </p>
            <button className="border-none bg-slate-50 py-1 rounded-lg absolute top-16 right-24 text-blue-500 text-lg font-semibold px-4 flex gap-x-2 mt-2">
              خرید
              <img className="w-8" src="/Cart.png" alt="_" />
            </button>
            <img
              className="rounded-xl border border-slate-200"
              width="300px"
              src="/speaker-poster.png"
              alt="_"
            />
          </div>
          <div className="relative flex min-w-max">
            <p className="absolute top-6 text-lg font-medium right-16">
              اسپیکر ایستاده انکر
            </p>
            <button className="border-none bg-slate-50 py-1 rounded-lg absolute top-16 right-20 text-blue-500 text-lg font-semibold px-4 flex gap-x-2 mt-2">
              خرید
              <img className="w-8" src="/Cart.png" alt="_" />
            </button>
            <img
              className="rounded-xl border border-slate-200"
              width="300px"
              src="/speaker-stand-poster.png"
              alt="_"
            />
          </div>
        </div>
      </div>
    </>
  );
}
