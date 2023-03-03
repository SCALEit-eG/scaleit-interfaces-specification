export interface LicenceTermEntry{
    /** Name of the field, must be a valid identifier name */
    EntryName: string;
    /** Label for the field */
    Label: {[langId: string]: string};
    /**
     * If this field is set all the other fields are ignored and the value given
     * is submitted. It can be a simple value like a string or boolean or a complex
     * value namely object or array.
     */
    FixValue?: any;
    /**
     * Type of the entry:
     * - text: shows text field for input
     * - number: shows number input field
     * - datetime: shows selection dialogs for date and time, ISO date format string
     * - selection: shows selection dropdown menu
     * - check: Shows a single checkbox resulting in a boolean value
     */
    EntryType: "text" | "number" | "datetime" | "selection" | "check";
    /** contains the value to be submitted */
    Value: string | number | boolean;
    /** Default value to show first and fall back to*/
    Default?: string | number | boolean;
    /** Minimum value for type "number" */
    MinValue?: number;
    /** Maximum value for type "number" */
    MaxValue?: number;
    /** Options for type "selection" */
    Options?: SelectOption[];
    /** Regular expression for type "text" */
    Pattern?: string;
    /** Minimum datetime value, ISO format */
    MinDate?: string;
    /** Maximum datetime value, ISO format */
    MaxDate?: string;
}

export interface SelectOption{
    /** Value to submit if selected */
    Value: string;
    /** Label to display for selection */
    Label: {[langId: string]: string};
}

export const LicenceTerms: LicenceTermEntry[] = [];