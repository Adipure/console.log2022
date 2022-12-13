import Landing from './pages/Landing'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Admin from './pages/Admin'
import Logout from './pages/Logout'
import { useContext, useEffect, useState } from 'react'
import Aboutus from './pages/Aboutus'
import Topic from './pages/Topic'
import { useNavigate, Route, Navigate, Routes, BrowserRouter as Router } from 'react-router-dom'
import useUserContext from './hooks/UserContext'
import useAuth from './hooks/AuthContext'


const RedirectIfLoggedin = ({children}) => {
    const auth = useAuth();
    if(auth.auth) {
        return <Navigate to="/feed" replace />
    } else {
        return <>{children}</>
    }
}


const AppRouter = () => {
    const userData = useUserContext();
    const {auth} = useAuth();

    const [loadingProfile, setLoadingProfile] = useState(userData.userData ? false : true);

    useEffect(() => {
        if(auth && loadingProfile) {
            console.log('Loading profile...')
            userData.getUserData(localStorage.getItem('jwt')).then(() => {
                console.log('done');
                setLoadingProfile(false);
            }).catch(err => {
                window.location = '/';
            });
        }
    }, [auth])

    const RootRoute = () => {
        return (
            <RedirectIfLoggedin>
                <Landing />
            </RedirectIfLoggedin>
        )
    }

    const LoginRoute = () => {
        if (auth) {
            return <Navigate to="/feed" replace />
        } else {
            return <Login />
        }
    }

    const RegisterRoute = () => {
        if (auth) {
            return <Navigate to="/feed" replace />
        } else {
            return <Register />
        }
    }

    return ( 
        <>
        {auth && loadingProfile ? <h1>Loading</h1> : 
        <Router>
        <Routes>
            <Route exact path='/login' element={<LoginRoute />} />
            <Route exact path='/register' element={<RegisterRoute />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path='/' element={<RootRoute />} />
            <Route exact path="/feed" element={<Home />} />
            <Route exact path='/post/:id' element={<Post />} />
            <Route exact path='/profile/:username' element={<Profile />} />
            <Route exact path='/topic/:topic' element={<Topic />} /> 
        </Routes>
        </Router>
        }
        </>);
}

export default AppRouter;