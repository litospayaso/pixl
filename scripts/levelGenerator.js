const fs = require('fs');


const main = async () => {

    const levelsTiled  = await fs.readdirSync('./scripts/levels');

    levelsTiled.forEach(async (leveltiled) => {
        let levelTiledJson = await fs.readFileSync(`./scripts/levels/${leveltiled}`);
        levelTiledJson = JSON.parse(levelTiledJson);
        console.log(`./src/assets/levels/${leveltiled.split('.')[0]}/${leveltiled}`);
        let levelPixlJson = await fs.readFileSync(`./src/assets/levels/${leveltiled.split('.')[0]}/${leveltiled}`);
        levelPixlJson = JSON.parse(levelPixlJson);
        console.log(levelPixlJson)
    });
    // const tilesImage = await loadImage('./src/assets/tiles/brushes-tiles-export.png'); 
    // const tilesCanvas = createCanvas(tilesImage.width,tilesImage.height);
    // const tilesCtx = tilesCanvas.getContext('2d');
    // tilesCtx.drawImage(tilesImage, 0, 0, tilesImage.width, tilesImage.height)
    // const tilesResult = [];
    // let x = 0;
    // let y = 0;
    // let tile;
    // let tilex = tileSize-1;
    // let tiley = tileSize-1;

    // for(i = 0; i < (tilesImage.width*tilesImage.height)/(tileSize*tileSize); i++) {
    //     const data = tilesCtx.getImageData(x,y,tileSize-1,tileSize-1).data;
    //     const imgData = data.reduce((acc, val, i) => acc += val,0);

    //     const outputCanvas = createCanvas(tileSize, tileSize);
    //     const outCtx = outputCanvas.getContext('2d');
    //     outCtx.putImageData(tilesCtx.getImageData(x,y,tileSize-1,tileSize-1),0,0);
    //     // Use the normal primitives.
    //     fs.writeFileSync(`./scripts/tiles/tile_${i}.png`, outputCanvas.toBuffer());
    //     tilesResult.push(imgData);
    //     if (tilex === tilesImage.width-1){
    //         tilex = tileSize - 1;
    //         x = 0;
    //         y = tiley;
    //         tiley += tileSize;
    //     } else {
    //         x += tileSize;
    //         tilex += tileSize;
    //         // y -= tileSize;
    //     }
    // }

    // console.log(`%c tilesResult`, `background: #df03fc; color: #f8fc03`, tilesResult);

};

main();