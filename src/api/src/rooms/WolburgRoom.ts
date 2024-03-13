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
import { ThroneRoom } from "./ThroneRoom";

export const WolburgRoomAlias: string = "wolburg-room";

let image: string = "rooms/WolburgCity.png";
let inStables: boolean = false;

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
            return [new ExamineAction(), new TalkAction(), new CustomAction("back", "Back", false)];
        }
        return [
            new ExamineAction(),
            new TalkAction(),
            new CustomAction("stablesAlias", "Stables", false),
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
        return new TextActionResult([
            "The City Wolburg, it is really lively out in town. You see some people further at the stable that were in trouble. Maybe another clue?",
            "There are some buildings nearby like houses, a church, a tavern and a blacksmith.",
        ]);
    }

    public objects(): GameObject[] {
        if (inStables === true) {
            return [this, ...getGameObjectsFromInventory(), new AlexandraCharacter(), new JohanCharacter()];
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

        return undefined;
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
