export class PauseModal extends Phaser.Scene {

    private timedEvent: Phaser.Time.TimerEvent;
    private background: Phaser.GameObjects.Image;
    private callbackScene: string;

    constructor(obj: {text: string, scene: string}) {
        super({
            key: 'pauseModal',
        });
    }

    create(obj: {text: string, scene: string}) {
        // Create the dialog window
        this.callbackScene = obj.scene;
        this._createWindow();
        this._inputKeyboard();
    }

    _inputKeyboard() {
        const _this = this;
        this.input.keyboard.on('keydown', (key) => {
            if (key.key === 'ArrowUp') {
                if (this.timedEvent.hasDispatched) {
                    _this.quit();
                }
            }
        });
    }

    // Gets the width of the game (based on the scene)
    _getGameWidth(): number {
        return Number(this.sys.game.config.width);
    }

    // Gets the height of the game (based on the scene)
    _getGameHeight(): number {
        return Number(this.sys.game.config.height);
    }

    // Creates the dialog window
    _createWindow() {
        this._createBackground();
        this.add.image(this._getGameWidth() / 2, this._getGameHeight() / 2, 'pause_menu');
    }

    _createBackground() {
        this.background = this.add.image(this._getGameWidth() / 2, this._getGameHeight() / 2, '');
        this.background.setDisplaySize(this._getGameWidth(), this._getGameHeight()).setTintFill(0x000000).setAlpha(0.3);
        this.background.setInteractive().on('pointerup', () => this.quit());
    }

    quit() {
        this.scene.stop('pauseModal');
        this.scene.resume(this.callbackScene);
    }
}
