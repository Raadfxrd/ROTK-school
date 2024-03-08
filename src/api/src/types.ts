export type PlayerSession = {
    currentRoom: string;
    lastRoom: string;
    inventory: string[];
    pickedUpRing: boolean;
    knowWhereMapIs: boolean;
    image: string;
    wentNorth: boolean;
    knowLocationLowlands: boolean;
    gold: number;
};
