interface Idimensions {
    x: number;
    y: number;
    rectWidth: number;
    rectHeight: number;
}

export class DialogsModal extends Phaser.Scene {

    private borderThickness = 3;
    private borderColor = 0x907748;
    private borderAlpha = 1;
    private windowAlpha = 0.8;
    private windowColor = 0x303030;
    private windowHeight = 150;
    private padding = 32;
    private dialogSpeed = 5;
    private text: Phaser.GameObjects.Text;
    private graphics: Phaser.GameObjects.Graphics;
    private timedEvent: Phaser.Time.TimerEvent;
    private background: Phaser.GameObjects.Image;
    private eventCounter;
    private dialog: string[];
    private callbackScene: string;
    private textArray: string[];
    private textIndex = 0;
    private animationEnded = false;

    constructor() {
        super({
            key: 'dialogsModal',
        });
    }

    create(obj: { text: string[], scene: string }) {
        // Create the dialog window
        this.callbackScene = obj.scene;
        this.textArray = obj.text;
        this._createWindow();
        this.setText(this.textArray[this.textIndex], true);
        this._inputKeyboard();
    }

    // Sets the text for the dialog window
    setText(text: string, animate: boolean) {
        // Reset the dialog
        this.animationEnded = false;
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) { this.timedEvent.remove(null); }

        const tempText = animate ? '' : text;
        this._setText(tempText);

        if (animate) {
            this.timedEvent = this.time.addEvent({
                delay: 150 - (this.dialogSpeed * 30),
                callback: this._animateText,
                callbackScope: this,
                loop: true,
            });
        }
    }

    // Slowly displays the text in the window to make it appear annimated
    _animateText() {
        this.eventCounter++;
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
            this.textIndex++;
            this.animationEnded = true;
            this.timedEvent.remove(null);
        }
    }

    // Calcuate the position of the text in the dialog window
    _setText(text) {
        // Reset the dialog
        if (this.text) { this.text.destroy(); }

        const x = this.padding + 10;
        const y = this.padding + 10;

        this.text = this.make.text({
            x,
            y,
            text,
            style: {
                wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 },
            },
        });
    }

    _inputKeyboard() {
        this.input.keyboard.on('keydown', (key) => {
            if (key.key === 'ArrowUp') {
                this._handleClick();
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

    // Calculates where to place the dialog window based on the game size
    _calculateWindowDimensions(width: number, height: number): Idimensions {
        const x = this.padding;
        const y = this.padding;
        const rectWidth = width - (this.padding * 2);
        const rectHeight = this.windowHeight;
        return {
            x,
            y,
            rectWidth,
            rectHeight,
        };
    }

    // Creates the inner dialog window (where the text is displayed)
    _createInnerWindow(dimensions: Idimensions) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(dimensions.x + 1, dimensions.y + 1, dimensions.rectWidth - 1, dimensions.rectHeight - 1);
    }

    // Creates the border rectangle of the dialog window
    _createOuterWindow(dimensions: Idimensions) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    }

    // Creates the dialog window
    _createWindow() {
        const gameHeight = this._getGameHeight();
        const gameWidth = this._getGameWidth();
        const dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.add.graphics();
        this._createBackground();

        this._createOuterWindow(dimensions);
        this._createInnerWindow(dimensions);
    }

    _createBackground() {
        this.background = this.add.image(this._getGameWidth() / 2, this._getGameHeight() / 2, '');
        this.background.setDisplaySize(this._getGameWidth(), this._getGameHeight()).setTintFill(0x000000).setAlpha(0.3);
        this.background.setInteractive().on('pointerup', () => this._handleClick());
    }

    quit() {
        this.textIndex = 0;
        this.scene.stop('dialogsModal');
        this.scene.resume(this.callbackScene);
    }

    _handleClick() {
        if (this.animationEnded) {
            if (this.textIndex < this.textArray.length) {
                this.setText(this.textArray[this.textIndex], true);
            } else {
                this.quit();
            }
        }
    }

}
