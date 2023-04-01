import React from "react";

export function useDate() {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    raw: currentTime,
    date: currentTime.toDateString(),
    time: currentTime.toLocaleTimeString(),
  };
}
