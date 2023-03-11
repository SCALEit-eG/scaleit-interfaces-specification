# Asset Identification

Globally unique identifiers of assets, shells and submodels.

## Hierarchical URIs

A versatile and illustrative strategy is to form hierarchical URIs. One URN should always be given in order to identify an asset independent from location and access protocol. Location specific URLs can be provided as alternative IDs.

Schema:
```
<id> ::= <schema> <sep> <parts>
<schema> ::= urn | <url_schema>
<url_schema> ::= <protocol> ://
<protocol> ::= http | https | mqtt | mqtts | ws | wss | ftp | ssh | ...
<sep> ::= ":" | "/"
<parts> ::= {<part> <sep>}* <part>
<part> ::= <specific_string>
```

An Id should be a proper URI, either URN or URL, that consists of an arbitrary number of segments that are strings which must conform to the restrictions of the respective URI type.

Recommendations for the construction of the URI parts:
```
general: <org> {<unit>}* aas (assets | shells | sms) (types | instances | templates) <path_segment> {<path_segment>}*
    [{<submodel_name>} <instance_name> | <type_name> | <template_name>]
asset types: urn:<org>:{<unit>:}*:aas:assets:types:<path_segment>:{<path_segment>:}*:<type_name>
asset instances: urn:<org>:{<unit>:}*:aas:assets:instances:<path_segment>:{<path_segment>:}*:<instance_name>
shells for asset types: urn:<org>:{<unit>:}*:aas:shells:types:<path_segment>:{<path_segment>:}*:<type_name>
shells for asset instances: urn:<org>:{<unit>:}*:aas:shells:instances:<path_segment>:{<path_segment>:}*:<instance_name>
submodel templates: urn:<org>:{<unit>:}*:aas:sms:templates:<path_segment>:{<path_segment>:}*:<template_name>
submodel instances: urn:<org>:{<unit>:}*:aas:sms:instances:<path_segment>:{<path_segment>:}*:<submodel_name>:<instance_name>
```

The unit and path segment parts of the URI provide mechanisms to arbitrarily nest the IDs in order to assign the entities to namespaces.
