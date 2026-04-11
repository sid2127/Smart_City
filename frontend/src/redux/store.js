import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
import complaintSlice from './complaintSlice.js'
import officerSlice from './officersSlice.js'

export const store = configureStore({
    reducer: {
        user: userSlice,
        complaint: complaintSlice,
        officer: officerSlice,
    }
})