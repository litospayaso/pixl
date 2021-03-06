import { LevelProperties } from '@/core/LevelProperties';
import { colorWheel } from '@/core/Piiixls';
export const ConfigPlatforms = function(props: LevelProperties) {
  const levelname = props.levelData.properties.find((e) => e.name === 'key').value;
  props.scene.add.image(this.textures.get(`${levelname}-background`).get().width / 2, this.textures.get('level1-background').get().height / 2, 'level1-background');

  this.map = this.make.tilemap({ key: `${levelname}-map` });
  const groundTiles = this.map.addTilesetImage('ground_tiles');
  props.platforms = (this.map as any).createLayer('ground_tiles', groundTiles, 0, 0);
  props.enemyWalls = (this.map as any).createLayer('enemyWalls', groundTiles, 0, 0);
  (props.enemyWalls as any).setAlpha(0);

  const colorWallsLayer = props.levelData.layers.find((e) => e.name === 'colorWalls');
  const tileSize = props.levelData.tilewidth;
  const height = props.levelData.height * tileSize;
  const width = props.levelData.width * tileSize;
  let x = 0;
  let y = 0;
  let tilex = tileSize - 1;
  let tiley = tileSize - 1;
  const minVal = colorWallsLayer.data.filter((e) => e !== 0).sort((a, b) => a - b)[0];
  colorWallsLayer.data.forEach((tile) => {
    if (tile !== 0) {
      const wall = props.colorWalls.create(x + tileSize / 2, y + tileSize / 2).setDisplaySize(props.levelData.tilewidth, props.levelData.tileheight).setTintFill(`0x${colorWheel[tile - minVal].slice(0, -2)}`).setAlpha(0.5).body.setSize(props.levelData.tilewidth, props.levelData.tileheight);
      wall.color = tile - minVal;
      wall.setFrictionY(0);
    }
    if (tilex === width - 1) {
      tilex = tileSize - 1;
      x = 0;
      y = tiley;
      tiley += tileSize;
    } else {
      x += tileSize;
      tilex += tileSize;
      // y -= tileSize;
    }
  });
  // props.colorWalls = ( this.map as any ).createLayer( 'colorWalls', groundTiles, 0, 0 );

  props.levelData.layers.find((e) => e.name === 'elevators').objects.forEach((e) => {
    const speed = e.properties.find((prop) => prop.name === 'speed').value;
    const delay = e.properties.find((prop) => prop.name === 'delay').value;
    if (e.name === 'elevator') {
      props.elevators.create(e.x, e.y, 'all_tiles').setFrame(29).setImmovable(true).setVelocityY(speed).delay = delay;
    }
    if (e.name === 'shifter') {
      props.shifters.create(e.x, e.y, 'all_tiles').setFrame(28).setImmovable(true).setVelocityX(speed).delay = delay;
    }
  });

  props.elevators.children.iterate((child) => {
    props.scene.time.addEvent({
      delay: child.delay,
      loop: true,
      callback() {
        child.body.velocity.y *= -1;
      },
    });
  }, this);

  props.shifters.children.iterate((child) => {
    props.scene.time.addEvent({
      delay: child.delay,
      loop: true,
      callback() {
        child.body.velocity.x *= -1;
      },
    });
  }, this);

};
