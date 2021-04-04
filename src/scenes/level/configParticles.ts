import { LevelProperties } from '@/core/LevelProperties';
import { colorWheel } from '@/core/Piiixls';

export const ParticlesSystem = {
  particlesOnJump(props: LevelProperties) {
    const { x, y } = props.player;
    const particles = props.scene.add.particles('white_particles');
    const emitter = particles.createEmitter({
      y: y + 20,
      x: { min: x + 0, max: x + 40 },
      lifespan: 1000,
      speedY: { min: 0, max: 20 },
      scale: { start: 0.4, end: 0 },
      quantity: 3,
      blendMode: 'ADD',
    });
    emitter.explode();
  },
  particlesOnHit(props: LevelProperties) {
    const color = props.player.piiixls.getColor();
    const particles = props.scene.add.particles('white_particles');
    const emitter = particles.createEmitter({
      x: 400,
      y: 300,
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.4, end: 0 },
      blendMode: 'SCREEN',
      quantity: 35,
      tint: color !== -1 ? Number(`0x${colorWheel[color].slice(0, -2)}`) : 0xffffff,
      lifespan: 600,
      gravityY: 300,
    });

    const { x, y } = props.player.body.position;
    emitter.setPosition(x, y);
    emitter.explode();
  },
  particlesForFireball(props: LevelProperties, ball: Phaser.Physics.Arcade.Sprite) {
    const particles = props.scene.add.particles('white_particles');
    const emitter = particles.createEmitter({
      y: 20,
      x: 20,
      lifespan: 180,
      scale: { start: 0.5, end: 0 },
      gravityY: 300,
      quantity: 1,
      tint: colorWheel.map((e) => Number(`0x${e.slice(0, -2)}`)),
      blendMode: 'NORMAL',
    });
    ball.anims.play('shootPixelBall');
    (ball as any).emitter = emitter;
    emitter.startFollow(ball);
  },
};
