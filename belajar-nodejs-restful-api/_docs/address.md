# Contact API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "country": "Negara",
  "postalCode": "Kode Pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postalCode": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required !"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "country": "Negara",
  "postalCode": "Kode Pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postalCode": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required !"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postalCode": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found !"
}
```

## List Address API

Endpoint : POST /api/contacts/:contactId/addresses/

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postalCode": "Kode Pos"
    },
    {
      "id": 2,
      "street": "Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postalCode": "Kode Pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found !"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "Address is deleted successfully !"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found !"
}
```