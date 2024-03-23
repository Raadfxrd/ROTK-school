import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { TalkAction, TalkActionAlias } from "../base/actions/TalkAction";
import { PlayerSession } from "../types";
import { Examine, ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Back, NavigateBackAlias } from "../actions/NavigateAction";
import { KarasValeTownSquareRoom, KarasValeTownSquareRoomAlias } from "./KarasValeTownSquareRoom";
import { WolburgRoomAlias, WolburgRoom } from "./WolburgRoom";
import { SmaugCharacter } from "../characters/SmaugCharacter";
import { princessCharacter } from "../characters/princessCharacter";

export const SmaugRoomAlias: string = "Smaug-room";

export class SmaugRoom extends Room implements Examine {
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
    public constructor() {
        super(SmaugRoomAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Smaug Chamber";
    }
    public images(): string[] {
        return ["rooms/smaug.png"];
    }
    public objects(): GameObject[] {
        return [new SmaugCharacter(), new princessCharacter()];
    }
    public actions(): Action[] {
        return [
            new CustomAction("CheckInventoryAlias", "Check Inventory", false),
            new TalkAction(),
            new Back(),
            new ExamineAction(),
        ];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You are now in Smaugs Chamber"]);
    }

    public custom(alias: string, _gameObjects?: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.strength >= 14) {
            if (alias === "Kill") {
            }
        }
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
