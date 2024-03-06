import { NavigateBlacksmithAlias } from "../actions/NavigateAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";

export const KarasValeBlacksmithRoomAlias: string = "KVBlacksmith";

export class KarasValeBlacksmithRoom extends Room {
    public constructor() {
        super(KarasValeBlacksmithRoomAlias, NavigateBlacksmithAlias);
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You are standing in the smithy. The fires of the forge light up the room.",
        ]);
    }
    public images(): string[] {
        return ["example"];
    }
    public name(): string {
        return "Blacksmith";
    }
}
