/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ValueOnlySerializationSchema {
    /**
     * This interface was referenced by `ValueOnlySerializationSchema`'s JSON-Schema definition
     * via the `patternProperty` ".*$".
     */
    [k: string]:
      | ValueOnlySerializationSchema
      | (
          | BasicEventValue
          | RangeValue
          | MultiLanguagePropertyValue
          | FileBlobValue
          | (Key[] | string[])
          | RelationshipElementValue
          | AnnotatedRelationshipElementValue
          | EntityValue
          | (string | number | boolean)
        );
  }
  export interface BasicEventValue {
    observed: Key[] | string[];
  }
  export interface Key {
    type: string;
    value: string;
  }
  export interface RangeValue {
    min: number;
    max: number;
  }
  export interface MultiLanguagePropertyValue {
    /**
     * This interface was referenced by `MultiLanguagePropertyValue`'s JSON-Schema definition
     * via the `patternProperty` "^[a-z]{2,4}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?$".
     */
    [k: string]: string;
  }
  export interface FileBlobValue {
    mimeType: string;
    value: string;
  }
  export interface RelationshipElementValue {
    first: Key[] | string[];
    second: Key[] | string[];
  }
  export interface AnnotatedRelationshipElementValue {
    first: Key[] | string[];
    second: Key[] | string[];
    annotation: {
      [k: string]:
        | BasicEventValue
        | RangeValue
        | MultiLanguagePropertyValue
        | FileBlobValue
        | (Key[] | string[])
        | RelationshipElementValue
        | AnnotatedRelationshipElementValue
        | EntityValue
        | (string | number | boolean);
    }[];
  }
  export interface EntityValue {
    statements: {
      [k: string]:
        | BasicEventValue
        | RangeValue
        | MultiLanguagePropertyValue
        | FileBlobValue
        | (Key[] | string[])
        | RelationshipElementValue
        | AnnotatedRelationshipElementValue
        | EntityValue
        | (string | number | boolean);
    };
    entityType: "SelfManagedEntity" | "CoManagedEntity";
    globalAssetId?: Key[] | string[];
    specificAssetIds?: IdentifierKeyValuePairValue[];
  }
  export interface IdentifierKeyValuePairValue {
    /**
     * This interface was referenced by `IdentifierKeyValuePairValue`'s JSON-Schema definition
     * via the `patternProperty` "(.*?)".
     */
    [k: string]: string;
  }
  