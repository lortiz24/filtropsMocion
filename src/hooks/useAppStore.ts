import { useAppDispatch, useAppSelector } from "../store/store";
import { onSetDownloadImageUrl } from "../store/app/appSlice";

export const useAppStore = () => {
  const { downloadImageUrl } = useAppSelector((store) => store.app);
  const dispatch = useAppDispatch();
  const handledSetImageUrl = (downloadImageUrl: string) => {
    dispatch(onSetDownloadImageUrl(downloadImageUrl));
  };
  return { downloadImageUrl, handledSetImageUrl };
};
