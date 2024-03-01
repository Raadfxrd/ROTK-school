import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { EleonorCharacter } from "../characters/EleonorCharacter";
import { HenryCharacter } from "../characters/HenryCharacter";

export const ThroneRoomTestAlias: string = "Throne-Room-test";

//exported consts used in other files
export const pickedRingUp: boolean = true;

export class ThroneRoomTest extends Room {
    public constructor() {
        super(ThroneRoomTestAlias);
    }
    public name(): string {
        return "Throne Room";
    }

    public images(): string[] {
        return ["throneroomentrance"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction()];
    }

    public objects(): GameObject[] {
        return [this, new HenryCharacter(), new EleonorCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You look around in the spot where the princess was last seen",
            "You see a ring laying on the floor that you have never seen before",
            "The ring is made of silver and has been engraved with the image of an cave",
        ]);
    }
}
