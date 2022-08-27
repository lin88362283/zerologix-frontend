import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
	user: UserInfo
}

interface UserInfo {
	userId: string,

}

const initialState = {
	userInfo: null,
}
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login:(state, action: PayloadAction<string>)=>{
			state.userId.push(action.payload)
		},
		logout: (state) =>{
			state.userId = null,
		}
	}
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer