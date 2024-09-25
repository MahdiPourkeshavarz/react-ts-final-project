interface props {
  imgSrc: string;
  title: string;
}

export function PosterCardItem({ imgSrc, title }: props): JSX.Element {
  return (
    <>
      <div className="relative flex min-w-max shadow-xl">
        <p className="absolute top-6 text-lg font-medium right-16">{title}</p>
        <button className="border-none bg-slate-50 py-1 rounded-lg absolute top-16 right-24 text-blue-500 text-lg font-semibold px-4 flex gap-x-2 mt-2 z-50">
          خرید
          <img className="w-8" src="/Cart.png" alt="Cart" />
        </button>
        <img
          className="rounded-xl border border-slate-200"
          width="300px"
          src={imgSrc}
          alt={title}
        />
      </div>
    </>
  );
}
