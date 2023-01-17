import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriesMap: {}
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesMap: (state, action) => {
      state.categoriesMap = action.payload
    }
  },
})

export const { setCategoriesMap } = categoriesSlice.actions

export default categoriesSlice.reducer

// useEffect(() => {
//   const getCategoriesMap = async () => {
//     const categoryMap = await getCategoriesAndDocuments();
//     setCategoriesMap(categoryMap);
//   }
//   getCategoriesMap();
// }, []);