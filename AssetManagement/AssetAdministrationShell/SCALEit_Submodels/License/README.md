# Submodel: License

A digital license represents an item that gives specific rights to use software. This submodel provides properties to cryptografically secure a license with a signature. A license includes order information because it is a result of a purchase.

## Specifications

Submodel semantic ID: urn:scale-it.org:sdm4fzi:aas:sms:templates:orchestration:license

## Properties

See [License.ts](License.ts)

- "AppBinding" and "DeviceBinding" allow bindings of the license to a specific environment
- LicenseTerms: arbitrary conditions are allowed
- "OrderId" and "LicenseNumber" serve to uniquely identify the license

