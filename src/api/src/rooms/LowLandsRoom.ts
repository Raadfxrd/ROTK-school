import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";

export const LowLandsRoomAlias: string = "lowlands";

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
            new CustomAction("bushes", "Look in the bushes", false),
        ];
    }

    public objects(): GameObject[] {
        return [this];
    }

    public examine = (): ActionResult | undefined => {
        return new TextActionResult(["You are in the LowLands.", "It is a empty and gloomy place."]);
    };

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "inside") {
            return new TextActionResult(["You try to go inside the tunnel, but it's too dark."]);
        }
        if (alias === "bushes") {
            return new TextActionResult(["You look in the bushes and find a puzzle."]);
        }
        return undefined;
    }
}
