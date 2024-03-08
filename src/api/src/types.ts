export type PlayerSession = {
    currentRoom: string;
    lastRoom: string;
    inventory: string[];
    pickedUpRing: boolean;
    knowWhereMapIs: boolean;
    knowLocationLowlands: boolean;
    gold: number;
};
