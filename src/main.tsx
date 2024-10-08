import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoute from './router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQueryConfig'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoute />
    </QueryClientProvider>
  </StrictMode>,
)
