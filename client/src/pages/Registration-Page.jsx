import React, {Fragment, lazy, Suspense} from 'react';
import MasterLayout from "../components/masterLayout/Master-Layout.jsx";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const Registration = lazy(() => import("../components/registration/Registration.jsx"));

const RegistrationPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Registration/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default RegistrationPage;