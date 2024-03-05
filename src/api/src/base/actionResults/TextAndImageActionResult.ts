import { TextActionResult } from "./TextActionResult";

/**
 * Class used the represent the textual and image result of an action
 */
export class TextAndImageActionResult extends TextActionResult {
    private _images: string[];

    /**
     * Create a new instance of this action result
     *
     * @param text Text to show
     * @param images Image to show
     */
    public constructor(text: string[], images: string[]) {
        super(text);

        this._images = images;
    }

    /**
     * Image to show
     */
    public get images(): string[] {
        return this._images;
    }
}
