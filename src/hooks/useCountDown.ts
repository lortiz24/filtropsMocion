import { useEffect } from "react";
import { useCounter, useInterval } from "@mantine/hooks";

export const useCountDown = (
  secondsToCount: number,
  onFinishedCountDown?: () => void
) => {
  const [seconds, { decrement, reset }] = useCounter(secondsToCount, {
    min: 0,
  });
  const interval = useInterval(() => decrement(), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      interval.stop();
      if (onFinishedCountDown) onFinishedCountDown();
    }
  }, [seconds]);

  const restore = () => {
    reset();
    interval.stop();
    interval.start();
  };
  return { seconds, restore };
};
