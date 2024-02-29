import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";

export const KarasValeTownSquareRoomAlias: string = "KVTownSquare";

export class KarasValeTownSquareRoom extends Room {
    public constructor() {
        super(KarasValeTownSquareRoomAlias);
    }

    public name(): string {
        return "Kara's Vale";
    }

    public images(): string[] {
        return ["KVTownSquare1"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["In front of you is a small town named Kara's Vale."]);
    }
}
