import { useEffect, useState } from "react";

export const usePointerCoordinates = () => {
  const [coor, setCoor] = useState({ x: 0, y: 0 });
  const listener = (event: MouseEvent) =>
    setCoor({ x: event.clientX, y: event.clientY });

  useEffect(() => {
    addEventListener("mousemove", listener);
    return () => removeEventListener("mousemove", listener);
  }, []);

  return coor;
};
