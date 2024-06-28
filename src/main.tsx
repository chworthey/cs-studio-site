import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

enum CatDirection {
  Up,
  Right,
  Down,
  Left
}

enum CatMode {
  Walking,
  Searching,
  Playing,
  Sitting,
  Sleeping,
  WakeUp
}
let catX = 0;
let catY = 0;
let catMode = CatMode.Searching;
let catDirection = CatDirection.Up;
let catSearchDuration = 1000;
const catSpeed = 0.2;

let lastTimeStamp: DOMHighResTimeStamp;
let startSearchTime: DOMHighResTimeStamp;
let startTime: DOMHighResTimeStamp;
let playStartTime: DOMHighResTimeStamp;
let sitStartTime: DOMHighResTimeStamp;
let wakeUpStartTime: DOMHighResTimeStamp;

let targetX = 0;
let targetY = 0;

document.onmousemove = (ev: MouseEvent) => {
  const circle = document.getElementById('cursor');
  const knownHalfWidth = 50;
  const knownHalfHeight = 50;
  const stylishOffsetX = -1;
  const stylishOffsetY = 3;
  targetX = ev.pageX - knownHalfWidth + stylishOffsetX;
  targetY = ev.pageY - knownHalfHeight + stylishOffsetY;
  if (circle) {
    circle.style.left = `${targetX}px`;
    circle.style.top = `${targetY}px`;
  }
};

const root = document.getElementById('root')!;

function setCatContainerSize() {
  const container = document.getElementById('cat-container');
  if (container && root) {
    container.style.width = `${root.clientWidth}px`;
    container.style.height = `${root.clientHeight}px`;
  }
}
 
new ResizeObserver(setCatContainerSize).observe(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div id="cat-container" className="div__cat-container" aria-hidden={true}>
      <img id="cat" className='img__cat'/>
    </div>
    <App />
  </React.StrictMode>,
);

function isCatClose(threshold: number) {
  return Math.sqrt(Math.pow(targetX - catX, 2) + Math.pow(targetY - catY, 2)) <= threshold;
}

function isTargetBehindCat() {
  const dxTarget = targetX - catX;
  const dyTarget = targetY - catY;
  let cX: number, cY: number;
  switch(catDirection)
  {
    case CatDirection.Up:
      cX = 0;
      cY = -1;
      break;
    case CatDirection.Right:
      cX = 1;
      cY = 0;
      break;
    case CatDirection.Down:
      cX = 0;
      cY = 1;
      break;
    case CatDirection.Left:
      cX = -1;
      cY = 0;
      break;
    default:
      cX = 0;
      cY = 0;
      break;
  }

  return cX * dxTarget + cY * dyTarget < 0;
}

function chooseCatDirection() {
  let rv;

  if (Math.abs(targetX - catX) > Math.abs(targetY - catY)) {
    if (catX > targetX) {
      rv = CatDirection.Left;
    }
    else {
      rv = CatDirection.Right;
    }
  }
  else {
    if (catY > targetY) {
      rv = CatDirection.Up;
    }
    else {
      rv = CatDirection.Down;
    }
  }

  return rv;
}


