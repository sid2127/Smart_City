import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    officers: []
}


const officersSlice = createSlice({
    name: "officer",
    initialState,
    reducers: {
        setOfficers: (state , action) => {
            state.officers = action.payload
        },
        deleteOfficer: (state , action) => {
            state.officers = state.officers.filter((off) => off.id !== action.payload);
        }
    }
})

export const {setOfficers, deleteOfficer} = officersSlice.actions;
export default officersSlice.reducer;