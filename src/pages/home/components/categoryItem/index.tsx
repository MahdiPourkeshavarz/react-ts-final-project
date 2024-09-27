import { Link } from "react-router-dom";

interface props {
  to: string;
  imgSrc: string;
  label: string;
}

export function CategoryItem({ to, imgSrc, label }: props): JSX.Element {
  return (
    <Link
      to={to}
      className="flex flex-col items-center min-w-max cursor-pointer"
    >
      <img width="100px" src={imgSrc} alt={label} />
      <p className="text-md font-semibold text-slate-500 hover:text-slate-700">
        {label}
      </p>
    </Link>
  );
}
