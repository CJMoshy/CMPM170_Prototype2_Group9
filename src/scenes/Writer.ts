import Phaser from 'phaser';
export default class Writer extends Phaser.Scene {
	private DBOX_X!: number;
	private DBOX_Y!: number;
	private DBOX_FONT!: string;
	private TEXT_X!: number;
	private TEXT_Y!: number;
	private TEXT_SIZE!: number;
	private TEXT_MAX_WIDTH!: number;
	private LETTER_TIMER!: number;

	private dialogTyping!: boolean;
	private dialogText!: Phaser.GameObjects.BitmapText | null;

	private textTimer?: Phaser.Time.TimerEvent;

	constructor() {
		super({ key: 'writerScene' });
	}

	init() {
		// // dialog constants
		// this.DBOX_X = this.game.config.width as number / 2; // dialog box x-position
		// this.DBOX_Y = this.game.config.height as number / 2 - 110; // dialog box y-position
		this.DBOX_FONT = 'bone'; // dialog box font key

		this.TEXT_X = this.game.config.width as number / 2; // text w/in dialog box x-position
		this.TEXT_Y = this.game.config.height as number / 2 - 110; // text w/in dialog box y-position
		this.TEXT_SIZE = 16; // text font size (in pixels)
		this.TEXT_MAX_WIDTH = 420; // max width of text within box

		this.LETTER_TIMER = 15; // # ms each letter takes to "type" onscreen

		this.dialogTyping = false; // flag to lock player input while text is "typing"
		this.dialogText = null; // the actual dialog text
	}

	create() {
		// // add dialog box sprite
		// this.writingbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'writing-box')
		// 	.setOrigin(0.5, 0);

		this.dialogText = this.add.bitmapText(
			this.TEXT_X,
			this.TEXT_Y,
			this.DBOX_FONT,
			'',
			this.TEXT_SIZE,
		).setOrigin(0.5, 0);

		interface playSceneData {
			text: string;
		}
		this.events.on('playerLeftGrave', () => {
			this.dialogText!.text = '';
			this.dialogTyping = false;
		});
		this.events.on('dowindowthing', (data: playSceneData) => {
			if (this.dialogTyping === false) {
				this.typeText(data.text);
			}
		});
	}

	override update() {}

	//credit nathan alitce @UCSC's CMPM dept.
	typeText(text: string) {
		// lock input while typing
		this.dialogTyping = true;

		// clear text
		this.dialogText!.text = '';

		// create a timer to iterate through each letter in the dialog text
		let currentChar = 0;
		this.textTimer = this.time.addEvent({
			delay: this.LETTER_TIMER,
			repeat: text!.length - 1,
			callback: () => {
				// concatenate next letter from dialogLines
				this.dialogText!.text += text[currentChar];
				// advance character position
				currentChar++;
				// check if timer has exhausted its repeats
				// (necessary since Phaser 3 no longer seems to have an onComplete event)
				if (this.textTimer!.getRepeatCount() == 0) {
					// show prompt for more text
					this.textTimer!.destroy(); // destroy timer
					// this.time.addEvent({
					// 	delay: 1000,
					// 	repeat: 0,
					// 	callback: () => {
					// 		this.dialogText!.text = '';
					// 	},
					// });
				}
			},
			callbackScope: this, // keep Scene context
		});
		// final cleanup before next iteration
		this.dialogText!.maxWidth = this.TEXT_MAX_WIDTH; // set bounds on dialog
	}
}
