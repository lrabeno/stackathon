import React, { useEffect, useRef } from 'react';
import { BallMovement } from './BallMovement';
import data from '../../data';
import WallCollision from './util/WallCollision';
import Paddle from './Paddle';
import Brick from './Brick';
import BrickCollision from './util/BrickCollision';
import PaddleHit from './util/PaddleHit';
import PlayerStats from './PlayerStats';
import AllBroke from './util/AllBroke';
import ResetBall from './util/ResetBall';

let bricks = [];

let { ballObj, paddleProps, brickObj, player } = data;

const Board = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      paddleProps.y = canvas.height - 30;

      //Assign bricks below
      let newBrickSet = Brick(player.level, bricks, canvas, brickObj);

      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      PlayerStats(ctx, player, canvas);

      //displays bricks by mapping
      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      //Function that handles ball movement
      BallMovement(ctx, ballObj, paddleProps);

      // Checks if all the bricks are broken
      AllBroke(bricks, player, canvas, ballObj);

      //Check if the player has lives and end the game if not
      if (player.lives === 0) {
        alert('Game Over! Press ok to restart');
        player.lives = 5;
        player.level = 1;
        player.score = 0;
        ResetBall(ballObj, canvas, paddleProps);
        bricks.length = 0;
        brickObj.y = 50;
      }

      //Function that handles the ball hitting the wall
      WallCollision(ballObj, canvas, player, paddleProps);

      //BrickCollision

      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i]);

        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === 'X') {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === 'Y') {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
          player.score += 10;
        }
      }

      Paddle(ctx, canvas, paddleProps);

      // Paddle and ball collision

      PaddleHit(ballObj, paddleProps);

      requestAnimationFrame(render);
    };
    render();
    // --- Rectangle ---
    // ctx.fillStyle = 'green';
    // ctx.fillRect(10, 10, 150, 100);
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="gameHeader">Breakout Game</h1>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseMove={(event) =>
          (paddleProps.x =
            event.clientX -
            (window.innerWidth < 900 ? 10 : (window.innerWidth * 20) / 200) -
            paddleProps.width / 2 -
            10)
        }
        height="500"
        width={
          window.innerWidth < 900
            ? window.innerWidth - 20
            : window.innerWidth - (window.innerWidth * 20) / 100
        }
      />
    </div>
  );
};

export default Board;
