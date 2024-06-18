# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "Roozy",
  "password": "rahasia",
  "name": "Muhamad Isro Sabanur"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "Roozy",
    "name": "Muhamad Isro Sabanur",
    "token" : "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "Roozy",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "These credentials is not match with our records !"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body :

```json
{
  "name": "Roozy Updated", // optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "Roozy Updated",
    "name": "Muhamad Isro Sabanur"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name max length 100 characters"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "Roozy",
    "name": "Muhamad Isro Sabanur"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized !"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized !"
}
```
