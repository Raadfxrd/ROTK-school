import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
//import { Action } from "../base/actions/Action";
//import { CustomAction } from "../base/actions/CustomAction";
//import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { Drakecharacter } from "../characters/DrakeCharacter";

export const VolosVillageRoomAlias: string = "Volo's Village";

export class VolosVillageRoom extends Room {
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You arrived at the gate of Volo's Village",
            "There is an eery aura around the gate",
        ]);
    }
    public constructor() {
        super(VolosVillageRoomAlias);
    }

    public name(): string {
        return "Volo's Village";
    }

    public images(): string[] {
        return ["volodrake"];
    }
    public actions(): Action[] {
        return [new ExamineAction()];
    }
    public objects(): GameObject[] {
        return [new Drakecharacter()];
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
