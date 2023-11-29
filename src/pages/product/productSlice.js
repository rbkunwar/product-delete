import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: {},
};
const prodSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    setSelectedProduct: (state, { payload }) => {
      if (payload.id === setSelectedProduct.id) {
        return;
      }
      state.selectedProduct = payload;
    },
  },
});

const { reducer, actions } = prodSlice;

export const { setProducts, setSelectedProduct } = actions;

export default reducer;
