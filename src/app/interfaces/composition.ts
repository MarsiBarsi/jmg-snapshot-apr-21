// TODO: Revise this and DTO interfaces
export interface Composition {
    readonly id: string;
    readonly title: string;
    readonly author: string;
    readonly cover: string;
    readonly thumbnail: string;
    readonly uploadedBy: string;
    readonly premium: boolean;
    readonly publicAccess: boolean;
    readonly multi: boolean;
    readonly backingTrack: string;
    readonly buyLink: string;
    readonly youtube: string;
}
