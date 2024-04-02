import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const VolosVillageMapItemAlias: string = "volosvillage-map-item";

export class VolosVillageMapItem extends Item implements Examine {
    public constructor() {
        super(VolosVillageMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Volo's Village Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at Volo's Village.",
                "It is a big town in the middle of the province.",
                "There is a path going through the town.",
            ],
            ["rooms/VolosVillage.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
