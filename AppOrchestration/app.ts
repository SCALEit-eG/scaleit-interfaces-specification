/**
 * Represents an app instance
 * at runtime
 */
export class AppInstance{
    App: AppConfig;
    Status?: string;
    Images: Array<DockerImage>;
    Containers: Array<DockerContainer>;
}

/**
 * Basic metadata of an app instance
 */
export class AppConfig{
    Name: string;
    Description?: string;
    Version: string;
    Imported?: Date;
}

/**
 * Makes the id for the app instance
 * @param app app instance config
 * @returns id as string
 */
 export function makeAppId(app: AppConfig): string{
    return `${app.Name}:${app.Version}`;
}

/**
 * Information about a docker container
 */
export class DockerContainer{
    Name: string;
    Id: string;
    ImageId?: string;
    ImageName: string;
    Status: string;
    Running: boolean;
    Created?: Date;
    Started: string;
    PortMappings: Array<string>;
}

/**
 * Information about a docker image
 */
export class DockerImage
{
    Name: string;
    Id?: string;
    Created?: Date;
    Platform?: string;
    Size?: number;
}
