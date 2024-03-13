import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { AlexandraAlias, AlexandraCharacter } from "./characters/AlexandraCharacter";
import { CharlesAlias, CharlesCharacter } from "./characters/CharlesCharacter";
import { eleonorAlias, EleonorCharacter } from "./characters/EleonorCharacter";
import { Drakecharacter, DrakecharacterAlias } from "./characters/DrakeCharacter";
import { BobCharacter, BobCharacterAlias } from "./characters/BobCharacter";
import { RingItem, RingItemAlias } from "./items/RingItem";
import { KarasValeBlacksmithRoom, KarasValeBlacksmithRoomAlias } from "./rooms/KarasValeBlacksmithRoom";
import { KarasValeTownSquareRoom, KarasValeTownSquareRoomAlias } from "./rooms/KarasValeTownSquareRoom";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { LowLandsRoom, LowLandsRoomAlias } from "./rooms/LowLandsRoom";
import { TunnelItem, TunnelItemAlias } from "./items/TunnelItem";
import { ThroneRoom, ThroneRoomAlias } from "./rooms/ThroneRoom";
import { HenryAlias, HenryCharacter } from "./characters/HenryCharacter";
import { LowlandsTorch, LowlandsTorchAlias } from "./items/LowlandsTorchItem";
import { VolosVillageRoom, VolosVillageRoomAlias } from "./rooms/VolosVillageRoom";
import { TavernRoom, TavernRoomAlias } from "./rooms/TavernRoom";
import { PlayerSession } from "./types";
import { DarkTreesItem, DarkTreesItemAlias } from "./items/DarkTreesItem";
import { AureliusCharacter, AureliusCharacterAlias } from "./characters/AureliusCharacter";
import { KarasValeForestRoom, KarasValeForestRoomAlias } from "./rooms/KarasValeForestRoom";
import { KVFallenTreesItem, KVFallenTreesItemAlias } from "./items/KVFallenTreeItem";
import { KVForestItem, KVForestItemAlias } from "./items/KVForestItem";
import { KaraWhistleItem, KaraWhistleItemAlias } from "./items/KaraWhistleItem";
import { MapItem, MapItemAlias } from "./items/MapItem";
import { WolburgRoom, WolburgRoomAlias } from "./rooms/WolburgRoom";
import { RichardCharacter, RichardCharacterAlias } from "./characters/RichardCharacter";
import { BlackSmithRoom, BlacksmithAlias } from "./rooms/BlacksmithRoom";
import { IgnisCharacter, IgnisAlias } from "./characters/IgnisCharacter";
import { SwordItemAlias, SwordItem } from "./items/SwordItem";
import { ShopAlias, ShopRoom } from "./rooms/ShopRoom";
import { BrannAlias, BrannCharacter } from "./characters/BrannCharacter";
import { ArmourItem, ArmourItemAlias } from "./items/ArmourItem";
import { battleAxeItem, battleAxeItemAlias } from "./items/battleAxeItem";
import { maceItem, maceItemAlias } from "./items/maceItem";
import { JohanCharacter, JohanCharacterAlias } from "./characters/JohanCharachter";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "Shop-room",
        lastRoom: "",
        inventory: [],
        knowWhereMapIs: false,
        wentNorth: false,
        knowsOfKara: false,
        summonedKara: false,
        knowLocationLowlands: false,
        horseMission10: false,
        horseMission20: false,
        horseMission30: false,
        gold: 0,
        blessing: false,
        shownRing: false,
        shownRingBadEnding: false,
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

        case KarasValeTownSquareRoomAlias:
            return new KarasValeTownSquareRoom();

        case KarasValeBlacksmithRoomAlias:
            return new KarasValeBlacksmithRoom();

        case LowLandsRoomAlias:
            return new LowLandsRoom();

        case ThroneRoomAlias:
            return new ThroneRoom();

        case KarasValeForestRoomAlias:
            return new KarasValeForestRoom();

        case VolosVillageRoomAlias:
            return new VolosVillageRoom();

        case TavernRoomAlias:
            return new TavernRoom();

        case WolburgRoomAlias:
            return new WolburgRoom();
        case BlacksmithAlias:
            return new BlackSmithRoom();
        case ShopAlias:
            return new ShopRoom();
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
        case DrakecharacterAlias:
            return new Drakecharacter();

        case LowlandsTorchAlias:
            return new LowlandsTorch();

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

        case KVFallenTreesItemAlias:
            return new KVFallenTreesItem();

        case KVForestItemAlias:
            return new KVForestItem();

        case KaraWhistleItemAlias:
            return new KaraWhistleItem();
        case RichardCharacterAlias:
            return new RichardCharacter();

        case BobCharacterAlias:
            return new BobCharacter();
        case IgnisAlias:
            return new IgnisCharacter();
        case SwordItemAlias:
            return new SwordItem();
        case BrannAlias:
            return new BrannCharacter();
        case ArmourItemAlias:
            return new ArmourItem();
        case battleAxeItemAlias:
            return new battleAxeItem();
        case maceItemAlias:
            return new maceItem();

        case JohanCharacterAlias:
            return new JohanCharacter();

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
