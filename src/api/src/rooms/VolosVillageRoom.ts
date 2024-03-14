import {
    EnterVolo,
    EnterVoloAlias,
    LeaveVolo,
    LeaveVoloAlias,
    NavigateNorthAlias,
    NavigationNorth,
} from "../actions/NavigateAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { Drakecharacter } from "../characters/DrakeCharacter";
import { RonaldoCharacter } from "../characters/RonaldoCharacter";
import { Taylorcharacter } from "../characters/TaylorCharacter";
import { getPlayerSession } from "../instances";
import { secondMedalionHalfItem } from "../items/SecondMedalionHalfItem";
import { PlayerSession } from "../types";
import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";
export let wentGate: boolean = false;
export let wentVolo: boolean = false;
export const VolosVillageRoomAlias: string = "Volo's-Village";
export class VolosVillageRoom extends Room {
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You arrived at the gate of Volo's Village",
            "There is an eery aura around the gate",
        ]);
    }

    public constructor() {
        super(VolosVillageRoomAlias);
    }
    public playerSession: PlayerSession = getPlayerSession();

    public name(): string {
        return "Volo's Village";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.leftVolo === true) {
            return ["rooms/vologate.png"];
        }
        if (wentVolo === true) {
            return ["rooms/volovillage.png"];
        }
        return ["rooms/vologate.png"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();
        console.log(playerSession);
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

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.leftVolo === true) {
            return [new secondMedalionHalfItem()];
        }
        if (playerSession.taylorlikesRonaldo === true) {
            return [new RonaldoCharacter(), new Drakecharacter()];
        }
        if (playerSession.ronaldoIntro === true) {
            return [new RonaldoCharacter(), new Taylorcharacter()];
        }
        if (wentVolo === true) {
            return [new RonaldoCharacter()];
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
                "I have 2 pieces of the medalion now, i assume this will come in handy when ariving at the lowlands...",
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
            console.log(wentGate);
            return new TextActionResult([
                "There is a somewhat zasty looking fella infront of u. It appears he is the village chief",
            ]);
        }
        if (alias === EnterVoloAlias) {
            wentVolo = true;
            wentGate = false;
            return new TextAndImageActionResult(
                [
                    "The air feels cool, it makes u feel a lil zasty. U see a somewhat aerodynamic person. The name Ronaldo with a 7 is written on his back.",
                ],
                ["rooms/volovillage.png"]
            );
        }
        return undefined;
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
