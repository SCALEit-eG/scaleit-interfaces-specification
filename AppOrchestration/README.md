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