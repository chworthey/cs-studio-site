import { useEffect, useRef, useState } from "react";
import { useAnimate, useMouseDown, useMouseMove } from "./WindowEvents";
import { RedHerring } from "../types/RedHerring";
import { CreateVec2 } from "../types/VecMath";

interface IHerringProps {
  Width: number;
  Height: number;
}

export function Herring(props: IHerringProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const mouseInside = useRef(false);
  const mouseDown = useMouseDown();
  const pointerLocation = useMouseMove();

  const herringRef = useRef<RedHerring>(new RedHerring(props.Width, props.Height));

  useAnimate((deltaTime: number) => {
    if (herringRef.current) {
      const herring = herringRef.current;
      herring.MouseDown = mouseDown.current ? mouseDown.current : false;
      herring.MouseInside = mouseInside.current ? mouseInside.current : false;
      herring.Width = props.Width;
      herring.Height = props.Height;
      if (pointerLocation.current && pointerLocation.current.X && pointerLocation.current.Y) {
        const mousePos = CreateVec2();
        mousePos.X = pointerLocation.current.X;
        mousePos.Y = pointerLocation.current.Y;
        herring.MousePosition = mousePos;
      }
      herring.Update({ DeltaTime: deltaTime });
      const position = herring.Position;
      setX(position.X);
      setY(position.Y);
    }
  });

  return (
    <img
      src="red-herring.png"
      className={mouseDown ? "img__red-herring img__red-herring--grabbed" : "img__red-herring"}
      onMouseEnter={() => { mouseInside.current = true; }}
      onMouseLeave={() => { mouseInside.current = false; }}
      draggable={false}
      style={{transform: `translate(${x}px, ${y}px)`}}
    />
  );
}