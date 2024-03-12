import { PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { BrannCharacter } from "../characters/BrannCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const ShopAlias: string = "Shop-room";
export class ShopRoom extends Room {
    public constructor() {
        super(ShopAlias);
    }
    public name(): string {
        return "Shop";
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
    public images(): string[] {
        return ["rooms/store.png"];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You are now located in the General store."]);
    }
    public actions(): Action[] {
        return [new CustomAction("CheckInventoryAlias", "Check Inventory", false), new TalkAction()];
    }
    public objects(): GameObject[] {
        return [this, new BrannCharacter()];
    }
    public custom(alias: string, _gameObjects?: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "CheckInventoryAlias") {
            const playerSession: PlayerSession = getPlayerSession();
            const gameobject: GameObject[] = getGameObjectsFromInventory();
            const gameObjectArray: string[] = [];
            for (let i: number = 0; i < gameobject.length; i++) {
                gameObjectArray.push(gameobject[i].name());
            }
            gameObjectArray.push("Gold amount: " + playerSession.gold);
            return new TextActionResult(gameObjectArray);
        }
        return undefined;
    }
}
