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
    Blocked, // no outstanding requirements but an earlier locked mission is blocking it
    PartlyLocked,
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

export const voidFn = () => {}
