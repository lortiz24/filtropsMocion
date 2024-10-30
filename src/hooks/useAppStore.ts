import { useAppDispatch, useAppSelector } from "../store/store";
import { onSetDownloadImageUrl, onSetImageBlob } from "../store/app/appSlice";

export const useAppStore = () => {
  const { downloadImageUrl, imageBlob } = useAppSelector((store) => store.app);
  const dispatch = useAppDispatch();

  const handledSetImageUrl = (downloadImageUrl: string) => {
    dispatch(onSetDownloadImageUrl(downloadImageUrl));
  };
  const handledSetImageBlob = (downloadImageUrl: string) => {
    dispatch(onSetImageBlob(downloadImageUrl));
  };

  const handledClearSlice = () => {
    onSetDownloadImageUrl("");
    onSetImageBlob("");
  };
  return {
    downloadImageUrl,
    handledSetImageUrl,
    imageBlob,
    handledSetImageBlob,
    handledClearSlice,
  };
};
