import CPChat from "../containers/CPChat";
import CPLogin from "../containers/CPLogin";
import CPRegister from "../containers/CPRegister";

const routeList = [
    {
        path: "/chat",
        element: <CPChat />,
        isVisible: false,
        isAuth: true,
        accessRoles: [],
    },
    {
        path: "/",
        element: <CPLogin />,
        isVisible: false,
        isAuth: false,
        accessRoles: [],
    },
    {
        path: "/register",
        element: <CPRegister />,
        isVisible: false,
        isAuth: false,
        accessRoles: [],
    }
]

export default routeList