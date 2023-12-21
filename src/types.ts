export interface MissionData {
    pk: number
    mission_set: number
    name: string
    objectives: string
    reward: number
    order: number
}
export interface MissionDataPlus extends MissionData {
    state: MissionState
}

export interface MissionSetData {
    pk: number
    name: string
    image_url: string

    order: number
}

export interface RawItemData {
    pk: number
    name: string
    cost: number
}
export interface ItemData extends RawItemData {
    missions: number
    wouldGive: number
}

export interface MissionItemData {
    mission: number
    item: number
    any: boolean
    group: number | null
}

export enum MissionState {
    Ready, //all requirements met
    Blocked, // all requirements met but an earlier locked mission is blocking it
    PartlyLocked, //some requirements met
    Locked, //no requirements met
}
export enum LocalStorageVars {
    Bookmarks = 'bookmarks',
    Items = 'items',
    Reserve = 'reserve',
}
export type MapId = number
export type MissionSetId = number
export type MissionId = number
export type ItemId = number
export type MissionOrder = number
export const bareFn = () => {}
