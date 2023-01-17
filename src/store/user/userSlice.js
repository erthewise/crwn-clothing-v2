import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentUser: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
      console.log(state.currentUser)
    }
  }
})

// export const userReducer = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch(type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER:
//       return {
//         ...state,
//         currentUser: payload
//       }
//     default:
//       return state;
//   }
// }
export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
