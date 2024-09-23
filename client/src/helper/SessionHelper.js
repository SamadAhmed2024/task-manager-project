class SessionHelper {

    setToken(token){
        localStorage.setItem("token", token);
    }

    getToken(){
        return localStorage.getItem("token");
    }

    setUserDetails(userDetails){
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }

    getUserDetails(){
        return JSON.parse(localStorage.getItem("userDetails"))
    }



    SetEmail(Email){
        localStorage.setItem("Email", Email);
    }

    GetEmail(){
        return localStorage.getItem("Email")
    }

    SetOTP(OTP){
        localStorage.setItem("OTP", OTP);
    }

    GetOTP(){
        return localStorage.getItem("OTP")
    }

    removeSessions(){
        localStorage.clear();
        window.location.href="/Login"
    }



}

export const {setToken,getToken,setUserDetails,getUserDetails,removeSessions,SetEmail,GetEmail,SetOTP,GetOTP}=new SessionHelper();