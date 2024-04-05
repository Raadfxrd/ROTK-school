import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const RonaldoCharacteralias: string = "ronaldo";

export class RonaldoCharacter extends Character implements Examine {
    public constructor() {
        super(RonaldoCharacteralias, ExamineActionAlias);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.taylorlikesRonaldo === true) {
            return new TextActionResult([
                "Ronaldo: I have no clue how u did it but i think Taylor see's me standing again!",
                "I want to pay u for all ur troubles... But i dont have the gold! I have an interesting item that may be of some worth! Drake has it now. he will give it to u",
            ]);
        }
        if (playerSession.roseAcquired === true) {
            playerSession.ronaldoGotRose = true;
            return new TalkAndImageActionResult(
                this,
                ["Ronaldo: A red rose? How did u get this? either way with this i can win taylor back!!!"],
                [playerSession.image, "characters/ronaldoo.png"],
                [new TalkChoiceAction(40, "No worrys! I'l tell Taylor to see u.")]
            );
        }
        if (choiceId === 1) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Drake told u? Well.. i long for this girl named Taylor. unknowingly recently she doesnt like me... She took an interest in Edwin! From all people...",
                ],
                [playerSession.image, "characters/ronaldoo.png"],
                [
                    new TalkChoiceAction(2, "Let me see what i can do for you. Do u know what Taylor likes?"),
                    new TalkChoiceAction(3, "This Edwin fella, do u know more about him?"),
                ]
            );
        } else if (choiceId === 3) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Yeah, he is an infamous person. We assume he does illegal trading in our village. He is also very rude.",
                    "I have no clue why Taylor likes him... He must be lying to her in some way?",
                ],
                [playerSession.image, "characters/ronaldoo.png"],
                [new TalkChoiceAction(4, "I see... Il try to see what he is plotting. ")]
            );
        } else if (choiceId === 2) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Yeah, she always talks about how beautifull red roses are!. These roses are really expensive... And the only place they grow, is full of monsters!",
                ],
                [playerSession.image, "characters/ronaldoo.png"],
                [
                    new TalkChoiceAction(
                        4,
                        "I see... I will try to give u what it takes to make Taylor yours again!"
                    ),
                ]
            );
        } else if (choiceId === 4) {
            playerSession.ronaldoIntro = true;
            return new TextActionResult(["I trust you"]);
        }
        return new TalkAndImageActionResult(
            this,
            ["I assume drake let u in? What do u want..."],
            [playerSession.image, "characters/ronaldoo.png"],
            [new TalkChoiceAction(1, "Yeah, he sent me. And i am going to help you heal your heart ")]
        );
    }

    public name(): string {
        return "ronaldo";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["There seems to be a sad warrior."]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
