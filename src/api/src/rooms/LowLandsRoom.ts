import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { Torch1Item } from "../items/Torch1Item";

export const LowLandsRoomAlias: string = "lowlands-room";

export class LowLandsRoom extends Room {
    public constructor() {
        super("lowlands");
    }

    public name(): string {
        return "LowLands";
    }

    public images(): string[] {
        return ["lowlands"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new CustomAction("inside", "Go inside", false),
            new CustomAction("trees", "Look at the trees", false),
        ];
    }

    public objects(): GameObject[] {
        return [this, new Torch1Item()];
    }

    public examine = (): ActionResult | undefined => {
        return new TextActionResult(["You are in the LowLands.", "It is a dark and gloomy place."]);
    };

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "inside") {
            return new TextActionResult(["You try to go inside the tunnel, but it's too dark."]);
        }
        if (alias === "trees") {
            return new TextActionResult([
                "You take a closer look at the trees.",
                "There is something written on them...",
            ]);
        }
        return undefined;
    }
}
