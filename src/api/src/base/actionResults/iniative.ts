// aantal entities
const Arthur: string = "Arthur";
const Smaug: string = "Smaug";
const Owlbear: string = "Owlbear";

const entities: Array<string> = [Arthur, Smaug, Owlbear];

function rollDice(): void {
    for (let i: number = 0; i < entities.length; i++) {
        const variabele: string = entities[i];
        console.log(variabele);
    }
}
const opslaan: any = rollDice();
console.log(opslaan);
