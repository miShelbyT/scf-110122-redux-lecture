import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

// when using thunk, the middleware will determine if we are sending a function to dispatch, or a plain object and will handle accordingly

export const fetchCats = createAsyncThunk("cats/fetchCats", () => {
  // return a Promise containing the data we want
  return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
    .then((response) => response.json())
    .then((data) => data.images);
});


const cuteCatsSlice = createSlice({
  name: "cuteCats",
  initialState: {
    entities: []
  },
  reducers: {
    // action as an object {type:  "cuteCat/add", payload: {.... catinfo}}
    // does anything here raise red flag??? no worries we aren't really mutating state due to redux magic!!
    cuteCatAdded(state, action) {
      state.entities.push({id: uuid(), name: action.payload})
    },
    cuteCatRemoved(state, action) {
      const idx = state.entities.findIndex(cat => cat.id === action.payload)
      // action.payload will need to be an id for this to work
      state.entities.splice(idx, 1)
    },
    cuteCatUpdated(state, action) {
      // add some code here if you want to go full CRUD!
    }
    // this is going to be a switch statement to update and return state. (sort of. redux does so much heavy lifting for us!)
    //switch(action.type){
      // case "cuteCat/add":
      // return [...state.entities, action.payload]
    // }
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchCats.pending](state) {
      state.status = "loading";
    },
    [fetchCats.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "no longer fetching";
    },
  },
})

export default cuteCatsSlice.reducer;

export const { cuteCatAdded, cuteCatRemoved, cuteCatUpdated } = cuteCatsSlice.actions;