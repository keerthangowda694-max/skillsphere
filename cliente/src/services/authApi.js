import API from "./api";


// Register

export const registerUser = async(data)=>{

    const response = await API.post(
        "/auth/register",
        data
    );

    return response.data;

};



// Login

export const loginUser = async(data)=>{

    const response = await API.post(
        "/auth/login",
        data
    );

    return response.data;

};



// Verify Email

export const verifyEmail = async(token)=>{

    const response = await API.get(
        `/auth/verify-email/${token}`
    );

    return response.data;

};



// Forgot Password

export const forgotPassword = async(email)=>{

    const response = await API.post(
        "/auth/forgot-password",
        {
            email
        }
    );

    return response.data;

};



// Reset Password

export const resetPassword = async(
token,
password
)=>{

    const response = await API.put(

        `/auth/reset-password/${token}`,

        {
            password
        }

    );


    return response.data;

};