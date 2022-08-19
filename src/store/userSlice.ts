import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { getUserDetails, registerUser, userLogin } from './userActions'

interface IUserInfo {
  id: number,
  avatar: string,
  username: string,
  about: string
}

interface IUserState {
  loading: boolean,
  userInfo: IUserInfo | null,
  userToken: string | null,
  error: string | null,
  success: boolean,
}

const userToken: string | null = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState: IUserState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: {
    [userLogin.pending.type]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled.type]: (state, { payload }: PayloadAction<string>) => {
      state.loading = false
      state.userToken = payload
    },
    [userLogin.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.loading = false
      state.error = payload
    },
    [registerUser.pending.type]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled.type]: (state) => {
      state.loading = false
      state.success = true
    },
    [registerUser.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.loading = false
      state.error = payload
    },
    [getUserDetails.pending.type]: (state) => {
      state.loading = true
    },
    [getUserDetails.fulfilled.type]: (state, { payload }: PayloadAction<IUserInfo>) => {
      state.loading = false
      state.userInfo = payload
    },
    [getUserDetails.rejected.type]: (state) => {
      state.loading = false
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer