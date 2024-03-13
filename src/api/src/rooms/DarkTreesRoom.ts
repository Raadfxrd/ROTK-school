import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { DarkTreesItem } from "../items/DarkTreesItem";
import { PickupAction } from "../actions/PickupAction";

export const DarkTreesRoomAlias: string = "darktrees-room";
let picture: string = "darktrees";

export class DarkTreesRoom extends Room {
    public constructor() {
        super("darktrees");
    }

    public name(): string {
        return "Ominous Trees";
    }

    public images(): string[] {
        return [picture];
    }

    public actions(): Action[] {
        return [
            new CustomAction("storage", "Inventory", false),
            new ExamineAction(),
            new PickupAction(),
            new CustomAction("move", "Navigate", false),
        ];
    }

    public objects(): GameObject[] {
        return [this, new DarkTreesItem()];
    }

    public examine(): ActionResult | undefined {
        picture = "rooms/darktree.png";
        return new TextActionResult([
            "The trees loom ominously, their branches like twisted arms.",
            "You take a closer look at the trees.",
            "The bark is dark and rough, and the leaves are a sickly green.",
            "You feel a shiver run down your spine, yet you can't look away.",
            "You try reading what is written on the bark.",
        ]);
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
