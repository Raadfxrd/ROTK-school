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
import { RichardCharacter } from "../characters/RichardCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { BlackSmithRoom } from "./BlacksmithRoom";
import { ChurchWolburgRoom } from "./ChurchWolburgRoom";
import { ShopRoom } from "./ShopRoom";
import { StablesWolburgRoom } from "./StablesWolburgRoom";
import { ThroneRoom } from "./ThroneRoom";

export const WolburgRoomAlias: string = "wolburg-room";

export class WolburgRoom extends Room {
    public constructor() {
        super(WolburgRoomAlias);
    }

    public name(): string {
        return "Wolburg";
    }

    public images(): string[] {
        return ["rooms/WolburgCity.png"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new CustomAction("inventory", "Inventory", false),
            new NavigationAction(),
            new CustomAction("back", "Back", false),
        ];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.knowLocationLowlands === false) {
            return new TextActionResult([
                "You run after the kidnappers and you enter the city Wolburg. It is really lively out in town and you see the kidnappers run towards the stables.",
                "On their way to the stables they knock someone down and run further.",
            ]);
        }
        return new TextActionResult([
            "The City Wolburg, it is really lively out in town. You see some people further at the stable that were in trouble. Maybe another clue?",
            "There are some buildings nearby like houses, a church, a tavern and a blacksmith.",
        ]);
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.knowLocationLowlands === false) {
            return [
                this,
                ...getGameObjectsFromInventory(),
                new RichardCharacter(),
                new ChurchWolburgRoom(),
                new StablesWolburgRoom(),
                new ShopRoom(),
                new BlackSmithRoom(),
            ];
        }
        return [
            this,
            ...getGameObjectsFromInventory(),
            new AlexandraCharacter(),
            new RichardCharacter(),
            new ChurchWolburgRoom(),
            new StablesWolburgRoom(),
            new ShopRoom(),
            new BlackSmithRoom(),
        ];
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "back") {
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
        return undefined;
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
