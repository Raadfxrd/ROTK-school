import { ExampleAction } from "../actions/ExampleAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
//import { Action } from "../base/actions/Action";
//import { CustomAction } from "../base/actions/CustomAction";
//import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";

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
        return ["volodrake2"];
    }
    public actions(): Action[] {
        return [new ExamineAction(), new ];
    }
}
