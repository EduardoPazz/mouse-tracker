import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { usePointerCoordinates } from "@/hooks/usePointerCoordinates";
import { forwardRef, LegacyRef, useEffect, useRef } from "react";

const PointerTracker = () => {
  const pointerCoordinates = usePointerCoordinates();

  const cheeseRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cheese = cheeseRef?.current;

    if (!cheese) throw new Error(`Cheese is ${cheese}`);

    const cheeseRect = cheese.getBoundingClientRect();

    cheese.style.left = `${pointerCoordinates.x - cheeseRect.width / 2}px`;
    cheese.style.top = `${pointerCoordinates.y - cheeseRect.height / 2}px`;
  }, [pointerCoordinates, cheeseRef]);

  return (
    <span
      ref={cheeseRef}
      style={{ position: "absolute", fontSize: "70px", cursor: "grab" }}
    >
      🧀
    </span>
  );
};

const Tracker = forwardRef(function Tracker(_, ref) {
  return (
    <span
      ref={ref as LegacyRef<HTMLSpanElement>}
      style={{ position: "absolute" }}
    >
      <img
        src={"https://cdn-icons-png.flaticon.com/512/9905/9905142.png"}
        alt={"."}
        width={"50px"}
      />
    </span>
  );
});

const Circle = () => {
  const circleRef = useRef<Element>(null);
  const trackerRef = useRef<HTMLElement>(null);
  const mouse = usePointerCoordinates();

  useEffect(() => {
    const rect = circleRef?.current?.getBoundingClientRect();

    if (!rect) throw new Error(`DOMRect is ${rect}`);

    const { left, top, width, height } = rect,
      eyeCenter = {
        x: left + width / 2,
        y: top + height / 2,
      };

    const cathetusX = mouse.x - eyeCenter.x;
    const cathetusY = mouse.y - eyeCenter.y;
    const hypotenuse = Math.sqrt(cathetusX * cathetusX + cathetusY * cathetusY);

    const scaleRate = ((width / 2) * 0.7) / hypotenuse;

    const tracker = trackerRef?.current;

    if (!tracker) throw new Error(`Eye is ${rect}`);

    const trackerRect = tracker.getBoundingClientRect();

    tracker.style.left = `${
      width / 2 - trackerRect.width / 2 + cathetusX * scaleRate
    }px`;

    tracker.style.top = `${
      height / 2 - trackerRect.height / 2 + cathetusY * scaleRate
    }px`;
  }, [circleRef, trackerRef, mouse]);

  return (
    <div className={styles.circle} ref={circleRef as LegacyRef<HTMLDivElement>}>
      <Tracker ref={trackerRef} />
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Mouse Tracker 🐀🧀</title>
        <meta name="description" content="Move the cheese around" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        Move the cheese around
        <Circle />
        <PointerTracker />
      </main>
    </>
  );
}
