/** Software that has identifiable parts and can be deployed */
export interface App {
    /** Parts of the software */
    Components: ComponentReference[];
}

/** Component reference in an app */
export interface ComponentReference {
    /** Global Id of the app component */
    ComponentId: string;
    /**
     * Id of the component in the scope of the app,
     * needed if the global component Id occurs more
     * than once in the same app
     */
    LocalId?: string;
}