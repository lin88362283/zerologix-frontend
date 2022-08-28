import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';
interface FormState {
	formTopic: string,
}


const initialState: FormState = {
	formTopic: '',
}
export const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		setCurrentFormTopic(state, action: PayloadAction<string>) {
			state.formTopic = action.payload;
		}
	},
	// extraReducers: (builder) => {
	// 	//login
	// 	builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResPayload>) => {
	// 		const { email, token } = action.payload;
	// 		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	// 		state.userEmail = email;
	// 		state.error = '';
	// 		localStorage.setItem('token', token);
	// 	})
	// 	builder.addCase(login.rejected, (state, action) => {
	// 		state.userEmail = '';
	// 		state.error = action.error.message || "Error!";
	// 	})
	// 	//logout
	// 	builder.addCase(logout.fulfilled, (state, _) => {
	// 		state.userEmail = '';
	// 		localStorage.removeItem('token');
	// 		axios.defaults.headers.common['Authorization'] = '';
	// 	})
	// 	//checkMe
	// 	builder.addCase(checkMe.fulfilled, (state, action: PayloadAction<CheckMePayload>) => {
	// 		const { email } = action.payload;
	// 		state.userEmail = email;
	// 	})
	// 	builder.addCase(checkMe.rejected, (state, _) => {
	// 		axios.defaults.headers.common['Authorization'] = '';
	// 		localStorage.removeItem('token');
	// 		state.userEmail = '';
	// 	})
	// }
})

export const { setCurrentFormTopic } = formSlice.actions

export default formSlice.reducer