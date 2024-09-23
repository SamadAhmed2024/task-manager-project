import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
const VerifyOTP = lazy(() => import("../../components/accountRecover/Verify-OTP.jsx"));

const VerifyOTPPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <VerifyOTP/>
            </Suspense>
        </Fragment>
    );
};

export default VerifyOTPPage;