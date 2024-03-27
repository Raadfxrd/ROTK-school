import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const MountainsMapItemAlias: string = "mountains-map-item";

export class MountainsMapItem extends Item implements Examine {
    public constructor() {
        super(MountainsMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Mountains Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at the grey area on the map.",
                "It is a big area with a lot of hills and mountains.",
                "You see some houses were built high on top of the hills, perhaps to avoid floodings.",
            ],
            ["rooms/MountainMap.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
