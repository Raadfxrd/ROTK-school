import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../base/helpers";

export const NavigationActionAlias: string = "navigation-action";

export interface Navigation {
    navigation(): ActionResult | undefined;
}

export class NavigationAction extends Action {
    public constructor() {
        super(NavigationActionAlias, "Navigate", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, NavigationActionAlias)) {
            return castTo<Navigation>(gameObject).navigation();
        }

        return undefined;
    }
}
