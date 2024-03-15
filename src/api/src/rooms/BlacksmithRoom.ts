import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { IgnisCharacter } from "../characters/IgnisCharacter";
import { TalkAction } from "../base/actions/TalkAction";
import { PlayerSession } from "../types";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { PickupActionAlias } from "../actions/PickupAction";
import { Back, NavigateBackAlias } from "../actions/NavigateAction";
import { KarasValeTownSquareRoom, KarasValeTownSquareRoomAlias } from "./KarasValeTownSquareRoom";
import { WolburgRoomAlias, WolburgRoom } from "./WolburgRoom";

export const BlacksmithAlias: string = "BlackSmith-room";
export class BlackSmithRoom extends Room {
    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
    public constructor() {
        super(BlacksmithAlias);
    }
    public name(): string {
        return "BlackSmith";
    }
    public images(): string[] {
        return ["rooms/BlackSmith.png"];
    }
    public objects(): GameObject[] {
        return [this, new IgnisCharacter()];
    }
    public actions(): Action[] {
        return [
            new CustomAction("CheckInventoryAlias", "Check Inventory", false),
            new TalkAction(),
            new Back(),
        ];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["<CLASH!> You have now entered the Blacksmith."]);
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
        if (alias === NavigateBackAlias) {
            const playerSession: PlayerSession = getPlayerSession();
            playerSession.currentRoom = playerSession.lastRoom;
            if (playerSession.lastRoom === WolburgRoomAlias) {
                const room: WolburgRoom = new WolburgRoom();
                return room.examine();
            } else if (playerSession.lastRoom === KarasValeTownSquareRoomAlias) {
                const room: KarasValeTownSquareRoom = new KarasValeTownSquareRoom();
                return room.examine();
            }
        }
        return undefined;
    }
}
