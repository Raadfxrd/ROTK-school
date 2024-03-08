import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { AlexandraAlias, AlexandraCharacter } from "./characters/AlexandraCharacter";
import { CharlesAlias, CharlesCharacter } from "./characters/CharlesCharacter";
import { eleonorAlias, EleonorCharacter } from "./characters/EleonorCharacter";
import { ExampleCharacter, ExampleCharacterAlias } from "./characters/ExampleCharacter";
import { ExampleItem, ExampleItemAlias } from "./items/ExampleItem";
import { RingItem, RingItemAlias } from "./items/RingItem";
import { MapItem, MapItemAlias } from "./items/MapItem";
import { ExampleRoom, ExampleRoomAlias } from "./rooms/ExampleRoom";
import { KarasValeBlacksmithRoom, KarasValeBlacksmithRoomAlias } from "./rooms/KarasValeBlacksmithRoom";
import { KarasValeTownSquareRoom, KarasValeTownSquareRoomAlias } from "./rooms/KarasValeTownSquareRoom";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { LowLandsRoom, LowLandsRoomAlias } from "./rooms/LowLandsRoom";
import { TunnelItem, TunnelItemAlias } from "./items/TunnelItem";
import { ThroneRoom, ThroneRoomAlias } from "./rooms/ThroneRoom";
import { HenryAlias, HenryCharacter } from "./characters/HenryCharacter";
import { Torch1Item, Torch1ItemAlias } from "./items/Torch1Item";
import { PlayerSession } from "./types";
import { DarkTreesItem, DarkTreesItemAlias } from "./items/DarkTreesItem";
import { AureliusCharacter, AureliusCharacterAlias } from "./characters/AureliusCharacter";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "KVTownSquare",
        inventory: [],
        pickedUpRing: false,
        knowWhereMapIs: false,
        image: "",
        wentNorth: false,
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case ExampleRoomAlias:
            return new ExampleRoom();

        case KarasValeTownSquareRoomAlias:
            return new KarasValeTownSquareRoom();

        case KarasValeBlacksmithRoomAlias:
            return new KarasValeBlacksmithRoom();

        case LowLandsRoomAlias:
            return new LowLandsRoom();

        case ThroneRoomAlias:
            return new ThroneRoom();
    }

    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    switch (alias) {
        case ExampleItemAlias:
            return new ExampleItem();

        case ExampleCharacterAlias:
            return new ExampleCharacter();

        case Torch1ItemAlias:
            return new Torch1Item();

        case DarkTreesItemAlias:
            return new DarkTreesItem();

        case TunnelItemAlias:
            return new TunnelItem();

        case eleonorAlias:
            return new EleonorCharacter();

        case HenryAlias:
            return new HenryCharacter();

        case RingItemAlias:
            return new RingItem();

        case MapItemAlias:
            return new MapItem();

        case AlexandraAlias:
            return new AlexandraCharacter();

        case CharlesAlias:
            return new CharlesCharacter();

        case AureliusCharacterAlias:
            return new AureliusCharacter();

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}
