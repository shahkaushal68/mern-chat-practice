import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ isAuth, children }) => {

    const token = localStorage.getItem("_token");

    // console.log({
    //     isAuth,
    //     token
    // });

    if (isAuth && !token) {
        return <Navigate to="/" />
    }



    return children
}

export default ProtectedRoute
