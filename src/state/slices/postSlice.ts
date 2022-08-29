import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';
export interface Post {
	id: string,
	created_at: string,
	title: string,
	content: string,
	favourited: boolean
}

interface PostsWithPagination {
	data?: Post[],
	current_page?: number,
	first_page_url?: string,
	from?: number,
	last_page?: number,
	links?: object[],
	next_page_url?: string | null,
	path?: string,
	per_page?: number,
	prev_page_url?: null | string,
	to?: number,
	total?: number
}

interface PostState {
	posts: PostsWithPagination
}


export const getPosts = createAsyncThunk('post/getPosts', async (page: number = 1) => {
	const result = (await axios.get(`${BASE_API_URL}/post/analysis?per_page=12&page=${page}`)).data?.data;
	console.log("result", result)
	return result;
})

// export const logout = createAsyncThunk('user/signOut', async () => {
// 	const result = (await axios.post(`${BASE_API_URL}/me/user/logout`)).data?.success;
// 	return result;
// })

// export const checkMe = createAsyncThunk('user/checkMe', async () => {
// 	const token = localStorage.getItem('token');
// 	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// 	const result = (await axios.get(`${BASE_API_URL}/me/user/info`)).data?.data;
// 	console.log("result", result)
// 	return result;
// })

const initialState: PostState = {
	posts: {}
}
export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//getPosts
		builder.addCase(getPosts.fulfilled, (state, action: PayloadAction<PostsWithPagination>) => {
			state.posts = action.payload;
		})
		// builder.addCase(login.rejected, (state, action) => {
		// 	state.userEmail = '';
		// 	state.error = action.error.message || "Error!";
		// })
		// //logout
		// builder.addCase(logout.fulfilled, (state, _) => {
		// 	state.userEmail = '';
		// 	localStorage.removeItem('token');
		// 	axios.defaults.headers.common['Authorization'] = '';
		// })
		// //checkMe
		// builder.addCase(checkMe.fulfilled, (state,action: PayloadAction<CheckMePayload>)=>{
		// 	const { email } = action.payload;
		// 	state.userEmail = email;
		// })
		// builder.addCase(checkMe.rejected, (state,_)=>{
		// 	axios.defaults.headers.common['Authorization'] = '';
		// 	localStorage.removeItem('token');
		// 	state.userEmail = '';
		// })
	}
})

// export const { login, logout } = userSlice.actions

export default postSlice.reducer