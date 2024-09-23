import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
const SendOTP = lazy(() => import("../../components/accountRecover/Send-OTP.jsx"));


const SendOtpPage = () => {
    return (
        <Fragment>
                <Suspense fallback={<LazyLoader/>}>
                    <SendOTP/>
                </Suspense>
        </Fragment>
    );
};

export default SendOtpPage;