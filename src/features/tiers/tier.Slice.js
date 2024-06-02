import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id:nanoid(), text: "tier"}]
}

export const tierSlice = createSlice({
    name: 'tier',
    initialState,
    reducers: {
        addTier: (state, action) => {
            const tier= {
                id: nanoid(),
                text: action.payload

            }
            state.tiers.push(tier)
        },
        removeTier: (state, action) => {
            state.tiers = state.tiers.filter((tier) => tier.id !== action.payload)
        },
        updateTier: (state, action) => {
            const {id, newText} = action.payload
            const tierToUpdate = state.tiers.find(tier => tier.id === id);

            if(tierToUpdate) {
                tierToUpdate.text = newText;
            }
        },
        loadTier: (state, action) => {
            return action.payload;
        },
    }
})

export const selectTier = (state) => state.tier;

export const {addTier, removeTier, updateTier, loadTier} = tierSlice.actions

export default tierSlice.reducer