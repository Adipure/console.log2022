import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext();

const useAuthbleh = () => {
    const [auth, setAuth] = useState(localStorage.getItem('jwt') ? true : false);

    return {
        auth,
        login(username, password) {
            return new Promise((res, rej) => {
                axios.post('/api/user/login', {username:username, password:password}).then(response => {
                    localStorage.setItem('jwt', response.data);
                    setAuth(true);
                    res();
                }).catch(err => {
                    rej(err);
                })
            })
        },
        logout() {
            return new Promise((res) => {
                localStorage.removeItem('jwt');
                setAuth(false);
                res();
            })
        }
    }
}

export function AuthProvider({children}) {
    const auth = useAuthbleh();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
};

export default function AuthConsumer() {
    return useContext(AuthContext);
}