import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, viewComments,updateComment, deleteComment} from "../api/comment";

export const createComment = createAsyncThunk("comment/createComment",
    async (data, thunkAPI) => {
        await addComment(data);
        thunkAPI.dispatch(viewAllComments(data.videoCode));
    }
)
export const viewAllComments = createAsyncThunk("comment/viewAllComments",
    async (videoCode) => {
        const response = await viewComments(videoCode);
        return response.data;
    }
)

export const modifyComment = createAsyncThunk("comment/modifyComment",
    async (data, thunkAPI) => {
        await updateComment(data);
        thunkAPI.dispatch(viewAllComments(data.videoCode));
    }
)
export const removeComment = createAsyncThunk("comment/removeComment",
    async (data, thunkAPI) => {
        await deleteComment(data.commentCode);
        thunkAPI.dispatch(viewAllComments(data.videoCode));
    }
)

const commentSlice = createSlice({
    name : "comment",
    initialState : {
        comments : []
    },
    extraReducers : (builder) => {
        builder
        .addCase(viewAllComments.fulfilled, (state,action) => {
            state.comments = action.payload;
        })
    }
})

export default commentSlice;