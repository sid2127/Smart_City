import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App';
import { setIsLoading, setUserDetails } from '../redux/userSlice';

function useGetUserDetails() {

    const user = useSelector((state) => state.user.userInfo)
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setIsLoading(true));

        const getUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}api/v1/user/getUserDetails`,
                    { withCredentials: true }
                )

                console.log("getUserDetails : ", result);
                dispatch(setUserDetails(result.data.user));
                dispatch(setIsLoading(false));
            } catch (error) {
                console.log("FULL ERROR:", error);
            console.log("MESSAGE:", error.message);
            console.log("RESPONSE:", error.response);
            dispatch(setIsLoading(false));
                
            }

        }


        getUser();
    }, [])
}

export default useGetUserDetails;