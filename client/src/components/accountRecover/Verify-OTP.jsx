import React, {Fragment, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {RecoverVerifyOTPRequest} from "../../APIRequest/APIRequest.js";
import {GetEmail, SetOTP} from "../../helper/SessionHelper.js";
import {useNavigate} from "react-router-dom";
import {ErrorToast} from "../../helper/FormHelper.js";
import {Toaster} from "react-hot-toast";

const VerifyOTP = () => {

    let [OTP, SetOTP] = useState("");
    let navigate=useNavigate()

    let  defaultInputStyle= {
        fontFamily: "monospace",
        MozAppearance: "textfield",
        margin: "4px",
        paddingLeft: "8px",
        width: "45px",
        borderRadius: '3px',
        height: "45px",
        fontSize: "32px",
        border: '1px solid lightskyblue',
        boxSizing: "border-box",
        color: "black",
        backgroundColor: "white",
        borderColor: "lightgrey"
    }
    
    const SubmitOTP = () => {
      if(OTP.length === 6){
          RecoverVerifyOTPRequest(GetEmail(),OTP).then((result)=>{
              if(result===true){
                  navigate("/CreatePassword")
              }
          })
      }
      else{
          ErrorToast("Enter 6 Digit Code")
      }
    }


    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4>OTP VERIFICATION </h4>
                                <p>A 6 Digit verification code has been sent to your email address. </p>
                                <ReactCodeInput onChange={(value)=>SetOTP(value)} inputStyle={defaultInputStyle} fields={6}/>
                                <br/>  <br/>
                                <button onClick={SubmitOTP} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster/>
            </div>
        </Fragment>
    );
};

export default VerifyOTP;