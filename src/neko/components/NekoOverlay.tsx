import { useEffect, useRef, useState } from "react";
import '../styles/neko.css';
import { Neko, NekoSprite } from "../types/Neko";
import { CreateVec2 } from "../types/VecMath";

interface IPointerLocation {
  X: number | undefined;
  Y: number | undefined;
}

function useMouseMove() {
  const pointerLocation = useRef<IPointerLocation>({
    X: undefined,
    Y: undefined,
  });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      pointerLocation.current = {
        X: e.pageX - 50 - 1,
        Y: e.pageY - 50 + 3,
      };
    }
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return pointerLocation;
}

function useAnimate(animateFunc: (deltaTime: number) => void) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  const animate = (time: DOMHighResTimeStamp) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      animateFunc(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
}

interface INekoOverlayProps {
  Width: number;
  Height: number;
}

export function NekoOverlay(props: INekoOverlayProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [sprite, setSprite] = useState(NekoSprite.Wash1);

  const nekoRef = useRef<Neko>(new Neko());
  
  const pointerLocation = useMouseMove();

  useAnimate((deltaTime: number) => {
    if (nekoRef.current) {
      const neko = nekoRef.current;
      if (pointerLocation.current && pointerLocation.current.X && pointerLocation.current.Y) {
        const targetPos = CreateVec2();
        targetPos.X = pointerLocation.current.X;
        targetPos.Y = pointerLocation.current.Y;
        neko.TargetPosition = targetPos;
      }
      neko.Update({ DeltaTime: deltaTime });
      setX(neko.Position.X);
      setY(neko.Position.Y);
      setSprite(neko.Sprite);
    }
  });

  return (
    <div style={{width: `${props.Width}px`, height: `${props.Height}px`}}
      id="neko-container"
      className="div__neko-container"
      aria-hidden={true}
      onMouseMove={e => {
        console.log('here');
        if (nekoRef.current) {
          const newPos = CreateVec2();
          newPos.X = e.pageX;
          newPos.Y = e.pageY;
          nekoRef.current.TargetPosition = newPos;
        }
      }}>
      <div style={{transform: `translate(${x}px, ${y}px)`}} id="neko" className='div__neko'>
        <img hidden={sprite !== NekoSprite.Wash1} id="neko-wash1" src="neko/wash1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Wash2} id="neko-wash2" src="neko/wash2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Up1} id="neko-up1" src="neko/up1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Up2} id="neko-up2" src="neko/up2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Right1} id="neko-right1" src="neko/right1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Right2} id="neko-right2" src="neko/right2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Down1} id="neko-down1" src="neko/down1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Down2} id="neko-down2" src="neko/down2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Left1} id="neko-left1" src="neko/left1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Left2} id="neko-left2" src="neko/left2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Awake} id="neko-awake" src="neko/awake.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Sleep1} id="neko-sleep1" src="neko/sleep1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Sleep2} id="neko-sleep2" src="neko/sleep2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.UpClaw1} id="neko-upclaw1" src="neko/upclaw1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.UpClaw2} id="neko-upclaw2" src="neko/upclaw2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.RightClaw1} id="neko-rightclaw1" src="neko/rightclaw1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.RightClaw2} id="neko-rightclaw2" src="neko/rightclaw2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.DownClaw1} id="neko-downclaw1" src="neko/downclaw1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.DownClaw2} id="neko-downclaw2" src="neko/downclaw2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.LeftClaw1} id="neko-leftclaw1" src="neko/leftclaw1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.LeftClaw2} id="neko-leftclaw2" src="neko/leftclaw2.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Scratch1} id="neko-scratch1" src="neko/scratch1.png" className='img__neko'/>
        <img hidden={sprite !== NekoSprite.Scratch2} id="neko-scratch2" src="neko/scratch2.png" className='img__neko'/>
      </div>
    </div>
  );
};
