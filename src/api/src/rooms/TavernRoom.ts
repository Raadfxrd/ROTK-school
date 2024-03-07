import { Room } from "../base/gameObjects/Room";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { GameObject } from "../base/gameObjects/GameObject";
import { BobCharacter } from "../characters/BobCharacter";
import { Action } from "../base/actions/Action";
import { TalkAction } from "../base/actions/TalkAction";
import { ExamineAction } from "../base/actions/ExamineAction";

export const TavernRoomAlias: string = "tavern-room";
export class TavernRoom extends Room {
    public constructor() {
        super(TavernRoomAlias);
    }
    public name(): string {
        return "tavern";
    }
    public images(): string[] {
        return ["rooms/Tavern.png"];
    }
    public objects(): GameObject[] {
        return [this, new BobCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Welcome in the tavern, traveller!", "Have a look around."]);
    }
    public actions(): Action[] {
        return [new TalkAction(), new ExamineAction()];
    }
}
