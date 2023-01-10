import { AssetInfo } from "../AssetManagement/AssetInfo";

export interface Address {
    PostalCode?: string;
    City?: string;
    State?: string;
    Country?: string;
    Location?: string;
    Building?: string;
    Room?: string;
}

export abstract class Identity extends AssetInfo {
    abstract get IdentityType(): string;
    Name?: string;
    Roles?: string[];
    Email?: string;
    Address?: Address;
    Groups?: string[];
}

export class PersonIdentity extends Identity {
    get IdentityType(): string {
        return "Person";
    }
}

export class OrganisationIdentity extends Identity {
    get IdentityType(): string {
        return "Organisation";
    }
}

export class MachineIdentity extends Identity {
    get IdentityType(): string {
        return "Machine";
    }
}