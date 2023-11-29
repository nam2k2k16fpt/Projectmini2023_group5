import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://api.realworld.io/api/users/login", {user});
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        console.error("Error in loginUser function:", error);
        dispatch(loginFailed());
    }
}
