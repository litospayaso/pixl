const fs = require('fs');
const tileSize = 32;

const main = async () => {

    const levelsTiled  = await fs.readdirSync('./scripts/levels');

    levelsTiled.forEach(async (leveltiled) => {
        try{
            let levelTiledJson = await fs.readFileSync(`./scripts/levels/${leveltiled}`);
            levelTiledJson = JSON.parse(levelTiledJson);
            const colorWalls = levelTiledJson.layers.find(e => e.name === 'colorWalls')

            console.log('\x1b[32m%s\x1b[36m%s\x1b[0m', 'levelTiledJson ', colorWalls);
            const colorTiles = colorWalls.data.filter( e => e!==0).sort((a,b) => a - b);
            colorTiles.forEach((tile, index) => {
                const dup = JSON.parse(JSON.stringify(colorWalls));
                dup.data = dup.data.map(e => e !== tile ? 0 : tile);
                dup.name = `colorWall${index}`;
                dup.id = levelTiledJson.layers.lenght + 1;
                levelTiledJson.layers.push(dup);
            });
            // const tileSize = levelTiledJson.tilewidth;
            // const height = levelTiledJson.height * tileSize;
            // const width = levelTiledJson.width * tileSize;
            // let levelPixlJson = await fs.readFileSync(`./src/assets/levels/${leveltiled.split('.')[0]}/${leveltiled}`);
            // levelPixlJson = JSON.parse(levelPixlJson);
            // let x = 0;
            // let y = 0;
            // let tilex = tileSize-1;
            // let tiley = tileSize-1;
            // levelPixlJson.levelProperties.dimensions = {width,height};
            // const ground = [];
            // const colorWalls = [];
            // const enemyWalls = [];
            // const spikes = [];
    
            // const groundArray = levelTiledJson.layers.find(e => e.name === 'ground').data; 
            // const colorWallsArray = levelTiledJson.layers.find(e => e.name === 'colorWalls').data; 
            // const enemyWallsArray = levelTiledJson.layers.find(e => e.name === 'enemyWalls').data; 
            // const spikesArray = levelTiledJson.layers.find(e => e.name === 'spikes').data; 
    
            // groundArray.forEach((tile, i)=>{
            //     if (tile !== 0) {
            //         ground.push({
            //             x: x + tileSize/2,
            //             y: y + tileSize/2,
            //             texture: tile - 1
            //         });
            //     }
            //     if (colorWallsArray[i] !== 0) {
            //         colorWalls.push({
            //             x: x + tileSize/2,
            //             y: y + tileSize/2,
            //             texture: colorWallsArray[i] - 51
            //         });
            //     }
            //     if (enemyWallsArray[i] !== 0) {
            //         enemyWalls.push({
            //             x: x + tileSize/2,
            //             y: y + tileSize/2,
            //             texture: enemyWallsArray[i] - 1
            //         });
            //     }
            //     if (spikesArray[i] !== 0) {
            //         spikes.push({
            //             x: x + tileSize/2,
            //             y: y + tileSize/2,
            //             texture: spikesArray[i] - 1
            //         });
            //     }
    
            //     if (tilex === width-1) {
            //         tilex = tileSize - 1;
            //         x = 0;
            //         y = tiley;
            //         tiley += tileSize;
            //     } else {
            //         x += tileSize;
            //         tilex += tileSize;
            //         // y -= tileSize;
            //     }
            // });
            // const initialPosition = {x: levelTiledJson.layers.find(e => e.name === 'player').objects[0].x, y: levelTiledJson.layers.find(e => e.name === 'player').objects[0].y}; 
            // const player = {
            //     initialPosition,
            //     color: levelTiledJson.layers.find(e => e.name === 'player').objects[0].properties.find(e => e.name === 'color').value
            // }
            // const elevators = levelTiledJson.layers.find(e => e.name === 'elevators').objects.filter(e => e.name === 'elevator').map(e => {return {
            //     x:e.x,
            //     y:e.y,
            //     speed: e.properties.find(elem => elem.name === 'speed').value,
            //     delay: e.properties.find(elem => elem.name === 'delay').value
            // }}); 
            // const shifters = levelTiledJson.layers.find(e => e.name === 'elevators').objects.filter(e => e.name === 'shifter').map(e => {return {
            //     x:e.x,
            //     y:e.y,
            //     speed: e.properties.find(elem => elem.name === 'speed').value,
            //     delay: e.properties.find(elem => elem.name === 'delay').value
            // }}); 
            // const enemies = levelTiledJson.layers.find(e => e.name === 'enemies').objects.map(e => {return {
            //     x:e.x,
            //     y:e.y
            // }});
            
            // levelPixlJson.platforms.ground = ground;        
            // levelPixlJson.platforms.colorWalls = colorWalls;
            // levelPixlJson.platforms.enemyWalls = enemyWalls;
            // levelPixlJson.platforms.spikes = spikes;
            // levelPixlJson.platforms.elevators = elevators;
            // levelPixlJson.platforms.shifters = shifters;
            // levelPixlJson.player = player;
            // levelPixlJson.enemies = enemies;
            fs.writeFileSync(`./src/assets/levels/${leveltiled.split('.')[0]}/${leveltiled}`, JSON.stringify(levelTiledJson));
            }catch(err){

        }
    });
};

main();