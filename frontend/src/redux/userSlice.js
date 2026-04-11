import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    complaints: [],
    isAuthenticated: false,
    isLoading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
        },
        setComplaints: (state, action) => {
            state.complaints = action.payload;
        },
        logout: (state) => {
            state.userInfo = null;
            state.complaints = [];
            state.isAuthenticated = false;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateStatus: (state , action) => {
            const {id, status} = action.payload;

            state.complaints = state.complaints.map((c) => c.id === Number(id) ? (c.status = {status}) : c );
        }

    }
});

export const { setUserDetails, setComplaints, logout, setIsLoading } = userSlice.actions;
export default userSlice.reducer;