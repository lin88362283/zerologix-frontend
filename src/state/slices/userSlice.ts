import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';
interface UserState {
	userEmail: string,
	error: string,
}

interface LoginReqPayload {
	email: string,
	password: string,
}
interface CheckMePayload {
	email: string,
}

interface LoginResPayload {
	email: string,
	token: string,
}


export const login = createAsyncThunk('user/signIn', async (payload: LoginReqPayload) => {
	const result = (await axios.post(`${BASE_API_URL}/auth/login/email`, payload)).data?.data;
	return result;
})

export const logout = createAsyncThunk('user/signOut', async () => {
	const result = (await axios.post(`${BASE_API_URL}/me/user/logout`)).data?.success;
	return result;
})

export const checkMe = createAsyncThunk('user/checkMe', async () => {
	const token = localStorage.getItem('token');
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const result = (await axios.get(`${BASE_API_URL}/me/user/info`)).data?.data;
	return result;
})

const initialState: UserState = {
	userEmail: '',
	error: ''
}
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//login
		builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResPayload>) => {
			const { email, token } = action.payload;
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
			state.userEmail = email;
			state.error = '';
			localStorage.setItem('token', token);
		})
		builder.addCase(login.rejected, (state, action) => {
			state.userEmail = '';
			state.error = action.error.message || "Error!";
		})
		//logout
		builder.addCase(logout.fulfilled, (state, _) => {
			state.userEmail = '';
			localStorage.removeItem('token');
			axios.defaults.headers.common['Authorization'] = '';
		})
		//checkMe
		builder.addCase(checkMe.fulfilled, (state,action: PayloadAction<CheckMePayload>)=>{
			const { email } = action.payload;
			state.userEmail = email;
		})
		builder.addCase(checkMe.rejected, (state,_)=>{
			axios.defaults.headers.common['Authorization'] = '';
			localStorage.removeItem('token');
			state.userEmail = '';
		})
	}
})

export default userSlice.reducer