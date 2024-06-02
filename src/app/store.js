import { configureStore } from "@reduxjs/toolkit";
import tierReducer from "../features/tiers/tier.Slice.js";

export const store = configureStore({
    reducer: tierReducer
});