import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { HealingPotionAlias } from "../items/HealingPotionItem";
import { HolyBibleAlias } from "../items/HolyBibleItem";
import { MysteriousPaintingAlias } from "../items/MysteriousPaintingItem";
import { SpiderEyeAlias } from "../items/SpiderEyeItem";
import { PlayerSession } from "../types";

export const BrannAlias: string = "Brann";
export class BrannCharacter extends Character implements Examine {
    public constructor() {
        super(BrannAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Brann";
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a storemanager in his element!"]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (_choiceId === 5) {
            if (playerSession.gold >= 12) {
                playerSession.gold -= 12;
                playerSession.inventory.push(HealingPotionAlias);
                return new TextActionResult([
                    "*Hands over potion of healing* There you go. This should help you in times of need. But don't drink too much or you will start to see things.",
                ]);
            } else if (playerSession.gold <= 12) {
                return new TextActionResult(["You dont have enough money..."]);
            }
        }
        if (_choiceId === 6) {
            if (playerSession.gold >= 8) {
                playerSession.gold -= 8;
                playerSession.inventory.push(HolyBibleAlias);
                return new TextActionResult([
                    "*SABATON- The Last Stand starts playing* This book will keep you safe from all evil this world contains. Blessings upon thee.",
                ]);
            } else if (playerSession.gold <= 8) {
                return new TextActionResult(["You dont have enough money..."]);
            }
        }
        if (_choiceId === 7) {
            if (playerSession.gold >= 7) {
                playerSession.gold -= 7;
                playerSession.inventory.push(SpiderEyeAlias);
                return new TextActionResult([
                    "*Hands over Spider eye* Here, this is used mostly for brewings and potions. However I have seen them being used for other meanings as well.",
                ]);
            } else if (playerSession.gold <= 7) {
                return new TextActionResult(["You dont have enough money..."]);
            }
        }
        if (_choiceId === 8) {
            if (playerSession.gold >= 6) {
                playerSession.gold -= 6;
                playerSession.inventory.push(MysteriousPaintingAlias);
                return new TextActionResult([
                    "A nice painting painted by an ancient sorcerer long ago. it is believed this painting holds secrets.",
                ]);
            } else if (playerSession.gold <= 6) {
                return new TextActionResult(["You dont have enough money..."]);
            }
        }

        if (_choiceId === 1) {
            return new TalkActionResult(
                this,
                ["I sell a wide range of products aquired from all around the Realm. Have a look!"],
                [
                    new TalkChoiceAction(5, "Healing potion(12G)"),
                    new TalkChoiceAction(6, "Holy bible(8G)"),
                    new TalkChoiceAction(7, "Spider eye(2G)"),
                    new TalkChoiceAction(8, "Mysterious painting(6G)"), // schrijf code maake daadwerkelijke items.
                ]
            );
        }
        if (_choiceId === 2) {
            return new TextActionResult([
                "That old fart you mean! I don't like him. He has betrayed me too many times...",
            ]);
        }
        if (_choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "Woah! That's an authentic ring from the infamous LowLands! It is a group ring worn by bandits. How did you get this?",
                ],
                [
                    new TalkChoiceAction(9, "Ask about where to find the LowLands"),
                    new TalkChoiceAction(
                        10,
                        "I found it on the ground after someone dropped it in the throne room."
                    ),
                    new TalkChoiceAction(11, "What do you think this ring is worth?"),
                ]
            );
        }
        if (_choiceId === 4) {
            return new TalkActionResult(
                this,
                ["That depends are you willing to pay a price?(5G)"],
                [new TalkChoiceAction(12, "Yes!"), new TalkChoiceAction(13, "No...")]
            );
        }
        if (_choiceId === 9) {
            return new TextActionResult([
                "If you wish to go to the LowLands jead South, you will know when you have arrived. Though I wouldn't recommend going there...",
            ]);
        }
        if (_choiceId === 10) {
            return new TextActionResult(["Hmm interesting..."]);
        }
        if (_choiceId === 11) {
            return new TalkActionResult(
                this,
                [
                    "I can't tell you how much its worth exactly, you would need an expert... However i will give you 33 gold for it.",
                ],
                [
                    new TalkChoiceAction(14, "Take the offer"),
                    new TalkChoiceAction(15, "Kindly decline the offer"),
                ]
            );
        }
        if (_choiceId === 12) {
            if (playerSession.gold >= 5) {
                playerSession.gold -= 5;
                return new TextActionResult([
                    "Take a look inside that barrel over there. It contains the torch you are looking for.",
                ]); //maak code met een barrel die je kan inspecten.
            } else if (playerSession.gold <= 5) {
                return new TextActionResult(["You dont have enough money..."]);
            }
        }
        if (_choiceId === 13) {
            return new TextActionResult(["Fine, then my secrets will stay with me."]);
        }
        if (_choiceId === 14) {
            return new TextActionResult(["Alright! Thank you. I always wanted a ring from the lowlands."]); //voeg code toe om ring te verwijderen uit inv.
        }
        if (_choiceId === 15) {
            return new TextActionResult(["Fine... I dint want it anyways."]);
        }

        return new TalkActionResult(
            this,
            ["Greetings stranger, we have all the items you need."],
            [
                new TalkChoiceAction(1, "What items do you sell?"),
                new TalkChoiceAction(2, "Ask about Ignis"),
                new TalkChoiceAction(3, "Show Ring to Brann"),
                new TalkChoiceAction(4, "Do you know where I can find a torch?"),
            ]
        );
    }
}
