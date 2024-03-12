import { EnterVolo, EnterVoloAlias, NavigateNorthAlias, NavigationNorth } from "../actions/NavigateAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { Drakecharacter } from "../characters/DrakeCharacter";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export let wentGate: boolean = false;
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
        if (playerSession.wentNorth === true) {
            return ["rooms/volodrake.png"];
        }
        return ["rooms/gate.png"];
    }
    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();
        console.log(playerSession);
        if (playerSession.drakeIntro === true) {
            return [new ExamineAction(), new TalkAction(), new EnterVolo()];
        }
        if (wentGate === true) {
            return [new ExamineAction(), new TalkAction()];
        }
        return [new NavigationNorth()];
    }
    public objects(): GameObject[] {
        return [new Drakecharacter()];
    }

    public custom(alias: string, _gameObjects?: GameObject[] | undefined): ActionResult | undefined {
        if (alias === NavigateNorthAlias) {
            wentGate = true;
            console.log(wentGate);
            return new TextAndImageActionResult(
                ["There is a somewhat zasty looking fella infront of u. It appears he is the village chief"],
                ["rooms/volodrake.png"]
            );
        }
        if (alias === EnterVoloAlias) {
            return new TextAndImageActionResult(
                [
                    "The air feels cool, it makes u feel a lil zasty. U see a somewhat aerodynamic person. The name Ronaldo with a 7 is written on his back.",
                ],
                ["rooms/volovillage.png"]
            );
        }
        return undefined;
    }
}
