import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setComplaints } from '../redux/userSlice';
import { serverUrl } from '../App';

function useGetAllComplaints() {
  
    const user = useSelector(state => state.user.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {

        const getComplaints = async ()=> {
            try {
                const result = await axios.get(`${serverUrl}api/v1/complaint/getAllComplaints`,
                    {withCredentials: true}
                )

                console.log(result);
                dispatch(setComplaints(result.data.complaints))
                
            } catch (error) {
                console.log("Error" , error);
                console.log(error.response?.data);     
            }
        }

        getComplaints();
    } , [user])
}

export default useGetAllComplaints;