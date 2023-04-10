import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  news:[]
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.news = [...state.news, action.payload.d]
    },
    removemark: (state, action) => {
      state.news = state.news.filter((el)=> el!==action.payload.d)
    },
  },
})

// Action creators are generated for each case reducer function
export const {  addBookmark, removemark } = newsSlice.actions

export default newsSlice.reducer