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
interface LoginResPayload {
	email: string,
}

export const login = createAsyncThunk('user/signIn', async (payload: LoginReqPayload) => {
	console.log(">>>")
	const a = await axios.post(`${BASE_API_URL}/auth/login/email`, payload);
	const result = a.data;
	console.log("result",result.data)
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
		builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResPayload>) => {
			console.log("here!!")
			state.userEmail = action.payload.email;
			console.log(action.payload);
			state.error = '';
		})
		builder.addCase(login.rejected, (state, action) => {
			state.userEmail = '';
			state.error = action.error.message || "Error!";
		})
	}
})

// export const { login, logout } = userSlice.actions

export default userSlice.reducer