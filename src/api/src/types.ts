export type PlayerSession = {
    currentRoom: string;
    lastRoom: string;
    inventory: string[];
    knowWhereMapIs: boolean;
    wentNorth: boolean;
    knowLocationLowlands: boolean;
    gold: number;
};
