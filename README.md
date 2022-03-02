# SCALE it Interfaces Specification

All interfaces for the SCALE it platform and apps are documented in this repository. Members of SCALE it eG and associated partners work together to ensure compatibility in the software suite.

## Repository Structure

- README.md: description and general overview
- LICENSE.txt: license agreement
- ./*.md: description of concepts
- &lt;subfolder&gt;/*: specification and interfaces of category
- package.json: Node.js dependency management
- tsconfig.json: TypeScript language configuration
- lib/: library source code
- src/: example programs / demonstrations

## Concepts

Concepts provide general guidelines for the specification of interfaces.

- Architecture
    - Principles (microservices, microfrontends)
- Naming conventions
    - General agreements on symbol and interface names
    - Namespaces

## Categories

Categories name fields of interests in order to separate concerns. They provide a rough architecture with components that express connectors. Some categories may define merely requirements.

Interfaces are assigned to categories. These categories are listed subsequently.

- General interfaces
    - General interfaces of a SCALE it compatible app
    - Must and optional
- Status and notifications
    - General status information
    - Possible states of apps
    - Notification messages
- App orchestration
    - Deployment (install)
    - Orchestration (start / stop / monitoring ...)
    - App Transfer (import / export)
    - Instantiation of App Templates
- Sensors
    - Sensor systems
    - Sensor elements
    - Sensor values and metadata
- Asset management
    - Devices and other physical entities
    - Asset registration
- App management
    - Availability of apps and features
    - Service discovery
- Network
    - Requirements for the network infrastructure
    - Gateway (routing / firewall / DNS)
    - Subnetting
    - VPN
- Security
    - Encryption (communication / storage)
    - AuthN + AuthZ (identification, roles, permissions)
    - Secrets management (passwords, certificates, security tokens)
    - Non-repudiation
    - Availability (load balancing / backups)
- Resource management
    - General provisioning of files in apps
    - Special files / folders and conventions
    - Resources like icons, manuals, tutorial videos
- Editor
    - Editing of available files and resources
- Desktop
    - View and configuration of available apps
    - Starting / stopping of apps
    - Opening of apps
- Dashboard
    - View and configuration of available widgets
    - Categorized by app
- Localisation
    - View of assets, apps on a map
    - Indoor and outdoor localisation
    - Geodata
    - Maps for buildings / facilities, shopfloors
- Data platform
    - Requirements for persistency in apps
- Technology
    - Consideration of specific technologies (Docker, Kubernetes, etc.)
    - Assurance of compatibility

# Contributing

In order to contribute you must adhere to the following principles.

- Use standards for specification of REST APIs, MQTT, Websockets etc.
- Data structures should if possible be defined with TypeScript
- All documentation and symbol names should be in English
- The main branch must be kept clean
    - Feature branches are used by contributors for modifications
    - On agreement these modifications are merged into the main branch
    - Naming convention for feature branches: "company name or team name/spec"

# Conventions

- Naming convention from [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119)

# License

Copyright SCALE it eG
