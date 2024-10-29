import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppSlice = {
  downloadImageUrl: string;
  imageBlob: string;
};
const initialState: AppSlice = {
  downloadImageUrl: "",
  imageBlob: "",
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    onSetDownloadImageUrl: (state, { payload }: PayloadAction<string>) => {
      state.downloadImageUrl = payload;
    },
    onSetImageBlob: (state, { payload }: PayloadAction<string>) => {
      state.imageBlob = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetDownloadImageUrl, onSetImageBlob } = appSlice.actions;
