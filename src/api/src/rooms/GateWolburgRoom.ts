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
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";
import { StablesWolburgRoomAlias } from "./StablesWolburgRoom";

export const GateWolburgRoomAlias: string = "souter-gate-wolburg";

export class GateWolburgRoom extends Room {
    public constructor() {
        super(GateWolburgRoomAlias, NavigationActionAlias);
    }

    public name(): string {
        return "Souther Gate";
    }

    public images(): string[] {
        return ["rooms/gate-wolburg.png"];
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
        const room: GateWolburgRoom = new GateWolburgRoom();
        const lastroom: string = getPlayerSession().currentRoom;

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;
        getPlayerSession().lastRoom = lastroom;

        return room.examine();
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You are at the souther gate of the city, passing the gate means the adventure is truly going to start",
            "You feel ready to go on this adventure and rescue the princess.",
        ]);
    }

    public objects(): GameObject[] {
        return [
            this,
            ...getGameObjectsFromInventory(),
            new AlexandraCharacter(),
            new KarasValeTownSquareRoom(),
        ];
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === NavigateBackAlias) {
            const currentRoom: string = playerSession.currentRoom;
            const lastRoom: string = StablesWolburgRoomAlias;
            playerSession.currentRoom = lastRoom;
            playerSession.lastRoom = currentRoom;
            if (
                playerSession.horseMission10 === true ||
                playerSession.horseMission20 === true ||
                playerSession.horseMission30 === true
            ) {
                playerSession.inStables = true;
                playerSession.inGate = false;
                return new TextActionResult([
                    "You went back to the stables, you see that Johan got himself back together.",
                    "After you went away you see that some people came to him to help him.",
                ]);
            }
            playerSession.inStables = true;
            playerSession.inGate = false;
            return new TextActionResult([
                "You went back to the stables, you see that the man in the stables got himself back together.",
                "After you went away you see that some people came to him to help him.",
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
        if (playerSession.currentRoom === GateWolburgRoomAlias) {
            return [ExamineActionAlias];
        }
        return [NavigationActionAlias];
    }
}
