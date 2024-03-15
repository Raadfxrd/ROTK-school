import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { Examine, ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { MarkCharacter } from "../characters/MarkCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { WolburgRoom } from "./WolburgRoom";

export const ChurchWolburgRoomAlias: string = "church-wolburg-room";

export class ChurchWolburgRoom extends Room implements Examine {
    public constructor() {
        super(ChurchWolburgRoomAlias);
    }

    public name(): string {
        return "Church Wolburg";
    }

    public images(): string[] {
        return ["rooms/churchwolburg.png"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new CustomAction("go-back", "Go Back", false)];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new MarkCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You enter the holy church of Wolburg.",
            "There is a godly statue on the end of the room. You know that this statue is the god Pelor.",
            "Pelor is known as the god of sun and healing.",
            "The church is pretty empty, there is only a few people inside.",
        ]);
    }

    public custom(alias: string, _gameObjects?: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "go-back") {
            const lastroom: ChurchWolburgRoom = new ChurchWolburgRoom();
            const room: WolburgRoom = new WolburgRoom();

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
