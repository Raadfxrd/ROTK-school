import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../base/helpers";
import { ExampleActionAlias } from "./ExampleAction";
export const CheckInventoryActionAlias: string = "Check Inventory";
export interface CheckInventory {
    CheckInventory(): ActionResult | undefined;
}
export class CheckInventoryAction extends Action {
    public constructor() {
        super(CheckInventoryActionAlias, "Check Inventory", false);
    }
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, ExampleActionAlias)) {
            return castTo<CheckInventory>(gameObject).CheckInventory();
        }

        return undefined;
    }
}
