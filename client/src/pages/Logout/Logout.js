import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import {
    Container,
} from "@mui/material"
import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/AuthContext"
import useUserContext from '../../hooks/UserContext'

const Logout = (props) => {
    const navigate = useNavigate();
    const userData = useUserContext();
    const {logout} = useAuth();

    useEffect(() => {
        logout().then(() => {
            userData.clearUserData();
            //navigate('/', {replace: true});
            window.location = '/';
        });
    })

    return (
        <>
            <AppHeader />
                <Container sx={{marginTop: "1em"}}>
                    <h1>Logging out...</h1>
                </Container>
            <AppFooter />
        </>
    );
}

export default Logout