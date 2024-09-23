import React, {useRef} from 'react';
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper.js";
import {RegistrationRequest} from "../../APIRequest/APIRequest.js";
import {useNavigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const Registration = () => {

    let {emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef}=useRef();
    let navigate = useNavigate()

    const onRegistration = () => {

        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgo8ZGVmcz4KPC9kZWZzPgo8ZyBzdHlsZT0ic3Ryb2tlOiBub25lOyBzdHJva2Utd2lkdGg6IDA7IHN0cm9rZS1kYXNoYXJyYXk6IG5vbmU7IHN0cm9rZS1saW5lY2FwOiBidXR0OyBzdHJva2UtbGluZWpvaW46IG1pdGVyOyBzdHJva2UtbWl0ZXJsaW1pdDogMTA7IGZpbGw6IG5vbmU7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuNDA2NTkzNDA2NTkzNDAxNiAxLjQwNjU5MzQwNjU5MzQwMTYpIHNjYWxlKDIuODEgMi44MSkiID4KCTxwYXRoIGQ9Ik0gNzkuNjM1IDczLjY5NiBDIDg2LjEwNCA2NS45MDEgOTAgNTUuODk4IDkwIDQ1IEMgOTAgMjAuMTg3IDY5LjgxMyAwIDQ1IDAgQyAyMC4xODcgMCAwIDIwLjE4NyAwIDQ1IGMgMCAxMC44OTggMy44OTYgMjAuOTAxIDEwLjM2NSAyOC42OTYgYyAwLjEwNSAwLjE2MSAwLjIyNyAwLjMxNSAwLjM4MyAwLjQ0NSBjIDAuMDAyIDAuMDAyIDAuMDA1IDAuMDAzIDAuMDA3IDAuMDA1IEMgMTkuMDE1IDgzLjgzNyAzMS4yOTggOTAgNDUgOTAgYyAxMy43MDIgMCAyNS45ODUgLTYuMTYzIDM0LjI0NSAtMTUuODU0IGMgMC4wMDMgLTAuMDAyIDAuMDA1IC0wLjAwMyAwLjAwOCAtMC4wMDUgQyA3OS40MDggNzQuMDEgNzkuNTMgNzMuODU3IDc5LjYzNSA3My42OTYgeiBNIDQ1IDQgYyAyMi42MDcgMCA0MSAxOC4zOTMgNDEgNDEgYyAwIDkuMTY5IC0zLjAyNiAxNy42NDUgLTguMTMyIDI0LjQ4MiBjIC02LjA4MSAtNi41MDUgLTEzLjg3NiAtMTAuOTkgLTIyLjQwMiAtMTMuMDIzIGMgNi40OTcgLTMuNjY5IDEwLjkwMSAtMTAuNjI5IDEwLjkwMSAtMTguNjA5IGMgMCAtMTEuNzgyIC05LjU4NSAtMjEuMzY3IC0yMS4zNjcgLTIxLjM2NyBjIC0xMS43ODIgMCAtMjEuMzY3IDkuNTg1IC0yMS4zNjcgMjEuMzY3IGMgMCA3Ljk3OSA0LjQwNCAxNC45MzkgMTAuOTAxIDE4LjYwOCBjIC04LjUyNiAyLjAzMyAtMTYuMzIxIDYuNTE4IC0yMi40MDIgMTMuMDIzIEMgNy4wMjYgNjIuNjQ1IDQgNTQuMTY5IDQgNDUgQyA0IDIyLjM5MyAyMi4zOTMgNCA0NSA0IHogTSA0NSA1NS4yMTcgYyAtOS41NzYgMCAtMTcuMzY3IC03Ljc5MSAtMTcuMzY3IC0xNy4zNjcgUyAzNS40MjQgMjAuNDgyIDQ1IDIwLjQ4MiBzIDE3LjM2NyA3Ljc5MSAxNy4zNjcgMTcuMzY3IFMgNTQuNTc2IDU1LjIxNyA0NSA1NS4yMTcgeiBNIDQ1IDg2IGMgLTExLjk4NiAwIC0yMi43ODcgLTUuMTcxIC0zMC4yOSAtMTMuMzk5IEMgMjIuNDggNjQuMDc5IDMzLjQxOCA1OS4yMTcgNDUgNTkuMjE3IGMgMTEuNTgxIDAgMjIuNTIgNC44NjMgMzAuMjkgMTMuMzg0IEMgNjcuNzg3IDgwLjgyOSA1Ni45ODYgODYgNDUgODYgeiIgc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOyBmaWxsOiByZ2IoMCwwLDApOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IiB0cmFuc2Zvcm09IiBtYXRyaXgoMSAwIDAgMSAwIDApICIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==";

        if(IsEmail(email)){
            ErrorToast("valid email address required !")
        }
        else if(IsEmpty(firstName)){
            ErrorToast("First Name required !")
        }
        else if(IsEmpty(lastName)){
            ErrorToast("Last Name required !")
        }
        else if(!IsMobile(mobile)){
            ErrorToast("Mobile number required !")
        }
        else if(IsEmpty(password)){
            ErrorToast("Password required !")
        }
        else{
            RegistrationRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
                if(result===true){
                    navigate("/login")
                }
            })
        }


    }

    return (
        <div className="container">
            <div className="row  justify-content-center">
                <div className="col-md-10 col-lg-10 center-screen">
                    <div className="card animated fadeIn w-100 p-3">
                        <div className="card-body">
                            <h4>Sign Up</h4>
                            <hr/>
                            <div className="container-fluid m-0 p-0">
                                <div className="row m-0 p-0">
                                    <div className="col-md-4 p-2">
                                        <label>Email Address</label>
                                        <input ref={(input)=>emailRef=input} placeholder="User Email"
                                               className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>First Name</label>
                                        <input ref={(input)=>firstNameRef=input} placeholder="First Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Last Name</label>
                                        <input ref={(input)=>lastNameRef=input} placeholder="Last Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Mobile Number</label>
                                        <input ref={(input)=>mobileRef=input} placeholder="Mobile"
                                               className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Password</label>
                                        <input ref={(input)=>passwordRef=input} placeholder="User Password"
                                               className="form-control animated fadeInUp" type="password"/>
                                    </div>

                                </div>
                                <div className="row mt-2 p-0">
                                    <div className="col-md-4 p-2">
                                        <button onClick={onRegistration}
                                                className="btn mt-3 w-100 float-end btn-primary animated fadeInUp">Complete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    );
};

export default Registration;