export interface Settings {
    readonly vocalEffect: boolean;
    readonly effects: boolean;
    readonly alteredLayout: boolean;
    readonly fingers: boolean;
    readonly offset: number;
    readonly lyricsTop: boolean;
    readonly leftHand: boolean;
    readonly rightHand: boolean;
    readonly speed: Record<string, number>;
    readonly transposition: Record<string, number>;
}
