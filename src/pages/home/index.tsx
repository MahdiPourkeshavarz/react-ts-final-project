import { useState } from 'react'
import { CategoryItem } from './components/categoryItem'
import { PosterCardItem } from './components/posterCardItem'
import { FeatureCard } from './components/featureCard'
import { OfferCardItem } from './components/offerCard'
import { AboutUs } from './components/aboutUs'
import { Footer } from './components/footer'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/shopStore'

export function HomePage() {
  localStorage.setItem('theme', 'light')
  const [isSupportExpanded, setSupportIsExpanded] = useState(false)
  const [isCartExpanded, setCartIsExpanded] = useState(false)
  const { cartQuantity } = useStore()

  return (
    <div className='myContainer flex flex-col gap-y-8 px-5 py-8 pb-[200px] text-slate-800 dark:text-white'>
      <div>
        <p className='text-2xl'>
          <span className='mb-1 text-3xl'>گجت هاب.</span>
          <br />
          بهترین جا برای خرید گجتی که دوست داری❤️
        </p>
      </div>

      <div
        className={`fixed bottom-4 right-4 z-50 flex items-center gap-x-4 rounded-lg bg-white shadow-lg transition-all duration-300 ${
          isSupportExpanded ? 'w-80 p-4' : 'w-auto p-1'
        } cursor-pointer`}
        onClick={() => setSupportIsExpanded(!isSupportExpanded)}
      >
        <img src='/store-chat-specialist-icon.png' alt='_' />
        {isSupportExpanded && (
          <div>
            <p className='text-slate-500'>نیاز به مشاوره دارید؟</p>
            <p className='text-sm text-blue-500'>به متخصص وصل شو🔹</p>
          </div>
        )}
      </div>

      <div
        dir='ltr'
        className={`fixed left-4 top-20 z-50 flex items-center gap-x-4 rounded-lg bg-blue-100 shadow-lg transition-all duration-300 ${
          isCartExpanded ? 'w-52 p-4' : 'w-auto p-2'
        } cursor-pointer`}
        onClick={() => setCartIsExpanded(!isCartExpanded)}
      >
        <img src='/Cart.png' alt='_' width='40px' />
        <div
          className={`absolute flex w-5 justify-center rounded-full bg-red-700 text-sm ${isCartExpanded ? 'left-7 top-3' : 'left-5 top-2'} transition-all duration-300`}
        >
          <p className='text-white'>{cartQuantity}</p>
        </div>
        {isCartExpanded && (
          <Link to='/home/cart'>
            <p className='text-sm text-blue-500'>برو به سبد خرید</p>
          </Link>
        )}
      </div>

      <div className='flex items-center gap-x-7 overflow-x-auto whitespace-nowrap px-2 scrollbar-hide md:justify-center lg:justify-center'>
        <CategoryItem to='/home/هدفون' imgSrc='/headphone.png' label='هدفون' />
        <CategoryItem
          to='/home/ساعت هوشمند'
          imgSrc='/watch.png'
          label='ساعت هوشمند'
        />
        <CategoryItem to='/home/اسپیکر' imgSrc='/speaker.png' label='بلندگو' />
        <CategoryItem to='/home/مودم' imgSrc='/router.png' label='مودم' />
        <CategoryItem
          to='/home/پاوربانک'
          imgSrc='/others.png'
          label='همه دسته بندی ها'
        />
      </div>

      <div className='pt-6'>
        <p className='text-lg'>
          <span className='text-xl font-semibold'>جدیدترین محصولات</span> رو
          میتونی از اینجا یه نگاه سریع بهشون بندازی.
        </p>
      </div>

      <div className='ml-4 flex gap-x-5 overflow-x-auto whitespace-nowrap scrollbar-hide'>
        <PosterCardItem
          imgSrc='/smartwatch-poster-re.png'
          title='ساعت هوشمند اپل سری 9'
        />
        <PosterCardItem
          imgSrc='/earphone-poster.webp'
          title='هدفون القایی بوز سری جدید'
        />
        <PosterCardItem
          imgSrc='/speaker-poster.png'
          title='اسپیکر جیبی جی بی ال'
        />
        <PosterCardItem
          imgSrc='/speaker-stand-poster.png'
          title='اسپیکر ایستاده انکر'
        />
      </div>

      <div className='pt-6'>
        <p className='text-lg'>
          <span className='text-xl font-semibold'>تفاوت ها</span> رو اینجا رقم
          میزنیم و رضایت شما هدف اول ماست.
        </p>
      </div>

      <div className='overflow-x-auto whitespace-nowrap scrollbar-hide'>
        <div className='inline-flex gap-x-5'>
          <FeatureCard
            imgSrc='/truck.png'
            text='با ما تجربه تحویل دو ساعته زندگی خواهید کرد'
          />
          <FeatureCard
            imgSrc='/card.png'
            text='همزمان هم قابلیت پرداخت آنی رو دارید و هم پرداخت اقساط برای شما قابل انتخاب هست'
          />
          <FeatureCard
            imgSrc='/Trade.png'
            text='میتونید سریع تر از یک روز کالای خودتون رو مرجوع کنید'
          />
        </div>
      </div>

      <div className='pt-6'>
        <p className='text-lg'>
          <span className='text-xl font-semibold'>تخفیفات ویژه </span>
          برای شما دوستداران عزیز تکنولوژی
        </p>
      </div>

      <div className='ml-4 flex gap-x-5 overflow-x-auto whitespace-nowrap scrollbar-hide'>
        <OfferCardItem imgSrc='/college.png' title='شرایط ویژه دانشجویان' />
        <OfferCardItem imgSrc='/kid.png' title='شرایط ویژه دانش آموزان' />
        <OfferCardItem imgSrc='/bussinesman.png' title='شرایط ویژه کارمندان' />
      </div>

      <AboutUs />

      <Footer />
    </div>
  )
}
