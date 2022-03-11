# App Orchestration

## Transfer Technology

**POST /api/{version}/transfer/import**\
import an app instance or template as ZIP archive

**GET /api/{version}/transfer/export/{id}**\
export an specific app instance or template as ZIP archive

**GET /api/{version}/transfer/apps**\
**GET /api/{version}/transfer/apps/{id}**\
**DELETE /api/{version}/transfer/apps/{id}**\
retrieve apps and information and delete an app

**PUT /api/{version}/transfer/apps/{id}/start**\
**PUT /api/{version}/transfer/apps/{id}/stop**\
**GET /api/{version}/transfer/apps/{id}/logs**\
orchestrate apps

**GET /api/{version}/transfer/templates**\
**GET /api/{version}/transfer/templates/{id}**\
**DELETE /api/{version}/transfer/templates/{id}**\
manage app templates

**POST /api/{version}/transfer/templates/{id}/instantiate**\
start the app instantiation process

**SSE /api/{version}/transfer/templates/{id}/build**\
execute the build process and finish it on success; gives incremental feedback

SSE channels:
- status
- progress
- failure

### App Instance

An app instance is represented as a ZIP archive with the following structure:
- config.yml
- docker-compose.yml
- icon.{svg|png|jpg}?
- README.md?
- docker/?
    - {image}.{tar|tgz|tar.gz}

Through the docker-compose.yml it is possible to orchestrate the app. Docker images need to be available when the app starts and may be retrievable on the server the Docker runs and thus they are optional. It must not contain a **build context**.

### App Template Image

The structure from *App Instance* is inherited with the following additions:
- docker-compose-build.yml

It should contain a build context so that **docker-compose build** can be run on the template in order to create an App Instance. The files required in the build context must be provided as well.

## App ID

For an instance of the Transfer App the uniqueness of an App Instance is guaranteed by the combination of **Name** and **Version**.

ID := {Name}:{Version}
