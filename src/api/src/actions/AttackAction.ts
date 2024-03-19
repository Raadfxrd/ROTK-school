import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../base/helpers";
import { ExampleActionAlias } from "./ExampleAction";

export const AttackActionAlias: string = "attack-action";

export interface Attack {
    Attack(): ActionResult | undefined;
}
export class AttackAction extends Action {
    public constructor() {
        super(AttackActionAlias, "Attack", false);
    }
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, ExampleActionAlias)) {
            return castTo<Attack>(gameObject).Attack();
        }

        return undefined;
    }
}
