import { NavigateBlacksmithAlias, NavigateShopRoomAlias } from "../actions/NavigateAction";
import { NavigationAction } from "../actions/NavigationAction";
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
import { BlackSmithRoom } from "./BlacksmithRoom";
import { ChurchWolburgRoom } from "./ChurchWolburgRoom";
import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";
import { ShopRoom } from "./ShopRoom";
import { ThroneRoom } from "./ThroneRoom";

export const WolburgRoomAlias: string = "wolburg-room";

let image: string = "rooms/WolburgCity.png";

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
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inStables === true) {
            return [
                new ExamineAction(),
                new TalkAction(),
                new CustomAction("inventory", "Inventory", false),
                new CustomAction("souther-gate", "Gate", false),
                new CustomAction("back", "Back", false),
            ];
        }
        if (playerSession.inGate === true) {
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
            new NavigationAction(),
        ];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.inStables === true) {
            return new TextActionResult([
                "The stables of Wolburg.",
                "Usually there are horses here but as of right now it is completely empty.",
                "You see the Stablekeeper crying on the ground, he looks like he is hurt.",
            ]);
        }
        if (playerSession.inGate === true) {
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
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inStables === true) {
            return [this, ...getGameObjectsFromInventory(), new AlexandraCharacter(), new JohanCharacter()];
        }
        if (playerSession.inGate === true) {
            return [this, ...getGameObjectsFromInventory(), new AlexandraCharacter()];
        }
        return [
            this,
            ...getGameObjectsFromInventory(),
            new AlexandraCharacter(),
            new RichardCharacter(),
            new ShopRoom(),
            new ChurchWolburgRoom(),
            new BlackSmithRoom(),
        ];
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (alias === "stablesAlias") {
            playerSession.inStables = true;
            image = "rooms/stableWolburg.png";
            return new TextActionResult([
                "The stables of Wolburg.",
                "Usually there are horses here but as of right now it is completely empty.",
                "You see the Stablekeeper crying on the ground, he looks like he is hurt.",
            ]);
        }
        if (alias === "back") {
            playerSession.inStables = false;
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
        if (alias === NavigateShopRoomAlias) {
            const room: ShopRoom = new ShopRoom();
            const lastRoom: WolburgRoom = new WolburgRoom();

            //Set the current room to the example room
            getPlayerSession().lastRoom = lastRoom.alias;
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        if (alias === NavigateBlacksmithAlias) {
            const room: BlackSmithRoom = new BlackSmithRoom();
            const lastRoom: WolburgRoom = new WolburgRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;
            getPlayerSession().lastRoom = lastRoom.alias;

            return room.examine();
        }
        if (alias === "souther-gate") {
            playerSession.inGate = true;
            playerSession.inStables = false;
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
                playerSession.inStables = true;
                playerSession.inGate = false;
                image = "rooms/stableWolburg.png";
                return new TextActionResult([
                    "You went back to the stables, you see that Johan got himself back together.",
                    "After you went away you see that some people came to him to help him.",
                ]);
            }
            playerSession.inStables = true;
            playerSession.inGate = false;
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
