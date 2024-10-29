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

  return {
    downloadImageUrl,
    handledSetImageUrl,
    imageBlob,
    handledSetImageBlob,
  };
};
