import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk, thunkTryCatch} from "../../common/utils/thunks";
import {packsApi} from "./packs.api";
import {IPacks, PackQueryTypes} from "./packs.interfaces";
import {Nullable} from "../../common/utils/optionalTypes/optional.types";

const getAllPacks = createAppAsyncThunk<{
    packs: IPacks
}, PackQueryTypes>("Packs/allPacks", async (arg: PackQueryTypes, thunkAPI) => {
    // const params = Object.fromEntries(arg);
    // console.log("getAllPacks", params);
    return thunkTryCatch(thunkAPI, async () => {
        const res = await packsApi.allPacks(arg);
        return {packs: res.data};
    });
});

const slice = createSlice({
    name: "packs",
    initialState: {
        packs: null as Nullable<IPacks>,
        isLoadingPacks: true
    },
    reducers: {
        // setPacks: (state, action: PayloadAction<{ packs: IPacks }>) => {
        //     state.packs = { ...action.payload.packs };
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPacks.fulfilled, (state, action) => {
            state.packs = action.payload.packs;
        });
    }
});

export const packReducer = slice.reducer;
export const packActions = slice.actions;
export const packThunks = {getAllPacks};
