# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Muhamad",
  "lastName": "Isro",
  "email": "mohammadisro2710@gmail.com",
  "phoneNumber": "085157708597"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhamad",
    "lastName": "Isro",
    "email": "mohammadisro2710@gmail.com",
    "phoneNumber": "085157708597"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid !"
}
```

## Update Contact API

Endpoint : /PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Muhamad",
  "lastName": "Isro",
  "email": "mohammadisro2710@gmail.com",
  "phoneNumber": "085157708597"
}
```

Response Body Success :

```json
{
  "data": {
    "firstName": "Muhamad",
    "lastName": "Isro",
    "email": "mohammadisro2710@gmail.com",
    "phoneNumber": "085157708597"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is invalid !"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhamad",
    "lastName": "Isro",
    "email": "mohammadisro2710@gmail.com",
    "phoneNumber": "085157708597"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found !"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query Params :

- name : search by firstName or lastName, using like query, optional
- email : search by email, using like query, optional
- phoneNumber : search by phoneNumber, using like query, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Muhamad",
      "lastName": "Isro",
      "email": "mohammadisro2710@gmail.com",
      "phoneNumber": "085157708597"
    },
    {
      "id": 2,
      "firstName": "Muhamad",
      "lastName": "Isro",
      "email": "mohammadisro2710@gmail.com",
      "phoneNumber": "085157708597"
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

Response Body Error :

```json
{
  "errors": "Contacts is not found !"
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "Contact is deleted successfully !"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found !"
}
```
