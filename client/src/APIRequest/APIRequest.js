import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import store from "../redux/store/Store.js";
import {getToken, SetEmail, SetOTP, setToken, setUserDetails} from "../helper/SessionHelper.js";
import {SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state-slice/task-slice.js";
import {SetSummary} from "../redux/state-slice/summary-slice.js";
import {SetProfile} from "../redux/state-slice/profile-slice.js";



const baseURL = "http://localhost:5011/api/v1"

const AxiosHeader = {headers:{"token":getToken()}}


export function LoginRequest(email, password) {

    let URL = baseURL+"/login";
    let postBody={"email":email, "password":password};
    return axios.post(URL,postBody).then((res)=>{
        if(res.status === 200){
            setToken(res.data["token"])
            setUserDetails(res.data["data"])
            SuccessToast("Successfully logged in")
            return true
        }
        else{
            ErrorToast("Invalid email & password !")
            return false
        }
    }).catch((err)=>{
        ErrorToast("something went wrong!")
        return false
    })
}

export function RegistrationRequest(email,firstName,lastName,mobile,password,photo){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/registration";
    let postBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password,photo:photo};

    return axios.post(URL,postBody).then((res)=> {
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data["status"]==="fail"){
                if(res.data["data"]["keyPattern"]["email"]===1){
                    ErrorToast("email already exists!")
                    return false;
                }
                else{
                    ErrorToast("something went wrong !")
                    return false;
                }
            }
            else{
                    SuccessToast("Registration Successful")
                    return true;
            }

        }else{
            ErrorToast("something went wrong !")
            return false
        }
    }).catch((err)=>{
        store.dispatch(HideLoader())
        ErrorToast("something went wrong !")
        return false
    })
}

export function NewTaskRequest(title,description){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/createTask";
    let postBody={"title":title,"description":description,status:"New"};
    return axios.post(URL,postBody,AxiosHeader).then((res)=> {
        store.dispatch(HideLoader())
        if(res.status === 200){
            SuccessToast("New Task Created")
            return true
        }
        else{
            ErrorToast("something went wrong !")
            return false;
        }

    }).catch((err)=>{
        store.dispatch(HideLoader())
        ErrorToast("something went wrong !")
        return false
    })


}

export function ListTaskByStatus(status){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/listTaskByStatus/"+status;
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(status==="New"){
                store.dispatch(SetNewTask(res.data["data"]))
            }
            else if(status==="Completed"){
                store.dispatch(SetCompletedTask(res.data["data"]))
            }
            else if(status==="Progress"){
                store.dispatch(SetProgressTask(res.data["data"]))
            }
            else if(status==="Canceled"){
                store.dispatch(SetCanceledTask(res.data["data"]))
            }
        }
        else{
            ErrorToast("something went wrong !")
        }

    }).catch((err)=>{
        ErrorToast("something went wrong !")
        store.dispatch(HideLoader())
    })
}

export function SummaryRequest(){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/taskStatusCount";
    axios.get(URL,AxiosHeader).then((res)=> {
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetSummary(res.data["data"]))
        }
        else{
            ErrorToast("something went wrong !")
        }


    }).catch((err)=>{
        store.dispatch(HideLoader())
        ErrorToast("something went wrong !")
    })
}

export function DeleteRequest(id){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/deleteTask/"+id;
    return axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            SuccessToast("Delete successful")
            return true
        }
        else{
            ErrorToast("something went wrong !")
            return false
        }

    }).catch((err)=>{
        ErrorToast("something went wrong !")
        store.dispatch(HideLoader())
        return false
    })
}

export function UpdateStatusRequest(id,status){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/updateTaskStatus/"+id+"/"+status;
    return axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            SuccessToast("Update successful")
            return true
        }
        else{
            ErrorToast("something went wrong !")
            return false
        }
    }).catch((err)=>{
        ErrorToast("something went wrong !")
        store.dispatch(HideLoader())
        return false
    })
}


export function GetProfileDetails(){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/profileDetails";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetProfile(res.data["data"][0]))
        }
        else{
            ErrorToast("something went wrong !")
        }
    }).catch((err)=>{
        ErrorToast("something went wrong !")
        store.dispatch(HideLoader())
    })
}


export function ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo){
    store.dispatch(ShowLoader())

    let URL = baseURL+"/profileUpdate";
    let postBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password,photo:photo}
    let userDetails={email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo}


    return axios.post(URL,postBody,AxiosHeader).then((res)=> {
        store.dispatch(HideLoader())
        if(res.status === 200){
            SuccessToast("Update successful")
            setUserDetails(userDetails)
            return true
        }
        else{
            ErrorToast("something went wrong !")
            return false
        }

    }).catch((err)=>{
        ErrorToast("something went wrong !")
        store.dispatch(HideLoader())
        return false
    })
}


export function RecoverVerifyEmailRequest(email){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/RecoveryVerifyEmail/"+email;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data["status"]==="fail"){
                ErrorToast("No user found")
                return false
            }
            else{
                SetEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address. ")
                return true
            }

        }
        else {
            ErrorToast("something went wrong !")
            return false
        }
    }).catch((err)=>{
        ErrorToast("something went wrong !")
        store.dispatch(HideLoader())
        return false
    })
}

export function RecoverVerifyOTPRequest(email,OTP){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/RecoveryVerifyOTP/"+email+"/"+OTP;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data["status"]==="fail"){
                ErrorToast(res.data["data"])
                return false
            }
            else{
                SetOTP(OTP)
                SuccessToast("Code Verification Success")
                return true
            }

        }
        else{
            ErrorToast("something went wrong !")
            return false
        }

    }).catch((err)=>{
        ErrorToast("something went wrong !")
        store.dispatch(HideLoader())
        return false
    })
}


export function RecoveryResetPassRequest(email,OTP,password){
    store.dispatch(ShowLoader())
    let URL = baseURL+"/RecoveryResetPassword";
    let postBody={email:email,OTP:OTP,password:password}
    return axios.post(URL,postBody).then((res)=>{
        store.dispatch(HideLoader())
        if (res.status===200){
            if(res.data["status"]==="fail"){
                ErrorToast(res.data["data"])
                return false
            }
            else{
                SetOTP(OTP)
                SuccessToast("New Password Created")
                return true
            }
        }
         else{
            ErrorToast("Something Went Wrong")
            return false;
        }

    }).catch((err)=>{
        ErrorToast("something went wrong !")
        store.dispatch(HideLoader())
        return false
    })
}