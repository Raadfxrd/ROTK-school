import { Back, NavigateBackAlias } from "../actions/NavigateAction";
import { NavigationAction, NavigationActionAlias } from "../actions/NavigationAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { AlexandraCharacter } from "../characters/AlexandraCharacter";
import { JohanCharacter } from "../characters/JohanCharachter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { GateWolburgRoom } from "./GateWolburgRoom";
import { WolburgRoomAlias } from "./WolburgRoom";
export const StablesWolburgRoomAlias: string = "stables-wolburg-room";

export class StablesWolburgRoom extends Room {
    public constructor() {
        super(StablesWolburgRoomAlias, NavigationActionAlias);
    }

    public name(): string {
        return "Stables Wolburg";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        const stablesWolburg: string = "rooms/stableWolburg.png";
        playerSession.image = stablesWolburg;
        return [stablesWolburg];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new CustomAction("inventory", "Inventory", false),
            new NavigationAction(),
            new Back(),
        ];
    }

    public navigation(): ActionResult | undefined {
        const room: StablesWolburgRoom = new StablesWolburgRoom();
        const lastroom: string = getPlayerSession().currentRoom;

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;
        getPlayerSession().lastRoom = lastroom;

        return room.examine();
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.knowLocationLowlands === false) {
            return new TextActionResult([
                "The stables of Wolburg.",
                "You see the kidnappers take the horses from the stablekeeper. If you are fast enough you can get to the gate before they can get on their horses.",
                "On the other side you see the stablekeeper on the ground. He looks like he is in pain.",
            ]);
        }
        return new TextActionResult([
            "The stables of Wolburg.",
            "Usually there are horses here but as of right now it is completely empty.",
            "You see the Stablekeeper crying on the ground, he looks like he is hurt.",
        ]);
    }

    public objects(): GameObject[] {
        return [
            this,
            ...getGameObjectsFromInventory(),
            new AlexandraCharacter(),
            new JohanCharacter(),
            new GateWolburgRoom(),
        ];
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === NavigateBackAlias) {
            const currentRoom: string = playerSession.currentRoom;
            const lastRoom: string = WolburgRoomAlias;
            playerSession.currentRoom = lastRoom;
            playerSession.lastRoom = currentRoom;
            return new TextActionResult([
                "The City Wolburg, it is really lively out in town. You see some people further at the stable that were in trouble. Maybe another clue?",
                "There are some buildings nearby like houses, a church, a tavern and a blacksmith.",
            ]);
        }
        if (alias === "inventory") {
            const gameobject: GameObject[] = getGameObjectsFromInventory();
            const gameObjectArray: any[] = [];
            for (let i: number = 0; i < gameobject.length; i++) {
                gameObjectArray.push(gameobject[i].name());
            }
            gameObjectArray.push("Gold amount: " + playerSession.gold);
            return new TextActionResult(gameObjectArray);
        }
        return undefined;
    }

    public objectActions(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.currentRoom === StablesWolburgRoomAlias) {
            return [ExamineActionAlias];
        }
        return [NavigationActionAlias];
    }
}
