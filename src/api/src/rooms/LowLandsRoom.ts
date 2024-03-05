import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { Torch1Item } from "../items/Torch1Item";
import { DarkTreesItem } from "../items/DarkTreesItem";
import { TunnelItem } from "../items/TunnelItem";

export const LowLandsRoomAlias: string = "lowlands-room";
let picture: string = "lowlands";

export class LowLandsRoom extends Room {
    public constructor() {
        super("lowlands");
    }

    public name(): string {
        return "LowLands";
    }

    public images(): string[] {
        return [picture, "darktree", "tunnel"];
    }

    public actions(): Action[] {
        return [
            new CustomAction("storage", "Inventory", false),
            new ExamineAction(),
            new CustomAction("back", "Navigate", false),
        ];
    }

    public objects(): GameObject[] {
        return [this, new Torch1Item(), new DarkTreesItem(), new TunnelItem()];
    }

    public examine = (): ActionResult | undefined => {
        picture = "lowlands";
        return new TextActionResult(["You are in the LowLands.", "It is a dark and gloomy place."]);
    };
}
