import { memo, useEffect, useState } from "react";
import { notification } from "antd";

export const Timer = memo(({ stop }: { stop: boolean }) => {
  const MINUTES_IN_MS = 5 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0",
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    if (stop) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
      notification.error({
        message: "인증시간 초과되었습니다.",
      });
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, stop]);

  return (
    <div>
      {minutes} : {second}
    </div>
  );
});
