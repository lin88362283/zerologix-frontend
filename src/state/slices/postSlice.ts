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
	posts: PostsWithPagination,
	registeredPosts: Post[]
}

interface RegisterPostReqPayload {
	id: string,
}
interface GetpostsReqPayload {
	page: number
}
interface UnregisterPostReqPayload {
	id: string
}

export const getPosts = createAsyncThunk('post/getPosts', async (payload: GetpostsReqPayload) => {
	const result = (await axios.get(`${BASE_API_URL}/post/analysis?per_page=12&page=${payload.page}`)).data?.data;
	return result;
})

export const getRegisteredPosts = createAsyncThunk('post/getRegisteredPosts', async () => {
	const result = (await axios.get(`${BASE_API_URL}/me/user/favourite/post-analysis`)).data?.data;
	return result;
})


export const unregisterPost = createAsyncThunk('post/unregisterPost', async (payload: UnregisterPostReqPayload) => {
	const result = (await axios.delete(`${BASE_API_URL}/me/user/favourite/post-analysis/${payload.id}`)).data?.data;
	return result;
})

export const registerPost = createAsyncThunk('post/registerPost', async (payload: RegisterPostReqPayload) => {
	const result = (await axios.post(`${BASE_API_URL}/me/user/favourite/post-analysis/${payload.id}`)).data?.data;
	return result;
})


const initialState: PostState = {
	posts: {},
	registeredPosts: []
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
		//getRegisteredPosts
		builder.addCase(getRegisteredPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
			state.registeredPosts = action.payload;
		})
		//unregisterPost
		builder.addCase(unregisterPost.fulfilled, (state, action: PayloadAction<Post[]>) => {
			state.registeredPosts = action.payload;
		})
		//registerPost
		builder.addCase(registerPost.fulfilled, (state, action: PayloadAction<PostsWithPagination>) => {
			state.posts = action.payload;
		})
	}
})

export default postSlice.reducer