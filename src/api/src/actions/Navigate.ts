import { ActionResult } from "../base/actionResults/ActionResult";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";
import { Action } from "../base/actions/Action";

export const NavigationActionsAlias: string = "NavigateAction";

export interface Navigate {
    navigate(navigateId?: number): ActionResult | undefined;
}
export class NavigationActions extends Action {
    public constructor() {
        super(NavigationActionsAlias, "Go North", false);
    }

    public static handle(gameObject: GameObject, navigateId?: number): ActionResult | undefined {
        if (implementsInterface(gameObject, NavigationActionsAlias)) {
            return castTo<Navigate>(gameObject).navigate(navigateId);
        }
        return undefined;
    }

    public NavigationActions(): Action[] {
        return [new CustomAction("Navigate-North", "Go North", false)];
    }
}
