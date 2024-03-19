import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { UseItemActionAlias, useItem } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const ChainmailArmourOfTheGreatItemAlias: string = "chainmail-armour-of-the-great-item";

export class ChainmailArmourOfTheGreatItem extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(ChainmailArmourOfTheGreatItemAlias, ExamineActionAlias, PickupActionAlias, UseItemActionAlias);
    }

    public name(): string {
        return "Chainmail Armour of the Great";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This piece of armour will win you more battles because of its sturdiness.",
            "Equipping it will give you an extra bonus to your Armour Class. (+2)",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(ChainmailArmourOfTheGreatItemAlias)) {
            playerSession.inventory.push(ChainmailArmourOfTheGreatItemAlias);
            return new TextActionResult(["You picked up the Chainmail Armour of the Great"]);
        }
        return undefined;
    }

    public useItem(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.equipment.includes(ChainmailArmourOfTheGreatItemAlias)) {
            console.log(playerSession.armourClass);
            playerSession.equipment.push(ChainmailArmourOfTheGreatItemAlias);
            playerSession.armourClass += 2;
            console.log(playerSession.armourClass);
            return new TextActionResult([
                "You equipped the Chainmail Armour of the Great",
                "You feel a bit more clumsy but you feel a lot bigger and stronger...",
            ]);
        }
        return new TextActionResult(["You already equipped the armour set"]);
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias, UseItemActionAlias];
    }
}
