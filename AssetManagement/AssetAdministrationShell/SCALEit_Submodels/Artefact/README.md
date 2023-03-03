# Submodel: Artefact

Base information about a software artefact which means in terms of software orchestration something executable that can be stored. Different types of artefacts will have their additional submodels to include type specific information. 

## Specifications

Submodel semantic ID: urn:scale-it.org:sdm4fzi:aas:sms:templates:orchestration:artefact

## Properties

See [Artefact.ts](Artefact.ts)

- ArtefactType: identifier for the type of artefact
- "Fingerprints" and "Signatures" serve security purposes to protect against malware
- Resources: enables to reference further files and artefacts needed in conjunction with the asset 