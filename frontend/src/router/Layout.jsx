// frontend/src/router/Layout.jsx

// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import
// import { thunkAuthenticate } from "../redux/session";
// import 

export default function Layout() {
    console.log('Layout rendered');
    // const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false);
    // useEffect(() => {
    //     dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    // }, [dispatch]);

    return (
        <>
            {/* <ModalProvider> */}
                {/* <Navigation /> */}
                {/* {isLoaded && <Outlet />} */}
                <Outlet />
                {/* <Modal /> */}
            {/* </ModalProvider> */}
        </>
    );
}