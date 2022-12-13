import axios from "axios";
import { createContext, useContext, useState } from "react"

const UserContext = createContext();

const useUserData = () => {
    const [userData, setUserData] = useState(null);

    return {
        userData,
        getUserData(token) {
            return new Promise(async (res, rej) => {
                if(userData == null) {
                    try {
                        const {data: user} = await axios.get('/api/user', {
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                        setUserData(user);
                        res(user)

                    } catch(err) {
                        rej(err);
                    }
                } else {
                    res(userData);
                }
            })
        },
        clearUserData() {
            setUserData(null);
        }
    }
}

export function UserDataProvider({children}) {
    const userData = useUserData();

    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
}

export default function UserDataConsumer() {
    return useContext(UserContext);
}