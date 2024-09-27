interface props {
  imgSrc: string;
  title: string;
}

export function OfferCardItem({ imgSrc, title }: props): JSX.Element {
  return (
    <>
      <div className="relative flex min-w-max shadow-xl">
        <p className="absolute top-3 text-xl font-semibold right-32">{title}</p>
        <button className="border-none bg-[#f8fafc3a] py-1 rounded-lg absolute top-10 right-36 text-blue-500 text-lg font-semibold px-4 flex gap-x-2 mt-2 -z-0">
          شرایط دریافت
          <img className="w-6" src="/Info.png" alt="Cart" />
        </button>
        <img
          className="rounded-xl border border-slate-200"
          width="330px"
          src={imgSrc}
          alt={title}
        />
      </div>
    </>
  );
}
