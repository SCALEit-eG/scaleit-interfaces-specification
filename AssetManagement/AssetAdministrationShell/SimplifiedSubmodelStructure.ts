export interface SimplifiedSubmodelStructure {
    [idShort: string]: {
        [langKey: string]: string
    } | number | any;
}