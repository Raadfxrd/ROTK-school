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
import { RichardCharacter } from "../characters/RichardCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { ChurchWolburgRoom } from "./ChurchWolburgRoom";
import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";
import { ThroneRoom } from "./ThroneRoom";

export const WolburgRoomAlias: string = "wolburg-room";

let image: string = "rooms/WolburgCity.png";
let inStables: boolean = false;
let inGate: boolean = false;

export class WolburgRoom extends Room {
    public constructor() {
        super(WolburgRoomAlias);
    }

    public name(): string {
        return "Wolburg";
    }

    public images(): string[] {
        return [image];
    }

    public actions(): Action[] {
        if (inStables === true) {
            return [
                new ExamineAction(),
                new TalkAction(),
                new CustomAction("inventory", "Inventory", false),
                new CustomAction("souther-gate", "Gate", false),
                new CustomAction("back", "Back", false),
            ];
        }
        if (inGate === true) {
            return [
                new ExamineAction(),
                new TalkAction(),
                new CustomAction("inventory", "Inventory", false),
                new CustomAction("karas-vale", "Kara's Vale", false),
                new CustomAction("back-gate", "Back", false),
            ];
        }
        return [
            new ExamineAction(),
            new TalkAction(),
            new CustomAction("inventory", "Inventory", false),
            new CustomAction("stablesAlias", "Stables", false),
            new CustomAction("church", "Church", false),
            new CustomAction("back-throneroom", "Back", false),
        ];
    }

    public examine(): ActionResult | undefined {
        if (inStables === true) {
            return new TextActionResult([
                "The stables of Wolburg.",
                "Usually there are horses here but as of right now it is completely empty.",
                "You see the Stablekeeper crying on the ground, he looks like he is hurt.",
            ]);
        }
        if (inGate === true) {
            return new TextActionResult([
                "You are at the souther gate of the city, passing the gate means the adventure is truly going to start",
                "You feel ready to go on this adventure and rescue the princess.",
            ]);
        }
        return new TextActionResult([
            "The City Wolburg, it is really lively out in town. You see some people further at the stable that were in trouble. Maybe another clue?",
            "There are some buildings nearby like houses, a church, a tavern and a blacksmith.",
        ]);
    }

    public objects(): GameObject[] {
        if (inStables === true) {
            return [this, ...getGameObjectsFromInventory(), new AlexandraCharacter(), new JohanCharacter()];
        }
        if (inGate === true) {
            return [this, ...getGameObjectsFromInventory(), new AlexandraCharacter()];
        }
        return [this, ...getGameObjectsFromInventory(), new AlexandraCharacter(), new RichardCharacter()];
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "stablesAlias") {
            inStables = true;
            image = "rooms/stableWolburg.png";
            return new TextActionResult([
                "The stables of Wolburg.",
                "Usually there are horses here but as of right now it is completely empty.",
                "You see the Stablekeeper crying on the ground, he looks like he is hurt.",
            ]);
        }
        if (alias === "back") {
            inStables = false;
            image = "rooms/WolburgCity.png";
        }
        if (alias === "back-throneroom") {
            const lastroom: WolburgRoom = new WolburgRoom();
            const room: ThroneRoom = new ThroneRoom();

            //Set the current room to the example room
            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        if (alias === "inventory") {
            const playerSession: PlayerSession = getPlayerSession();
            const gameobject: GameObject[] = getGameObjectsFromInventory();
            const gameObjectArray: any[] = [];
            for (let i: number = 0; i < gameobject.length; i++) {
                gameObjectArray.push(gameobject[i].name());
            }
            gameObjectArray.push("Gold amount: " + playerSession.gold);
            return new TextActionResult(gameObjectArray);
        }
        if (alias === "church") {
            const lastroom: WolburgRoom = new WolburgRoom();
            const room: ChurchWolburgRoom = new ChurchWolburgRoom();

            //Set the current room to the example room
            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        if (alias === "souther-gate") {
            inGate = true;
            inStables = false;
            image = "rooms/gate-wolburg.png";
            this.images();
            return new TextActionResult([
                "You are at the souther gate of the city, passing the gate means the adventure is truly going to start",
                "You feel ready to go on this adventure and rescue the princess.",
            ]);
        }
        if (alias === "back-gate") {
            const playerSession: PlayerSession = getPlayerSession();
            if (
                playerSession.horseMission10 === true ||
                playerSession.horseMission20 === true ||
                playerSession.horseMission30 === true
            ) {
                inStables = true;
                inGate = false;
                image = "rooms/stableWolburg.png";
                return new TextActionResult([
                    "You went back to the stables, you see that Johan got himself back together.",
                    "After you went away you see that some people came to him to help him.",
                ]);
            }
            inStables = true;
            inGate = false;
            image = "rooms/stableWolburg.png";
            return new TextActionResult([
                "You went back to the stables, you see that the man in the stables got himself back together.",
                "After you went away you see that some people came to him to help him.",
            ]);
        }
        if (alias === "karas-vale") {
            const lastroom: WolburgRoom = new WolburgRoom();
            const room: KarasValeTownSquareRoom = new KarasValeTownSquareRoom();

            //Set the current room to the example room
            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        return undefined;
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
