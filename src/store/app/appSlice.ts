import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppSlice = {
  downloadImageUrl: string;
};
const initialState: AppSlice = {
  downloadImageUrl: "",
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    onSetDownloadImageUrl: (state, { payload }: PayloadAction<string>) => {
      state.downloadImageUrl = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetDownloadImageUrl } = appSlice.actions;
