import { useState } from 'react'
import { CategoryItem } from './components/categoryItem'
import { PosterCardItem } from './components/posterCardItem'
import { FeatureCard } from './components/featureCard'
import { OfferCardItem } from './components/offerCard'
import { AboutUs } from './components/aboutUs'
import { Footer } from './components/footer'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/shopStore'
import { HomepageProductCard } from './components/homePageProductCard'
import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constants'
import { TAllProductsResponse } from '../../types'
import { getData } from '../../api/getData'

export function HomePage() {
  const [isSupportExpanded, setSupportIsExpanded] = useState(false)
  const [isCartExpanded, setCartIsExpanded] = useState(false)
  const { cartQuantity } = useStore()

  const { data: smartwatchData, isLoading: isSmartwatchLoading } = useQuery<
    Partial<TAllProductsResponse>
  >({
    queryKey: ['smartwatch'],
    queryFn: () =>
      getData(
        `${API_ROUTES.PRODUCT_BASE}?category=66df2144e7276341e8446f0f&page=1&limit=4`,
      ),
  })

  const { data: speakersData, isLoading: isSpeakersLoading } = useQuery<
    Partial<TAllProductsResponse>
  >({
    queryKey: ['speaker'],
    queryFn: () =>
      getData(
        `${API_ROUTES.PRODUCT_BASE}?category=66e6e3de2f617c79b38c292e&page=1&limit=4`,
      ),
  })

  const { data: powerbankData, isLoading: isPowerbankLoading } = useQuery<
    Partial<TAllProductsResponse>
  >({
    queryKey: ['powerbank'],
    queryFn: () =>
      getData(
        `${API_ROUTES.PRODUCT_BASE}?category=66f55af4baeb1c2dcb368e81&page=1&limit=4`,
      ),
  })

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
          imgSrc='/powerbank.png'
          label='پاور بانک'
        />
      </div>

      <div className='pt-6'>
        <p className='text-lg'>
          <span className='text-xl font-semibold'>جدیدترین محصولات</span> رو
          میتونی از اینجا یه نگاه سریع بهشون بندازی.
        </p>
      </div>
      <div className='ml-4 flex gap-x-5 overflow-x-auto whitespace-nowrap py-3 scrollbar-hide'>
        <PosterCardItem
          link='http://localhost:5173/home/%D8%B3%D8%A7%D8%B9%D8%AA%20%D9%87%D9%88%D8%B4%D9%85%D9%86%D8%AF/%D9%88%D8%B1%D8%B2%D8%B4%DB%8C/%D8%A7%D9%BE%D9%84%20%D9%88%D8%A7%DA%86%20%D8%B3%D8%B1%DB%8C%2010'
          imgSrc='/smartwatch-poster-re.png'
          title='اپل واچ سری 10'
        />
        <PosterCardItem
          link='http://localhost:5173/home/%D9%87%D8%AF%D9%81%D9%88%D9%86/%D8%A8%DB%8C%20%D8%B3%DB%8C%D9%85/%D8%A8%D9%88%D8%B2%20%D9%85%D8%AF%D9%84%20Ultra%20Open%20EarBuds'
          imgSrc='/earphone-poster.webp'
          title='هدفون القایی بوز سری جدید'
        />
        <PosterCardItem
          link='http://localhost:5173/home/%D8%A7%D8%B3%D9%BE%DB%8C%DA%A9%D8%B1/%D8%A7%D8%B3%D9%BE%DB%8C%DA%A9%D8%B1%20%D9%82%D8%A7%D8%A8%D9%84%20%D8%AD%D9%85%D9%84/%D8%A7%D8%B3%D9%BE%DB%8C%DA%A9%D8%B1%20%D8%A8%D9%84%D9%88%D8%AA%D9%88%D8%AB%DB%8C%20%D9%82%D8%A7%D8%A8%D9%84%20%D8%AD%D9%85%D9%84%20%D8%AC%DB%8C%20%D8%A8%DB%8C%20%D8%A7%D9%84%20%D9%85%D8%AF%D9%84%20Go%204'
          imgSrc='/speaker-poster.png'
          title='اسپیکر جیبی جی بی ال'
        />
        <PosterCardItem
          link='http://localhost:5173/home/%D8%A7%D8%B3%D9%BE%DB%8C%DA%A9%D8%B1/%D8%A7%D8%B3%D9%BE%DB%8C%DA%A9%D8%B1%20%D9%82%D8%A7%D8%A8%D9%84%20%D8%AD%D9%85%D9%84/%D8%A7%D8%B3%D9%BE%DB%8C%DA%A9%D8%B1%20%D8%A8%D9%84%D9%88%D8%AA%D9%88%D8%AB%DB%8C%20%D9%82%D8%A7%D8%A8%D9%84%20%D8%AD%D9%85%D9%84%20%D8%A7%D9%86%DA%A9%D8%B1%20%D9%85%D8%AF%D9%84%20SoundCore%20A3395%20Rave%20Neo'
          imgSrc='/speaker-stand-poster.png'
          title='اسپیکر ایستاده انکر'
        />
      </div>

      <div className='pt-6'>
        <p className='text-lg'>
          <span className='text-xl font-semibold'>بهترین ساعت های هوشمند</span>{' '}
          رو میتونی از اینجا یه نگاه سریع بهشون بندازی.
        </p>
      </div>
      {!isSmartwatchLoading ? (
        <div className='overflow-x-auto whitespace-nowrap px-1 py-3 scrollbar-hide'>
          {smartwatchData &&
            smartwatchData?.data?.products?.map(product => (
              <div className='inline-flex'>
                <HomepageProductCard product={product} />
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}

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
          <span className='text-xl font-semibold'>بهترین بلندگو ها</span> رو
          میتونی از اینجا یه نگاه سریع بهشون بندازی.
        </p>
      </div>
      {!isSpeakersLoading ? (
        <div className='overflow-x-auto whitespace-nowrap px-1 py-3 scrollbar-hide'>
          {speakersData &&
            speakersData?.data?.products?.map(product => (
              <div className='inline-flex'>
                <HomepageProductCard product={product} />
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}

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

      <div className='pt-6'>
        <p className='text-lg'>
          <span className='text-xl font-semibold'>بهترین پاوربانک ها</span> رو
          میتونی از اینجا یه نگاه سریع بهشون بندازی.
        </p>
      </div>
      {!isPowerbankLoading ? (
        <div className='overflow-x-auto whitespace-nowrap px-1 py-3 scrollbar-hide'>
          {powerbankData &&
            powerbankData?.data?.products?.map(product => (
              <div className='inline-flex'>
                <HomepageProductCard product={product} />
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}

      <AboutUs />

      <Footer />
    </div>
  )
}
