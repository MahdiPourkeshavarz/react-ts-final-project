interface props {
  imgSrc: string;
  text: string;
}

export function FeatureCard({ imgSrc, text }: props) {
  return (
    <>
      <div className="flex flex-col px-4 w-60 shadow-xl rounded-xl bg-[#e7eaeb] pt-3 h-44">
        <img width="38px" src={imgSrc} alt="Feature" />
        <p className="overflow-hidden text-ellipsis whitespace-normal text-lg font-medium">
          {text}
        </p>
      </div>
    </>
  );
}
