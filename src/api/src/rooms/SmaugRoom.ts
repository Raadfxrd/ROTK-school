import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { TalkAction, TalkActionAlias } from "../base/actions/TalkAction";
import { PlayerSession } from "../types";
import { Examine, ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { SmaugCharacter, SmaugProperties } from "../characters/SmaugCharacter";
import { princessCharacter } from "../characters/princessCharacter";
import { deathRoom } from "../rooms/deathRoom";
import { useItemAction } from "../actions/UseItemAction";
import { HealingPotionItem } from "../items/HealingPotionItem";

export const SmaugRoomAlias: string = "Smaug-room";
let image: string = "rooms/smaug.png";

export class SmaugRoom extends Room implements Examine {
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
    public constructor() {
        super(SmaugRoomAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Smaug Chamber";
    }
    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.image = image;
        return [image];
    }
    public objects(): GameObject[] {
        return [new SmaugCharacter(), new princessCharacter(), new HealingPotionItem()];
    }
    public actions(): Action[] {
        return [
            new CustomAction("CheckInventoryAlias", "Check Inventory", false),
            new CustomAction("fightSmaug", "fight Smaug", false),
            new TalkAction(),
            new ExamineAction(),
            new useItemAction(),
        ];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You are now in Smaugs Chamber"]);
    }

    public custom(alias: string, _gameObjects?: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.smaugHP <= 0) {
            image = "rooms/princess.png";
            //setTimeout(iets, 2000);

            return new TextActionResult([
                "You have slain Smaug and freed the princess! You have beaten the game.",
            ]);
        }
        if (playerSession.healthPoints >= 1) {
            if (alias === "fightSmaug") {
                function randomMove(): string {
                    const damage: string = "i did damage";
                    const evade: string = "i evaded";
                    const evadeAndDamage: string = "i evaded and did damage";
                    const getHit: string = "i got hit";
                    const getHitAndDamage: string = "i got hit and did damage";
                    const results: Array<string> = [damage, evade, evadeAndDamage, getHit, getHitAndDamage];
                    const randomIndex: any = Math.floor(Math.random() * results.length);
                    return results[randomIndex];
                }
                const move: string = randomMove();
                if (move === "i did damage") {
                    playerSession.healthPoints -= SmaugProperties.Damage;
                    return new TextActionResult(["<Smaug has damaged you...>"]);
                } else if (move === "i evaded") {
                    return new TextActionResult(["<Smaug has doged your attack...>"]);
                } else if (move === "i evaded and did damage") {
                    playerSession.healthPoints -= SmaugProperties.Damage;
                    return new TextActionResult(["<Smaug has doged your attack and retaliated>"]);
                } else if (move === "i got hit") {
                    playerSession.smaugHP -= 30;
                    return new TextActionResult(["<You have landed a attack on Smaug.>"]);
                } else if (move === "i got hit and did damage") {
                    playerSession.smaugHP -= 30;
                    playerSession.healthPoints -= SmaugProperties.Damage;
                    return new TextActionResult(["You have landed a attack but Smaug retaliated.>"]);
                }
            }
        } else {
            const room: deathRoom = new deathRoom();

            playerSession.currentRoom = room.alias;
            return room.examine();
        }

        if (alias === "CheckInventoryAlias") {
            const playerSession: PlayerSession = getPlayerSession();
            const gameobject: GameObject[] = getGameObjectsFromInventory();
            const gameObjectArray: string[] = [];
            for (let i: number = 0; i < gameobject.length; i++) {
                gameObjectArray.push(gameobject[i].name());
            }
            gameObjectArray.push("Gold amount: " + playerSession.gold);
            return new TextActionResult(gameObjectArray);
        }
        return undefined;
    }
}
