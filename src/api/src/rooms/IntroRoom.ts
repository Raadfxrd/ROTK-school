import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { getPlayerSession } from "../instances";
import { ThroneRoom } from "./ThroneRoom";

export const IntroRoomAlias: string = "intro-room";

//Picture string so that i can change the scene in the file
let picture: string = "rooms/Kaseon.png";

//continue buttons to get to the next line
let clickedContinue1: boolean = false;
let clickedContinue2: boolean = false;
let clickedContinue3: boolean = false;
let clickedContinue4: boolean = false;
let clickedContinue5: boolean = false;
let clickedContinue6: boolean = false;
let title: string = "Kaseon";

export class IntroRoom extends Room {
    public picture?: string;

    public constructor() {
        super(IntroRoomAlias);
    }
    public name(): string {
        return title;
    }

    public images(): string[] {
        if (
            clickedContinue1 === true ||
            clickedContinue2 === true ||
            clickedContinue3 === true ||
            clickedContinue4 === true ||
            clickedContinue5 === true ||
            clickedContinue6 === true
        ) {
            return [picture];
        }
        return ["rooms/Kaseon.png"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You enter the 'Realm of the Kings'.",
            "In the province 'Kaseon' a new queen is to be crowned in the capital city of 'Wolburg': Queen Eleonora.",
        ]);
    }

    public actions(): Action[] {
        if (clickedContinue1 === true) {
            return [new CustomAction("continue-2", "Continue", false)];
        }
        if (clickedContinue2 === true) {
            return [new CustomAction("continue-3", "Continue", false)];
        }
        if (clickedContinue3 === true) {
            return [new CustomAction("continue-4", "Continue", false)];
        }
        if (clickedContinue4 === true) {
            return [new CustomAction("continue-5", "Continue", false)];
        }
        if (clickedContinue5 === true) {
            return [new CustomAction("continue-6", "Continue", false)];
        }
        if (clickedContinue6 === true) {
            return [new CustomAction("continue-7", "Continue", false)];
        }
        return [new CustomAction("continue-1", "Continue", false)];
    }

    public custom(alias: string, _gameObjects?: GameObject[]): TextActionResult | ActionResult | undefined {
        if (alias === "continue-1") {
            picture = "rooms/Wolburg.png";
            title = "Wolburg";
            this.name();
            this.images();
            clickedContinue1 = true;
            return new TextActionResult([
                "You are 'Arthur', a member of the kingsguard. The other kingsguard members are 'Alexandra', 'Henry' and 'Charles'.",
                "Your duty is to protect the king, and soon the queen.",
            ]);
        }
        if (alias === "continue-2") {
            clickedContinue2 = true;
            clickedContinue1 = false;
            picture = "rooms/throneroom.png";
            title = "Throne Room";
            this.name();
            this.images();
            return new TextActionResult([
                "When a new king or queen gets crowned it is tradition that the old king or queen hands over the crown to the new king or queen",
                "You are standing in the throne room, next to the throne where the king is seated.",
            ]);
        }
        if (alias === "continue-3") {
            clickedContinue3 = true;
            clickedContinue2 = false;
            return new TextActionResult([
                "You notice that it is starting to get really crowded in the throne room.",
                "You reckon it's almost time for the princess to enter the throne room.",
            ]);
        }
        if (alias === "continue-4") {
            clickedContinue3 = false;
            clickedContinue4 = true;
            return new TextActionResult([
                "You spot some people making suspicious hand gestures in the crowd.",
                "You try to take a closer look at the hand signals, but your attention is drawn by the sound of trumpets announcing the princess' arrival.",
            ]);
        }
        if (alias === "continue-5") {
            clickedContinue4 = false;
            clickedContinue5 = true;
            picture = "rooms/princessenteringthroneroom.png";
            this.images();
            return new TextActionResult([
                "You see the princess entering the room, all the attendees of the corronation stand up.",
                "Suddenly, the whole room turns pitch black...",
            ]);
        }
        if (alias === "continue-6") {
            clickedContinue5 = false;
            clickedContinue6 = true;
            picture = "rooms/darkness.png";
            this.images();
            return new TextActionResult([
                "You hear a scream, a woman's scream. Could it be the princess?",
                "You hurry your way through the chaos and panicking townsfolk.",
            ]);
        }
        if (alias === "continue-7") {
            clickedContinue6 = false;
            picture = "rooms/throneroomentrance.png";
            this.objects();
            this.images();
            const room: ThroneRoom = new ThroneRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;
            return new TextActionResult([
                "The darkness vanishes and you see some people running away with the bound princess.",
                "You think about going after them, but they are already too far gone...",
            ]);
        }
        return undefined;
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
