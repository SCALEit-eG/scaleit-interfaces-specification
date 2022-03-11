export interface Position{
    /** image coordinate from left to right or longitude */
    x: number;
    /** image coordinate from top to bottom or latitude */
    y: number;
}

/** Mark on a map */
export interface AppMark{
    /** App or Asset ID */
    Id: string;
    MarkType: "App" | "Asset";
    Position: Position;
}

export interface Map{
    Marks: AppMark[];
}

export interface GeoMap extends Map{
    /** position to center on */
    Start: Position;
    /** defines the visible area in km */
    ViewRadius: number;
}

export interface GraphicsMap extends Map{
    /** unique identification of the map in the app, usually a filepath or URL */
    MapId: string;
    /** original image width in px */
    Width: number;
    /** original image height in px */
    Height: number;
    /** scaled image width in px */
    ScaledWidth: number;
    /** scaled image height in px */
    ScaledHeight: number;
}
