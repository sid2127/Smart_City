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
        },
        removePendingComplaint: (state , action) => {
            const id = action.payload;
            state.pendingComplaints = state.pendingComplaints.filter(c => c.id !== id);
        }

    }
})

export const { setAssignedComplaints, setCompletedComplaints, setPendingComplaints, removePendingComplaint } = complaintSlice.actions;
export default complaintSlice.reducer;