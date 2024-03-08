import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { AlexandraCharacter } from "../characters/AlexandraCharacter";
import { CharlesCharacter } from "../characters/CharlesCharacter";
import { EleonorCharacter } from "../characters/EleonorCharacter";
import { HenryCharacter } from "../characters/HenryCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { RingItem, RingItemAlias } from "../items/RingItem";
import { MapItem, MapItemAlias } from "../items/MapItem";
import { PlayerSession } from "../types";
import { WolburgRoom } from "./WolburgRoom";

export const ThroneRoomAlias: string = "throne-room";

//Picture string so that i can change the scene in the file
let picture: string = "rooms/Kaseon.png";

//continue buttons to get to the next line
let clickedContinue1: boolean = false;
let clickedContinue2: boolean = false;
let clickedContinue3: boolean = false;
let clickedContinue4: boolean = false;
let clickedContinue5: boolean = false;
let clickedContinue6: boolean = false;
let clickedContinue7: boolean = false;
let title: string = "Kaseon";

export class ThroneRoom extends Room {
    public picture?: string;

    public constructor() {
        super(ThroneRoomAlias);
    }
    public name(): string {
        return title;
    }

    public images(): string[] {
        return [picture];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        const actions: Action[] = [new ExamineAction(), new TalkAction(), new PickupAction()];
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
        if (playerSession.knowLocationLowlands === true) {
            actions.push(new CustomAction("wolburg", "Go Outside", false));
        }
        if (clickedContinue7 === true) {
            return actions;
        }
        return [new CustomAction("continue-1", "Continue", false)];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(RingItemAlias)) {
            objects.push(new RingItem());
        }

        if (playerSession.knowWhereMapIs === true && !playerSession.inventory.includes(MapItemAlias)) {
            objects.push(new MapItem());
        }

        objects.push(
            new HenryCharacter(),
            new EleonorCharacter(),
            new AlexandraCharacter(),
            new CharlesCharacter()
        );
        return objects;
    }

    public examine(): ActionResult | undefined {
        if (!clickedContinue7) {
            picture = "rooms/Kaseon.png";
            this.images();
            return new TextActionResult([
                "You enter the world of 'Realm of the Kings'",
                "In the province, 'Kaseon', There will be the crowning in the city 'Wolburg' of a new queen, queen 'Eleonora'",
            ]);
        } else {
            return new TextActionResult(["You look around in the spot where the princess was last seen"]);
        }
    }

    public custom(alias: string, _gameObjects?: GameObject[]): TextActionResult | ActionResult | undefined {
        if (alias === "continue-1") {
            picture = "rooms/Wolburg.png";
            title = "Wolburg";
            this.name();
            this.images();
            clickedContinue1 = true;
            return new TextActionResult([
                "You are a kingsguard member named 'Arthur'. The other kingsguard members are 'Alexandra', 'Henry' and 'Charles'",
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
                "When a new king or queen gets crowned it is tradition to let the old king or queen give the crown over to the new king or queen",
                "You are standing in the throne room and you are next to the throne where the king sits on.",
            ]);
        }
        if (alias === "continue-3") {
            clickedContinue3 = true;
            clickedContinue2 = false;
            return new TextActionResult([
                "You notice that it is getting really crowded in the throne room",
                "You think that it is almost time for the princess to enter the throne room",
            ]);
        }
        if (alias === "continue-4") {
            clickedContinue3 = false;
            clickedContinue4 = true;
            return new TextActionResult([
                "You spot some people making hand signals in the crowd",
                "You try to take a closer look at the hand signals but only a moment goes by and you hear the trumpets which means the princess is coming.",
            ]);
        }
        if (alias === "continue-5") {
            clickedContinue4 = false;
            clickedContinue5 = true;
            picture = "rooms/princessenteringthroneroom.png";
            this.images();
            return new TextActionResult([
                "You see the princess entering the room, all the people stand up for the princess.",
                "Suddenly, all you can see is total darkness...",
            ]);
        }
        if (alias === "continue-6") {
            clickedContinue5 = false;
            clickedContinue6 = true;
            picture = "rooms/darkness.png";
            this.images();
            return new TextActionResult([
                "You hear the screaming of someone, a woman scream. Was it the princess?",
                "You hurry your way through the chaos of all the folk panicking.",
            ]);
        }
        if (alias === "continue-7") {
            clickedContinue6 = false;
            clickedContinue7 = true;
            picture = "rooms/throneroomentrance.png";
            this.objects();
            this.images();
            return new TextActionResult([
                "The darkness vanishes and you see some people running away with the princess tied up.",
                "You think about going after them but they are already too far gone...",
            ]);
        }
        if (alias === "wolburg") {
            const lastroom: ThroneRoom = new ThroneRoom();
            const room: WolburgRoom = new WolburgRoom();

            //Set the current room to the example room
            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        return undefined;
    }
}
