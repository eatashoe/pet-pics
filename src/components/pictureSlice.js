import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { fetchData } from './pictureAPI';

const initialState = {
    value: [],
    selected: [],
    filtered: [],
    filterValue: '',
    filterLoaded: false,
    selectAll: false,
    status: 'idle',
  };


export const updateAsync = createAsyncThunk(
    'picture/fetchData',
    async () => {
        const response = await fetchData();
        return response.json();
    }
);
export const pictureSlice = createSlice({
    name: 'picture',
    initialState,
    reducers: {
      update: (state, action) => {
        let temp = []
        action.payload.forEach(e => {
            temp.push(e);
        });
        state.filtered = temp;
        state.filterLoaded = true;
        // state.filterValue = "";
      },
      select: (state, action) => ({
        ...state,
        selected: [
            ...state.selected.slice(0,action.payload.id),
            action.payload.text,
           ...state.selected.slice(action.payload.id+1)
           ]
      }),
      setSelectAll: (state, action) => {
        state.selectAll = action.payload
      },
      clearSelect: (state) => {
        let a = new Array(state.selected.length);
        for (let i=0; i<state.selected.length; ++i) a[i] = 0;
        state.selected = a;
        state.selectAll = false;
      },
      selectAll: (state,action) => {
            if(state.filtered.length > 0){
                if(action.payload.selectAll){
                    state.selectAll = true;
                    let a = new Array(state.selected.length);
                    for (let i=0; i<state.selected.length; ++i) a[i] = 0;
                    for (let i=0; i<state.filtered.length; ++i) a[i] = 1;
                    state.selected = a;
                }
                else{
                    state.selectAll = false;
                    let a = new Array(state.selected.length);
                    for (let i=0; i<state.selected.length; ++i) a[i] = 0;
                    state.selected = a;
                }
            }
            else{
                if(action.payload.selectAll){
                    state.selectAll = true;
                    let a = new Array(state.selected.length);
                    for (let i=0; i<state.selected.length; ++i) a[i] = 1;
                    state.selected = a;
                }
                else{
                    state.selectAll = false;
                    let a = new Array(state.selected.length);
                    for (let i=0; i<state.selected.length; ++i) a[i] = 0;
                    state.selected = a;
                }
            }
      },
      setFilterValue: (state, action) => {
        //   console.log(state.filterValue);
        state.filterValue = action.payload;
      },
      unloadFilter: (state) => {
          state.filterLoaded = false;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          let b = action.payload;
          let a = new Array(action.payload.length);
          for(let i = 0; i < b.length; i++){
              b[i]['id'] = i;
              a[i] = 0;
          }
        //   console.log(b);
          state.value = b;
          state.selected = a;
          state.selectAll = false;
          state.filtered = [];
          state.filterValue = "";
          state.filterLoaded = false;
          state.selectAll = false;
        });
    },
  });

export const { update, select, clearSelect, selectAll, setSelectAll, setFilterValue, unloadFilter } = pictureSlice.actions;

export const selectPics = (state) => state.picture.value;
export const selectSelected = (state) => state.picture.selected;
export const selectIsAll = (state) => state.picture.selectAll;
export const selectFiltered = (state) => state.picture.filtered;
export const selectFilterValue = (state) => state.picture.filterValue;
export const selectFilterLoaded = (state) => state.picture.filterLoaded;

export default pictureSlice.reducer;