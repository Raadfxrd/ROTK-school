import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { LowlandsTorch } from "../items/LowlandsTorchItem";
import { DarkTreesItem } from "../items/DarkTreesItem";
import { TunnelItem } from "../items/TunnelItem";
import { PickupAction } from "../actions/PickupAction";

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
        return [picture];
    }

    public actions(): Action[] {
        return [
            new CustomAction("storage", "Inventory", false),
            new ExamineAction(),
            new CustomAction("back", "Navigate", false),
            new PickupAction(),
        ];
    }

    public objects(): GameObject[] {
        return [this, new LowlandsTorch(), new DarkTreesItem(), new TunnelItem()];
    }

    public examine = (): ActionResult | undefined => {
        picture = "rooms/lowlands.png";
        return new TextActionResult([
            "You are in the LowLands.",
            "The trees are dark and the air is heavy.",
            "You can see a small tunnel in the middle.",
            "You can see a torch on the ground a bit further away.",
        ]);
    };

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
