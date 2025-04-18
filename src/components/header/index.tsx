import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import React, { useState } from 'react'
import { Menu } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import { useStore } from '../../context/shopStore'
import { Link, useNavigate } from 'react-router-dom'
import { httpRequest } from '../../lib/axiosConfig'
import { API_ROUTES } from '../../constants'
import toast from 'react-hot-toast'

export function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const { toggleTheme, theme, clearCart, setActiveNav } = useStore()
  const navigate = useNavigate()

  const isUserLogedIn = localStorage.getItem('user')
    ? localStorage.getItem('user')
    : ''

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  async function handleUserLogout() {
    try {
      await httpRequest.get(API_ROUTES.AUTH_LOGOUT)
    } catch (e) {
      console.log(e)
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    clearCart()
    setActiveNav('')
    toast.success('شما از حساب خود خارج شدید', {
      position: 'bottom-center',
    })
    navigate('/')
  }

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Link to='/'>
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='#app-bar-with-responsive-menu'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'sans',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                گجت هاب
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <Link to='/auth'>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>
                      پنل ادمین
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to='/'>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>
                      فروشگاه
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Link to='/'>
              <Typography
                variant='h5'
                noWrap
                component='a'
                href='#app-bar-with-responsive-menu'
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                گجت هاب
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to='/auth'>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                >
                  پنل ادمین
                </Button>
              </Link>
              <Link to='/'>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                >
                  فروشگاه
                </Button>
              </Link>
            </Box>
            <IconButton
              sx={{ ml: 1 }}
              onClick={handleUserLogout}
              color='inherit'
            >
              {isUserLogedIn && <LogoutIcon />}
            </IconButton>
            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color='inherit'>
              {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
