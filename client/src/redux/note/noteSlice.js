import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toasty from '../../utils/Toast';

const initialState = {
    notes: [],
    error: null,
    loading: false,
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        getNotesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getNotesSuccess: (state, action) => {
            state.notes = action.payload;
            state.loading = false;
            state.error = null;
        },
        getNotesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { getNotesStart, getNotesSuccess, getNotesFailure } = noteSlice.actions;

export default noteSlice.reducer;