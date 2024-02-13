import { useState } from "react"
import { doRegister } from "../../actions/authActions";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const useRegisterHook = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        //console.log("event", event.target.value);
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const registerResponse = await doRegister(formData);
        if (registerResponse?.data?.status === 200) {
            toast.success("user register successfully");
            navigate("/");
        } else {
            toast.error(registerResponse?.data?.message)
        }
    }

    return {
        formData,
        handleInputChange,
        handleRegister
    }

}

export default useRegisterHook
