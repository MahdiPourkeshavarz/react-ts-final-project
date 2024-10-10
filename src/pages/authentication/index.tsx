import { useNavigate } from 'react-router-dom'
import { submitUser } from '../../api/getAccess'
import { AuthformData } from '../../types'
import { AuthenticationForm } from './components/AuthForm'
import toast from 'react-hot-toast'

export function AuthenticationPage() {
  const navigate = useNavigate()

  async function onSubmit(data: AuthformData) {
    const isActionSuccessful = await submitUser(data)
    if (isActionSuccessful) {
      toast.success('ورود به پنل ادمین با موفقیت انجام شد', {
        position: 'bottom-center',
      })
      setTimeout(() => {
        navigate('/admin')
      }, 1000)
    } else {
      toast.error('خطا در ورود به پنل ادمین. لطفا دوباره تلاش کنید.', {
        position: 'bottom-center',
      })
    }
  }

  return (
    <>
      <div
        className='flex min-h-screen bg-cover'
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className='flex flex-1 items-center justify-center p-8'>
          <div
            className={`w-full max-w-md rounded-lg bg-slate-100 p-8 text-black shadow-lg dark:bg-slate-900 dark:text-white`}
          >
            <header className='mb-6 text-center'>
              <h1 className='text-2xl font-bold'>به گجت هاب خوش آمدید</h1>
            </header>
            <section className='form-block h-fit transition-transform duration-500 ease-in-out'>
              <h2 className='mb-4 text-center text-xl font-semibold'>ورود</h2>
              <AuthenticationForm onSubmit={onSubmit} />
            </section>
          </div>
        </div>
        <div className='hidden flex-1 items-center justify-center p-8 md:flex'>
          <div className='text-center text-white'>
            <h2 className='text-3xl font-bold'>
              به جمع خانواده گجت هاب بپیوندید
            </h2>
            <p className='mt-4 text-xl'>اینجا کسی دست خالی برنمیگرده!.</p>
          </div>
        </div>
      </div>
    </>
  )
}
