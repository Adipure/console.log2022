import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './hooks/AuthContext/AuthContext'
import { UserDataProvider } from './hooks/UserContext/UserContext'

// Pages
import AppRouter from './AppRouter'
import { CssBaseline } from '@mui/material'


function App() {
    return (
        <>
        <CssBaseline />
        <AuthProvider>
            <UserDataProvider>
                <AppRouter />
            </UserDataProvider>
        </AuthProvider>
        </>
    )
}

export default App
