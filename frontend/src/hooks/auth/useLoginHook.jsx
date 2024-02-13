import { useState } from "react"
import { doGetLoginUserDetail, doLogin } from "../../actions/authActions";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { setAuthHeader } from "../../apis/axiosApi";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/chatSlice";

const useLoginHook = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        //console.log("event", event.target.value);
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginResponse = await doLogin(formData);
        if (loginResponse?.data?.status === 200) {
            toast.success("user Login successfully");
            //console.log(loginResponse);
            localStorage.setItem('_token', loginResponse?.data?.data?.token);
            await setAuthHeader(`Bearer ${loginResponse?.data?.data?.token}`);
            await fetchLoginUserDetails();
            navigate("/chat");
        } else {
            toast.error(loginResponse?.data?.message)
        }
    }

    const fetchLoginUserDetails = async () => {
        try {
            const loginUserDetailResponse = await doGetLoginUserDetail();
            if (loginUserDetailResponse?.status === 200) {
                //console.log("loginUserDetailResponse----------", loginUserDetailResponse?.data?.data);
                dispatch(loginUser(loginUserDetailResponse?.data?.data))
            }
        } catch (error) {
            console.log("fetchLoginUserDetails-error-------", error);
        }
    }

    return {
        formData,
        handleInputChange,
        handleLogin
    }

}

export default useLoginHook
