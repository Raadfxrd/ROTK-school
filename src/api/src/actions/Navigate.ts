import { ActionResult } from "../base/actionResults/ActionResult";
import { CustomAction } from "../base/actions/CustomAction";
import { Action } from "../base/actions/Action";

export const NavigationActionsAlias: string = "Navigate-North";

export interface Navigate {
    navigate(): ActionResult | undefined;
}

export class NavigationActions extends Action {
    public constructor() {
        super(NavigationActionsAlias, "Go North", false);
    }

    public NavigationActions(): Action[] {
        return [new CustomAction("Navigate-North", "Go North", false)];
    }
}
