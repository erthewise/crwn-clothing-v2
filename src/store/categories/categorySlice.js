import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const initialState = {
  categories: [],
  isLoading: false,
  error: null
}

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const categoriesArray = await getCategoriesAndDocuments();
  return categoriesArray;
})

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export default categorySlice.reducer