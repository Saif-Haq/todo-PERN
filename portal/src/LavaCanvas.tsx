import { useEffect, useState } from 'react';
import './App.css'

export interface itemInterface {
  x: number;
  y: number;
  blur: number;
  radius: number;
  initialXDirection: number;
  initialYDirection: number;
  initialBlurDirection: number;
  colorOne: string;
  colorTwo: string;
  gradient: number[];
}

export const LavaCanvas = () => {
  const [error, setError] = useState<boolean>(false);

  function rand(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  function initializeItems(count: number, canvas: HTMLCanvasElement, colors: string[][], radius: number[], blur: number[]): itemInterface[] {
    const items = [];
    for (let i = 0; i < count; i++) {
      const thisRadius = rand(radius[0], radius[1]);
      const thisBlur = rand(blur[0], blur[1]);
      const x = rand(-100, canvas.width + 100);
      const y = rand(-100, canvas.height + 100);
      const colorIndex = Math.floor(rand(0, 299) / 100);
      const colorOne = colors[colorIndex][0];
      const colorTwo = colors[colorIndex][1];

      items.push({
        x,
        y,
        blur: thisBlur,
        radius: thisRadius,
        initialXDirection: Math.round(rand(-99, 99) / 100),
        initialYDirection: Math.round(rand(-99, 99) / 100),
        initialBlurDirection: Math.round(rand(-99, 99) / 100),
        colorOne,
        colorTwo,
        gradient: [x - thisRadius / 2, y - thisRadius / 2, x + thisRadius, y + thisRadius],
      });
    }
    return items;
  }

  function updateItem(item: itemInterface, adjX: number, adjY: number, adjBlur: number, radius: number[], canvas: HTMLCanvasElement) {
    if (item.x + (item.initialXDirection * adjX) >= canvas.width && item.initialXDirection !== 0 || item.x + (item.initialXDirection * adjX) <= 0 && item.initialXDirection !== 0) {
      item.initialXDirection = item.initialXDirection * -1;
    }
    if (item.y + (item.initialYDirection * adjY) >= canvas.height && item.initialYDirection !== 0 || item.y + (item.initialYDirection * adjY) <= 0 && item.initialYDirection !== 0) {
      item.initialYDirection = item.initialYDirection * -1;
    }

    if (item.blur + (item.initialBlurDirection * adjBlur) >= radius[1] && item.initialBlurDirection !== 0 || item.blur + (item.initialBlurDirection * adjBlur) <= radius[0] && item.initialBlurDirection !== 0) {
      item.initialBlurDirection *= -1;
    }

    item.x += item.initialXDirection * adjX;
    item.y += item.initialYDirection * adjY;
    item.blur += item.initialBlurDirection * adjBlur;
  }

  function drawItem(ctx: CanvasRenderingContext2D, item: itemInterface) {
    ctx.beginPath();
    ctx.filter = `blur(${item.blur}px)`;
    const grd = ctx.createLinearGradient(item.gradient[0], item.gradient[1], item.gradient[2], item.gradient[3]);
    grd.addColorStop(0, item.colorOne);
    grd.addColorStop(1, item.colorTwo);
    ctx.fillStyle = grd;
    ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (!canvas) {
      setError(true);
      return;
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      ['#002aff', "#009ff2"],
      ['#0054ff', '#27e49b'],
      ['#202bc5', '#873dcc']
    ];
    const count = 70;
    const blur = [12, 70];
    const radius = [1, 120];

    const items = initializeItems(count, canvas, colors, radius, blur);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const changeCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const adjX = 2;
      const adjY = 2;
      const adjBlur = 1;

      items.forEach((item) => {
        updateItem(item, adjX, adjY, adjBlur, radius, canvas);
        drawItem(ctx, item);
      });

      window.requestAnimationFrame(changeCanvas);
    };

    window.requestAnimationFrame(changeCanvas);
  }), [];

  return (
    <>
      {
        error ?
          <h1> Something went wrong. </h1 >
          :
          <canvas id="canvas" className="lava-canvas" style={{ background: 'black' }}></canvas >
      }

    </>
  )
}
