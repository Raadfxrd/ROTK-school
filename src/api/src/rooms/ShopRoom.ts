import { Back, NavigateBackAlias } from "../actions/NavigateAction";
import { Navigation, NavigationActionAlias } from "../actions/NavigationAction";
import { PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { BrannCharacter } from "../characters/BrannCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { KarasValeTownSquareRoom, KarasValeTownSquareRoomAlias } from "./KarasValeTownSquareRoom";
import { WolburgRoom, WolburgRoomAlias } from "./WolburgRoom";

export const TunnelWallAliasShopAlias: string = "Shop-room";
export class ShopRoom extends Room implements Navigation {
    public constructor() {
        super(ShopAlias, NavigationActionAlias);
    }
    public name(): string {
        return "Shop";
    }
    public objectActions(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.currentRoom === ShopAlias) {
            return [ExamineActionAlias, PickupActionAlias];
        }
        return [NavigationActionAlias];
    }

    public navigation(): ActionResult | undefined {
        const room: ShopRoom = new ShopRoom();
        const lastroom: string = getPlayerSession().currentRoom;

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;
        getPlayerSession().lastRoom = lastroom;

        return room.examine();
    }
    public images(): string[] {
        return ["rooms/store.png"];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You are now located in the General store."]);
    }
    public actions(): Action[] {
        return [
            new CustomAction("CheckInventoryAlias", "Check Inventory", false),
            new TalkAction(),
            new ExamineAction(),
            new Back(),
        ];
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
