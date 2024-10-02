interface props {
  imgSrc: string
  text: string
}

export function FeatureCard({ imgSrc, text }: props) {
  return (
    <>
      <div className='flex h-44 w-60 flex-col rounded-xl bg-[#e7eaeb] px-4 pt-3 shadow-xl dark:bg-[#676d6e50]'>
        <img width='38px' src={imgSrc} alt='Feature' />
        <p className='overflow-hidden text-ellipsis whitespace-normal text-lg font-medium'>
          {text}
        </p>
      </div>
    </>
  )
}
