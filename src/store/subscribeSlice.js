import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create, remove, count, getSub } from "../api/subscribe";

export const subscribe = createAsyncThunk("subscribe/subscribe",
    async (data) => {
        const response = await create(data);
        return response.data;
    }
);

export const unsubscribe = createAsyncThunk("subscribe/unsubscribe",
    async (subCode) => {
        const response = await remove(subCode);
        return response.data;
    }
);

export const subCount = createAsyncThunk("subscribe/subCount", 
    async (channelCode) => {
        const response = await count(channelCode);
        return response.data;
    }
);

export const fetchSub = createAsyncThunk("subscribe/fetchSub", 
    async (channelCode) => {
        const response = await getSub(channelCode);
        return response.data;
    }
)

const subscribeSlice = createSlice({
    name : "subscribe",
    initialState : {
        count : 0,
        isSub : false,
        sub : null
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(subscribe.fulfilled, (state, action) => {
            state.isSub = true;
            state.count = state.count + 1;
        })
        .addCase(unsubscribe.fulfilled, (state) =>{
            state.isSub = false;
            state.count -= 1;
        })
        .addCase(subCount.fulfilled, (state, action) => {
            state.count = action.payload;
        })
        .addCase(fetchSub.fulfilled, (state,action) => {
            if(action.payload === "") {
                state.isSub = false;
                state.sub = null;
            } else {
                state.isSub = true;
                state.sub = action.payload;
            }
        })
        .addCase(fetchSub.rejected, (state, action) => {
            state.isSub = false;
            state.sub = null;
        });
    },
});

export default subscribeSlice;