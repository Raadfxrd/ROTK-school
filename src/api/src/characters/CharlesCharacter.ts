import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { RingItemAlias } from "../items/RingItem";
import { SwordOfGoodFortuneItemAlias } from "../items/SwordOfGoodFortuneItem";
import { PlayerSession } from "../types";

export const CharlesAlias: string = "Charles-character";

export class CharlesCharacter extends Character implements Examine {
    public constructor() {
        super(CharlesAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Charles";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const charlesImage: string = "characters/Charles.png";
        return new TextAndImageActionResult(
            [
                "An old man known as Charles the Wise, he has a hat which reasembles him as a wizard.",
                "He wears blue robes, wears a white shirt underneath the robes and wears some white trousers.",
                "Besides knowing that he is a bit on the older side he still looks like a fit man",
            ],
            [playerSession.image, charlesImage]
        );
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const charlesImage: string = "characters/Charles.png";

        if (_choiceId === 1) {
            return new TextAndImageActionResult(
                [
                    "Charles: I have heard of these bandits before, most of the time they don't agree with something.",
                    "Might have something to do with our kingdom but I can't think what they are thinking of course.",
                    "If you can find someone from them please don't initiate a fight instantly, talk with them",
                    "Hope we can find the princess soon...",
                ],
                [playerSession.image, charlesImage]
            );
        } else if (_choiceId === 2) {
            return new TextAndImageActionResult(
                [
                    "Charles: Bandits are most of the time not the cleanest ones so they must have left something",
                ],
                [playerSession.image, charlesImage]
            );
        } else if (_choiceId === 3) {
            return new TextAndImageActionResult(
                [
                    "Charles: I am not an explorer myself and unforunately don't know what this sigil on the ring is...",
                    "Ask Alexandra or Eleonor, they probably know more about this.",
                ],
                [playerSession.image, charlesImage]
            );
        } else if (_choiceId === 4) {
            return new TextAndImageActionResult(
                [
                    "Charles: I must stay here to protect the city for any more danger. You never what the enemy has in their plans",
                    "I wish you and Alexandra good fortune, go save that princess.",
                ],
                [playerSession.image, charlesImage]
            );
        } else if (_choiceId === 5) {
            return new TextAndImageActionResult(
                [
                    "Charles: No problem young traveler.",
                    "I wish you and Alexandra good fortune, go save that princess.",
                ],
                [playerSession.image, charlesImage]
            );
        } else if (_choiceId === 6) {
            const playerSession: PlayerSession = getPlayerSession();

            playerSession.inventory.push(SwordOfGoodFortuneItemAlias);

            return new TextAndImageActionResult(
                [
                    "Charles: I can give you this sword i have, I don't use it because I am a wizard of course.",
                    "Take good care of it and use it wisely.",
                    "*You obtained 'The sword of good fortune'*",
                ],
                [playerSession.image, charlesImage]
            );
        }

        let choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Can I gain some of your wisdom of what is happening?"),
            new TalkChoiceAction(2, "Not yet, I'll look further"),
        ];

        if (playerSession.inventory.includes(RingItemAlias)) {
            choiceActions.push(new TalkChoiceAction(3, "I have found a ring."));
        }

        if (playerSession.knowLocationLowlands === true) {
            choiceActions = [
                new TalkChoiceAction(4, "Can't you join me on the mission?"),
                new TalkChoiceAction(5, "Thanks for your help charles."),
                new TalkChoiceAction(6, "Do you have any advice for the mission?"),
            ];
        }
        return new TalkAndImageActionResult(
            this,
            ["Charles: Things happened so quickly, have you found something?"],
            [playerSession.image, charlesImage],
            choiceActions
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
