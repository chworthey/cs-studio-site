import { useEffect, useRef, useState } from "react";

interface IMarqueeProps {
  MarqueeTexts: string[];
}

function Space() {
  return <span className="span__marquee-spacer"/>
}

export function Marquee(props: IMarqueeProps) {
  const marqueeText = useRef<HTMLParagraphElement>(null);

  const [positionX, setPositionX] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<DOMHighResTimeStamp>();
  const previousTimeRef = useRef<DOMHighResTimeStamp>();
  const duration = 180 * 1000.0;

  const lerp = (a: number, b: number, alpha: number) => {
    return (b - a) * alpha + a;
  };

  const tick = (time: DOMHighResTimeStamp) => {
    if (!previousTimeRef.current || !startTimeRef.current) {
      previousTimeRef.current = time;
      startTimeRef.current = time;
    }

    const previousTime = previousTimeRef.current;
    const startTime = startTimeRef.current;

    previousTimeRef.current = time;

    const elapsedTime = previousTime - startTime;
    const progress = (elapsedTime % duration) / duration;
    const docWidth = document.documentElement.clientWidth;

    if (marqueeText.current) {
      const pxPerRem = parseFloat(getComputedStyle(marqueeText.current).fontSize);

      let marqueeWidth = 0.0;
      for (let t of props.MarqueeTexts) {
        marqueeWidth += t.length * pxPerRem + docWidth;
      }

      const posX = lerp(docWidth, -marqueeWidth, progress);
      setPositionX(posX);
    }

    requestAnimationFrame(tick);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    };
  }, []);

  return (
    <div className="div__marquee-container">
      <div className="div__marquee">
        <div ref={marqueeText} className="p__marquee-text" style={{transform: `translateX(${positionX}px)`}}>
          {props.MarqueeTexts.map((t, i) => <span key={i}>
            {t}
            <Space/>
          </span>)}
        </div>
      </div>
    </div>
  );
}