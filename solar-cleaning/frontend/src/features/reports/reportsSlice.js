import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    schedule: [],
    salary: [],
    expenses: [],
    dailyAccount: [],
    loading: false,
    error: null,
};

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllReports = createAsyncThunk(
    "reports/getAllReports",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/reports/get-all-reports");
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllReports.fulfilled, (state, action) => {
                state.schedule = action.payload.schedules;
                state.salary = action.payload.salaries;
                state.expenses = action.payload.expenses;
                state.dailyAccount = action.payload.daily_accounts;
                state.loading = false;
            })
            .addCase(getAllReports.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default reportsSlice.reducer;
