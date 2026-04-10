import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    assignedComplaints: [],
    completedComplaints: [],
    pendingComplaints: []
}


const complaintSlice = createSlice({
    name: "complaint",
    initialState,
    reducers: {
        setAssignedComplaints: (state, action) => {
            state.assignedComplaints = action.payload;
        },
        setCompletedComplaints: (state, action) => {
            state.completedComplaints = action.payload;
        },
        setPendingComplaints: (state, action) => {
            state.pendingComplaints = action.payload;
        }

    }
})

export const { setAssignedComplaints, setCompletedComplaints, setPendingComplaints } = complaintSlice.actions;
export default complaintSlice.reducer;