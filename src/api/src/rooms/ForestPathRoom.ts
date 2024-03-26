import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { RingItemAlias } from "../items/RingItem";
import { PlayerSession } from "../types";
import { useItemAction } from "../actions/UseItemAction";
import { AttackAction } from "../actions/AttackAction";

export const ForestPathRoomAlias: string = "forest-path-room";

export class ForestPathRoom extends Room {
    public constructor() {
        super(ForestPathRoomAlias);
    }
    public name(): string {
        return "Forest Path";
    }

    public images(): string[] {
        return ["rooms/.png"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        let actions: Action[] = [];

        if (playerSession.inCombat === true) {
            actions = [
                new ExamineAction(),
                new AttackAction(),
                new PickupAction(),
                new CustomAction("inventory", "Inventory", false),
            ];
        } else {
            actions = [
                new ExamineAction(),
                new TalkAction(),
                new PickupAction(),
                new useItemAction(),
                new CustomAction("inventory", "Inventory", false),
            ];
        }

        return actions;
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        return objects;
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes(RingItemAlias)) {
            return new TextActionResult([
                "The throne room of Wolburg in castle Ferdinand.",
                "The people in the Throneroom have been calmed down now.",
                "Besides of the ring laying on the ground before there is nothing more to see here.",
            ]);
        } else {
            return new TextActionResult([
                "You look at the spot where the princess was last seen, There is something shining on the ground.",
                "It looks like a small circular object, maybe from the kidnappers that grabbed the princess.",
            ]);
        }
    }

    public custom(_alias: string, _gameObjects?: GameObject[]): TextActionResult | ActionResult | undefined {
        return undefined;
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
