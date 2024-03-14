import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../base/helpers";

export const UseItemActionAlias: string = "useItem-action";

export interface useItem {
    useItem(): ActionResult | undefined;
}

export class useItemAction extends Action {
    public constructor() {
        super(UseItemActionAlias, "Use item", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, UseItemActionAlias)) {
            return castTo<useItem>(gameObject).useItem();
        }

        return undefined;
    }
}
