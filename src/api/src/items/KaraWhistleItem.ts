import { UseItemActionAlias, useItem } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { KarasValeForestRoomAlias } from "../rooms/KarasValeForestRoom";
import { PlayerSession } from "../types";

export const KaraWhistleItemAlias: string = "KaraWhistle";

export class KaraWhistleItem extends Item implements Examine, useItem {
    public constructor() {
        super(KaraWhistleItemAlias, ExamineActionAlias, UseItemActionAlias);
    }

    public PlayerSession: PlayerSession = getPlayerSession();

    public name(): string {
        return "Whistle";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It is a small whistle with an image of a crow etched into it."]);
    }

    public useItem(): ActionResult | undefined {
        if (this.PlayerSession.currentRoom === KarasValeForestRoomAlias) {
            this.PlayerSession.summonedKara = true;
        }

        if (this.PlayerSession.summonedKara === true) {
            return new TextAndImageActionResult(
                ["*First you hear the cracking of the trees, then a giant crow appears in front of you*"],
                ["rooms/Kara.png"]
            );
        }

        return new TextActionResult([
            "*You blow the whistle, it creates a hard to hear high pitched sound.*",
        ]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, UseItemActionAlias];
    }
}
