import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";
import { ActionResult } from "../base/actionResults/ActionResult";
import { CheckInventoryAction } from "../actions/CheckInventoryAction";
import { Action } from "../base/actions/Action";

export const BlacksmithAlias: string = "BlackSmith-room";
export class BlackSmithRoom extends Room {
    public constructor() {
        super(BlacksmithAlias);
    }
    public name(): string {
        return "BlackSmith";
    }
    public images(): string[] {
        return ["rooms/BlackSmith.png"];
    }
    public actions(): Action[] {
        return [new CheckInventoryAction()];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["<CLASH!> You have now entered the Blacksmith"]);
    }
    public CheckInventory(): ActionResult | undefined {
        return new TextActionResult(["inventory"]);
    }
}