function step(timestamp: DOMHighResTimeStamp) {
  const delta = timestamp - lastTimeStamp;

  const totalElapsed = timestamp - startTime;

  let triggerAlt = Math.floor(totalElapsed / 1000.0 * 5.0) % 2 === 0;

  const catElement = document.getElementById('cat') as HTMLImageElement;
  if (!catElement) {
    window.requestAnimationFrame(step);
    return;
  }

  if (catMode === CatMode.WakeUp) {
    if (timestamp - wakeUpStartTime > 1000) {
      catMode = CatMode.Searching;
      startSearchTime = timestamp;
    }
  }
  else if (catMode === CatMode.Sleeping) {
    if (!isCatClose(150)) {
      catMode = CatMode.WakeUp;
      wakeUpStartTime = timestamp;
    }
  }
  else if (catMode === CatMode.Sitting) {
    if (!isCatClose(75)) {
      catMode = CatMode.Walking;
      catDirection = chooseCatDirection();
    }
    else if (timestamp - sitStartTime > 2000){
      catMode = CatMode.Sleeping;
      const audio = new Audio('neko/sleep.wav');
      audio.play();
    }
  }
  else if (isCatClose(50)) {
    if (catMode === CatMode.Playing) {
      if (timestamp - playStartTime > 1500) {
        catMode = CatMode.Sitting;
        sitStartTime = timestamp;
      }
    }
    else {
      catMode = CatMode.Playing;
      playStartTime = timestamp;
    }
  }
  else if (catMode === CatMode.Playing) {
    catMode = CatMode.Searching;
    startSearchTime = timestamp;
  }
  else if (catMode === CatMode.Searching) {
    if (timestamp - startSearchTime > catSearchDuration) {
      catMode = CatMode.Walking;
      catDirection = chooseCatDirection();
    }
  }
  else { // Walking mode
    if (isTargetBehindCat()) {
      catMode = CatMode.Searching;
      startSearchTime = timestamp;
    }
    else {
      const moveAmount = catSpeed * delta;

      switch (catDirection)
      {
        case CatDirection.Up:
          catY -= moveAmount;
          break;
        case CatDirection.Right:
          catX += moveAmount;
          break;
        case CatDirection.Down:
          catY += moveAmount;
          break;
        case CatDirection.Left:
          catX -= moveAmount;
          break;
      }
    }
  }

  let task: string;
  let hasAlt = true;
  let hasDir = true;

  switch (catMode) {
    case CatMode.WakeUp:
      task = 'awake';
      hasDir = false;
      hasAlt = false;
      break;
    case CatMode.Sleeping:
      task = 'sleep';
      hasDir = false;
      break;
    case CatMode.Playing:
      task = 'claw';
      break;
    case CatMode.Searching:
      task = 'wash';
      hasDir = false;
      break;
    case CatMode.Sitting:
      task = 'scratch';
      hasDir = false;
      break;
    case CatMode.Walking:
      task = '';
      break;
    default:
      task = 'error'
      break;
  }

  const altStr = hasAlt ? (triggerAlt ? '2' : '1') : '';

  let dir: string;
  switch(catDirection) {
    case CatDirection.Up:
      dir = 'up';
      break;
    case CatDirection.Right:
      dir = 'right';
      break;
    case CatDirection.Down:
      dir = 'down';
      break;
    case CatDirection.Left:
      dir = 'left';
      break;
  }

  catElement.textContent = task;

  
  catElement.style.left = `${catX}px`;
  catElement.style.top = `${catY}px`;

  const sc = `neko/${hasDir ? dir : ''}${task}${altStr}.png`;
  if (catElement.src !== sc) {
    catElement.src = sc;
  }
  catElement.className = `img__cat img__cat--${dir}`;

  lastTimeStamp = timestamp;

  window.requestAnimationFrame(step);
}

const now = performance.now();
startSearchTime = now;
lastTimeStamp = now;
startTime = now;
playStartTime = now;
sitStartTime = now;
wakeUpStartTime = now;
window.requestAnimationFrame(step);

const debugFns = {
  checkScrollingAncestor(elem: HTMLElement): boolean {
    if (!elem.parentElement || elem.parentElement.tagName.toLowerCase() === 'body') {
        return false;
    }

    const computedStyle = window.getComputedStyle(elem.parentElement);

    if (computedStyle.overflowX == 'auto') {
        return true;
    } else {
        return debugFns.checkScrollingAncestor(elem.parentElement);
    }
  },
  getSizedAncestor(elem: HTMLElement): HTMLElement | null {
    if (!elem.parentElement) {
        return null;
    }

    if (elem.parentElement.offsetWidth > 0) {
        return elem.parentElement;
    } else {
        return debugFns.getSizedAncestor(elem.parentElement);
    }
  },
  dompath(element: HTMLElement)
  {
    var path = `${element.nodeName}:${element.className}`;
    for (let e: HTMLElement | null = element.parentElement; e && e.nodeType == 1; e = e.parentElement)
    {
      path = `${e.nodeName}:${e.className}` + '.' + path;
    }
    return path;
  },
  checkElement(element: Element) {
    const issues: HTMLElement[] = [];
    const el = element as HTMLElement;
    const hasScrollingAncestor = debugFns.checkScrollingAncestor(el);
    if (hasScrollingAncestor) {
        return;
    }

    const isHidden = (el.offsetParent === null);
    if (isHidden) {
      return;
    }

    // Find elements that overflow the document width
    if (el.offsetWidth > document.documentElement.offsetWidth) {
        issues.push(el);
    }

    const ancestor = debugFns.getSizedAncestor(el);
    const info = window.getComputedStyle(el);

    // Find any negative margins (deliberate outflow)
    const adjustment = 
        (info.marginLeft.startsWith('-') ? parseFloat(info.marginLeft) * -1 : 0)
        +
        (info.marginRight.startsWith('-') ? parseFloat(info.marginRight) * -1 : 0);

    if (ancestor && (el.offsetWidth - adjustment) > ancestor.offsetWidth) {
      issues.push(el);
    }

    if (issues.length > 0) {
      console.log(issues.map(i => debugFns.dompath(i)));
    }
  },
  isScroller(el: Element) {
    const hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;
    const hasVerticalScrollbar = el.scrollHeight > el.clientHeight;
    return hasHorizontalScrollbar || hasVerticalScrollbar;
  }
};

function LogScrollbars() {
  for (let el of document.querySelectorAll('*')) {
    if (debugFns.isScroller(el)) {
      console.log(debugFns.dompath(el as HTMLElement));
    }
  }
}

(window as any).LogScrollbars = LogScrollbars;
