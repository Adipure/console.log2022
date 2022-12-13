import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

import useUserContext from '../../hooks/UserContext'

const AppHeader = (props) => {
    const {userData} = useUserContext();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleHomeClick = (event) => {
        event.preventDefault()
        navigate('/')
    }

    const handleProfileClick = (event) => {
        event.preventDefault();
        navigate('/profile/' + userData.username);
    }

    const handleLogoutClick = (event) => {
        event.preventDefault()
        navigate('/logout')
    }

    return (
        <AppBar sx={{mb: '2em'}} position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <h3>Console.log</h3>
                    </Typography>

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
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            <MenuItem key='mob-home' onClick={handleHomeClick}>
                                <Typography textAlign='center'>Home</Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
                            </MenuItem>
                            <MenuItem key='mob-profile' onClick={handleProfileClick}>
                                <Typography textAlign='center'>Profile</Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
                            </MenuItem>

                        </Menu>
                    </Box>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        console.log
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key='home'
                            onClick={handleHomeClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            key='profile'
                            onClick={handleProfileClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Profile
                        </Button>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={userData.avatar}>{userData.username[0]}</Avatar>
                                <Typography sx={{ color: 'white', padding: '0.5em' }}>
                                   {userData.username}                             
                                </Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='logout' onClick={handleCloseUserMenu}>
                                <Typography textAlign='center' onClick={handleLogoutClick}>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default AppHeader
