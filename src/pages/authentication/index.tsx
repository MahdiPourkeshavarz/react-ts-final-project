import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitUser } from '../../api/getAccess'
import { AuthformData } from '../../types'
import { AuthenticationForm } from './components/AuthForm'

export function AuthenticationPage() {
  localStorage.setItem('theme', 'light')
  const [mode, setMode] = useState('login')
  const navigate = useNavigate()

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
  }

  async function onSubmit(data: AuthformData) {
    const isActionSuccessful = await submitUser(data, mode)
    if (isActionSuccessful) {
      navigate('/admin')
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
              <p className='mt-2'>همین امروز به ما بپیوندید!</p>
            </header>
            <section className='form-block h-fit transition-transform duration-500 ease-in-out'>
              <h2 className='mb-4 text-center text-xl font-semibold'>
                {mode === 'login' ? 'ورود' : 'ثبت نام'}
              </h2>
              <div className='mb-4 text-center'>
                <span className=''>
                  {mode === 'login'
                    ? 'می خواهید حساب ایجاد کنید؟'
                    : 'آیا قبلا حساب ایجاد کرده اید؟'}
                  <span
                    className='cursor-pointer text-blue-500'
                    onClick={toggleMode}
                  >
                    {'  '}ایجا را کلیک کنید
                  </span>
                </span>
              </div>
              <AuthenticationForm mode={mode} onSubmit={onSubmit} />
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
