import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {GetProfileDetails, ProfileUpdateRequest} from "../../APIRequest/APIRequest.js";
import {ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper.js";
import {useNavigate} from "react-router-dom";


const Profile = () => {

    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,userImgRef,userImgView=useRef()
    const ProfileData = useSelector((state) => state.profile.value);
    let navigate = useNavigate();


    useEffect(()=>{
        GetProfileDetails()
    },[])


    const PreviewImage = () => {
      let imgFile=userImgRef.files[0]
        getBase64(imgFile).then((base64Img)=>{
            userImgView.src=base64Img;
        })
    }
    
    const UpdateMyProfile = () => {
        let email = emailRef.value;
        let firstName =  firstNameRef.value;
        let lastName =  lastNameRef.value;
        let mobile =  mobileRef.value;
        let password = passwordRef.value;
        let photo = userImgView.src;

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
            ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
                if(result===true){
                    navigate("/")
                }
            })
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => userImgView = input} className="icon-nav-img-lg"
                                     src={ProfileData['photo']} alt=""/>
                                <hr/>
                                <div className="row">
                                    <div className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage} ref={(input) => userImgRef = input}
                                               placeholder="User Email" className="form-control animated fadeInUp"
                                               type="file"/>
                                    </div>
                                    <div className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={ProfileData['email']} readOnly={true}
                                               ref={(input) => emailRef = input} placeholder="User Email"
                                               className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                                        <label>First Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['firstName']}
                                               ref={(input) => firstNameRef = input} placeholder="First Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['lastName']}
                                               ref={(input) => lastNameRef = input} placeholder="Last Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                                        <label>Mobile</label>
                                        <input key={Date.now()} defaultValue={ProfileData['mobile']}
                                               ref={(input) => mobileRef = input} placeholder="Mobile"
                                               className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()} defaultValue={ProfileData['password']}
                                               ref={(input) => passwordRef = input} placeholder="User Password"
                                               className="form-control animated fadeInUp" type="password"/>
                                    </div>

                                    <div className="col-md-12 p-2">
                                        <button onClick={UpdateMyProfile}
                                                className="btn w-100 float-end btn-primary animated fadeInUp">Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;