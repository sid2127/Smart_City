import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setComplaints } from '../redux/userSlice';
import { serverUrl } from '../App';
import { setAssignedComplaints, setCompletedComplaints, setPendingComplaints } from '../redux/complaintSlice';

function useGetAllComplaints() {
  
    const user = useSelector(state => state.user.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {

        if(!user) return;

        const getComplaints = async ()=> {
            try {
                const result = await axios.get(`${serverUrl}/api/v1/complaint/getAllComplaints`,
                    {withCredentials: true}
                )

                console.log(result);
                if(user.role === "user" || user.role === "officer"){
                    dispatch(setComplaints(result.data.complaints))
                }
                else{
                    dispatch(setAssignedComplaints(result.data.assignedPendingComplaints));
                    dispatch(setCompletedComplaints(result.data.completedComplaints));
                    dispatch(setPendingComplaints(result.data.pendingComplaints));
                }
                
            } catch (error) {
                console.log("Error" , error);
                console.log(error.response?.data);     
            }
        }

        getComplaints();
    } , [user])
}

export default useGetAllComplaints;