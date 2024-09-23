import React, {Fragment, useRef} from 'react';
import {GetEmail, GetOTP} from "../../helper/SessionHelper.js";
import {ErrorToast, IsEmpty} from "../../helper/FormHelper.js";
import {RecoveryResetPassRequest} from "../../APIRequest/APIRequest.js";
import {useNavigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const CreatePassword = () => {

    let passwordRef,confirmPasswordRef=useRef();
    let navigate=useNavigate()


    const ResetPass = () => {
        let password=passwordRef.value;
        let confirmPassword=confirmPasswordRef.value;
        if(IsEmpty(password)){
            ErrorToast("Password Required !")
        }
        else if(IsEmpty(confirmPassword)){
            ErrorToast("Confirm Password Required !")
        }
        else if(password!==confirmPassword){
            ErrorToast("Password & Confirm Password Should be Same")
        }
        else{
            RecoveryResetPassRequest(GetEmail(),GetOTP(),password).then((result)=>{
                if(result===true){
                    navigate("/Login")
                }
            })
        }

    }



    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <label>Your email address</label>
                                <input readOnly={true} value={GetEmail()} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <label>New Password</label>
                                <input ref={(input)=>passwordRef=input} placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <label>Confirm Password</label>
                                <input ref={(input)=>confirmPasswordRef=input} placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={ResetPass} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster/>
            </div>
        </Fragment>
    );
};

export default CreatePassword;