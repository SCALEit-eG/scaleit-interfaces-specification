# Paperless Production

## eLabel REST

### GET /api/data/{id}
Depending on the type of input mask. The already labeled electronic labels will be displayed in the eLabel list. The data is pushed from the LabelList.json.

Cutout of json file:
```json
[
    {
        "Type": "Hersteller",
        "Hersteller": "SCALEit",
        "Produktnummer": "A-11",
        "Seriennummer": "2456-2346-6865",
        "Barcode": "N4610244794813225"
    },
    {
        "Type": "PbL",
        "Artikelnummer": "435352-5234-252",
        "Lagerplatz": "A-12",
        "Vertikal": false,
        "Produktionsversorgungsbereich": "A-TPR-1-12",
        "Barcode": "N4040242129313227"
    }
    ...
]
```

### DELETE /api/data/{type}/{barcode}
Depending on the type of input mask. An entry on the eLabel list will be deleted. The entry will also be deleted from the LabelList.json.

### GET|POST /api/config/pattern
Configuration of the frontend input mask pattern. Depending on the choose of the input mask (Kanban, Kistenbeschriftung, Herstellerauftrag) 

Cutout of json file:
```json
{
  "kanbanAnr": "6-4-3",
  "kanbanLager": "1-2",
  "kanbanProd": "1-3-1-2",
  "Lagerplatznr": "5-3-4",
  ...
}
```

### POST /api/config/input
Edit the description of the input mask

Cutout of json file:
```json
[
  [
    "Artikelnummer",
    "Lagerplatz",
    "Produktionsversorgungsbereich",
    "eLabel Barcode"
  ],
  [
    "Kistennummer",
    "eLabel Barcode"
  ],
  ...
]
```

### GET /api/config/input/{tabNumber}
Retrieve the description of the input mask for the given tab number

### POST /api/data/upload
Upload of the electronic labels

### GET /api/data/download/{type}
Download of the type specific elabels from LabelList.json.

### POST /api/elabel
Sending the information of the input mask to label the electronic labels. Sends the received message with mqtt.

### GET|POST /api/connectivity/mqtt
Configuration of mqtt attributes.

### GET /api/description
Returns the Description.

## Pick-By-Light REST

### GET|POST /api/connectivity/mqtt
Configuration of mqtt attributes.

### GET /api/versions
Get the current app version

### GET /api/status
Get the current app status

### GET /api/app/icon
Returns the icon from the app

### GET /api/description
Returns the Description.

### GET /api/appdcdescription
Returns the Description of the home tab.

### POST /auftragsnummer
Sends a mqtt message which includes the order number to turn all electronic labels leds on.

### POST /sapauftragsnummer
Sends a mqtt message to the DBProxy (communication with SAP).The DBProxy Returns Materialnr. + Stückz. to the mqtt Broker.

### POST /blink
Turns on the electronic labels leds of the eLabel list.

### POST /kanban/blink
Turns on the electronic labels of an order.

### GET|POST /api/data
Endpoints are not in use (can be removed). 

### POST /api/data/upload
Uploads an Auftraege.json file which contains all orders with the article numbers.

Cutout of json file:
```json
[
  {
     "Auftragsnummer": "0000436999",
     "Artikelnummern": [
           "982345-0153-001",
           "215674-1076-742",
           "060892-2076-027",
           "003207-8776-004"
      ]
  },
  {
     "Auftragsnummer": "0000234999",
     "Artikelnummern": [
           "384231-0081-101",
           "759213-0198-027",
           "626111-0032-018"
      ]
  }
  ...
]
```

### GET /api/data/download
Downloading the Auftraege.json file.