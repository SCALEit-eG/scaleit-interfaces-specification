# Paperless Production

## eLabel REST

### POST /api/data

### GET /api/data/{id}

### DELETE /api/data/{type}/{barcode}

### GET|POST /api/config/pattern
Configuration of the frontend input mask pattern

### POST /api/config/input
Edit the description of the input mask

### GET /api/config/input/{tabNumber}
Retrieve the description of the input mask for the given tab number

### POST /api/data/upload
Upload of the electronic labels

### GET /api/data/download/{type}
Download of the type specific elabels

### POST /api/elabel

### GET|POST /api/connectivity/mqtt
