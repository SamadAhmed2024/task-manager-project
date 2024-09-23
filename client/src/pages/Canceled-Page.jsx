import React, {Fragment,Suspense,lazy} from 'react';
import MasterLayout from "../components/masterLayout/Master-Layout.jsx";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";

const Canceled = lazy(() => import("../components/canceled/Canceled"));

const CanceledPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Canceled/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CanceledPage;