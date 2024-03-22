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
import { Back, NavigateBackAlias } from "../actions/NavigateAction";
import { NavigationActionAlias } from "../actions/NavigationAction";
import { PickupActionAlias } from "../actions/PickupAction";

export const BlacksmithAlias: string = "BlackSmith-room";
export class BlackSmithRoom extends Room {
    public constructor() {
        super(BlacksmithAlias, NavigationActionAlias);
    }
    public objectActions(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.currentRoom === BlacksmithAlias) {
            return [ExamineActionAlias, PickupActionAlias];
        }
        return [NavigationActionAlias];
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

    public navigation(): ActionResult | undefined {
        const room: BlackSmithRoom = new BlackSmithRoom();
        const lastroom: string = getPlayerSession().currentRoom;

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;
        getPlayerSession().lastRoom = lastroom;

        return room.examine();
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["<CLASH!> You have now entered the Blacksmith"]);
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
            const currentRoom: string = playerSession.currentRoom;
            const lastRoom: string = playerSession.lastRoom;
            playerSession.currentRoom = lastRoom;
            playerSession.lastRoom = currentRoom;
        }
        return undefined;
    }
}
