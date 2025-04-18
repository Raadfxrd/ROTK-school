import {
    EnterVolo,
    EnterVoloAlias,
    LeaveVolo,
    LeaveVoloAlias,
    NavigateNorthAlias,
    NavigationNorth,
} from "../actions/NavigateAction";
import { NavigationActionAlias } from "../actions/NavigationAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { BrannCharacter } from "../characters/BrannCharacter";
import { Drakecharacter } from "../characters/DrakeCharacter";
import { EdwinCharacter } from "../characters/EdwinCharacter";
import { RonaldoCharacter } from "../characters/RonaldoCharacter";
import { Taylorcharacter } from "../characters/TaylorCharacter";
import { getPlayerSession } from "../instances";
import { VolosTorch } from "../items/VolosVillageTorchItem";
import { PlayerSession } from "../types";
import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";

export let wentGate: boolean = false;
export let wentVolo: boolean = false;
export const VolosVillageRoomAlias: string = "VolosVillage";

export class VolosVillageRoom extends Room {
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You arrived at the gate of Volo's Village",
            "There is an eery aura around the gate",
        ]);
    }

    public constructor() {
        super(VolosVillageRoomAlias, NavigationActionAlias);
    }

    public playerSession: PlayerSession = getPlayerSession();

    public name(): string {
        return "Volo's Village";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.leftVolo === true) {
            playerSession.image = "rooms/vologate.png";
            return ["rooms/vologate.png"];
        }
        if (wentVolo === true) {
            playerSession.image = "rooms/volovillage.png";
            return ["rooms/volovillage.png"];
        }
        playerSession.image = "rooms/vologate.png";
        return ["rooms/vologate.png"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.leftVolo === true) {
            return [new ExamineAction(), new CustomAction("back-karas", "Back", false)];
        }
        if (playerSession.secondMedalionHalf === true) {
            return [new ExamineAction(), new TalkAction(), new LeaveVolo()];
        }
        if (wentVolo === true) {
            return [new ExamineAction(), new TalkAction()];
        }
        if (playerSession.drakeIntro === true) {
            return [new ExamineAction(), new TalkAction(), new EnterVolo()];
        }
        if (wentGate === true) {
            return [new ExamineAction(), new TalkAction()];
        }

        return [new NavigationNorth(), new CustomAction("back-karas", "Back", false)];
    }

    public navigation(): ActionResult | undefined {
        const room: VolosVillageRoom = new VolosVillageRoom();
        const lastroom: string = getPlayerSession().currentRoom;

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;
        getPlayerSession().lastRoom = lastroom;

        return room.examine();
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.leftVolo === true) {
            return [new VolosTorch()];
        }
        if (playerSession.taylorlikesRonaldo === true) {
            return [new RonaldoCharacter(), new Drakecharacter(), new BrannCharacter()];
        }
        if (playerSession.ronaldoIntro === true) {
            return [new Taylorcharacter(), new EdwinCharacter(), new BrannCharacter()];
        }
        if (wentVolo === true) {
            return [new RonaldoCharacter(), new BrannCharacter()];
        }
        return [new Drakecharacter()];
    }

    public custom(alias: string, _gameObjects?: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (alias === LeaveVoloAlias) {
            playerSession.leftVolo = true;
            wentGate = false;
            wentVolo = false;

            return new TextActionResult([
                "I have some sort of weird torch, i assume this will come in handy when ariving in the lowlands...",
            ]);
        }
        if (alias === "back-karas") {
            const lastroom: VolosVillageRoom = new VolosVillageRoom();
            const room: KarasValeTownSquareRoom = new KarasValeTownSquareRoom();

            //Set the current room to the example room
            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        if (alias === NavigateNorthAlias) {
            wentGate = true;
            return new TextActionResult(["There seems to be a person infront of a gate"]);
        }
        if (alias === EnterVoloAlias) {
            wentVolo = true;
            wentGate = false;
            return new TextAndImageActionResult(
                ["The air feels cool. U see a sad knight sitting in the village center."],
                ["rooms/volovillage.png"]
            );
        }
        return undefined;
    }
    public objectActions(): string[] {
        if (this.playerSession.currentRoom === VolosVillageRoomAlias) {
            return [ExamineActionAlias];
        }
        return [NavigationActionAlias];
    }
}
