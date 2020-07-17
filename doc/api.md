### Testing with api using curl

``` ruby
user = User.where(email: 'john@example.com').first
auth_token = user.authentication_token
```

In the following examples replace the `auth_token` value with the value derived in the above step when appropriate.

## Admin

### Login

```
curl -v                                      \
     -X POST                                 \
     -H "Accept: application/json"           \
     -H "Content-type: application/json"     \
     -d '{"username": "root", "password": "mypassword"}' \
     http://localhost:3000/api/v1/admin/sessions
```

```
Status: 200

{
  auth_token: "aYrUiKbHeFeMnKwUgJUB5Q=="
}
```
OR

```
Status: 401
```

### Visits Filter 

```
curl -v                                       \
     -H "X-Auth-Token: aYrUiKbHeFeMnKwUgJUB5Q=="  \
     -H "Accept: application/json"            \
     -H "Content-type: application/json"      \
     http://localhost:3000/api/v1/admin/visits?visitable_id=ewrewrew&visitable_type=Merchant&from=21-05-2020&to=30-06-2020
```

### Search for a user

```
curl -v                                       \
     -H "X-Auth-Token: aYrUiKbHeFeMnKwUgJUB5Q=="  \
     -H "Accept: application/json"            \
     -H "Content-type: application/json"      \
     http://localhost:3000/api/v1/admin/users?phone=1234567890&age=34
```

```
{
  users: [
    {id: 10},
    {id: 20}
  ]
}
```

### RouteMap for a user

```
curl -v                                       \
     -H "X-Auth-Token: aYrUiKbHeFeMnKwUgJUB5Q=="  \
     -H "Accept: application/json"            \
     -H "Content-type: application/json"      \
     http://localhost:3000/api/v1/admin/users/:user_id/routemap?from=21-05-2020&to=30-06-2020
```

```
[
  {
    entry_at: "10:10:00 22-05-2020",
    exit_at: "11:00:00 22-05-2020",
    visitable: {
      type: "Merchant",
      id: "dsfgdfgfd",
      name: "Lakeshore Hospital",
      phone: "1233214567",
      address: "Madavana, Maradu PO, 682023"
    }
  }
]
```

---

## Visits

### Log a new visit

```
curl -v                                      \
     -X POST                                 \
     -H "X-Auth-Token: pFfxLhBgvnoYeXnbDnFL" \
     -H "Accept: application/json"           \
     -H "Content-type: application/json"     \
     -d '{"visitable_id":"3sds324234", visitable_type: "Merchant"}' \
     http://localhost:3000/api/v1/visits
```

### Get all visits of a user (most recent one first)

```
curl -v                                       \
     -H "X-Auth-Token: pFfxLhBgvnoYeXnbDnFL"  \
     -H "Accept: application/json"            \
     -H "Content-type: application/json"      \
     http://localhost:3000/api/v1/visits
```

### Get ongoing visits of a user (most recent one first)

```
curl -v                                       \
     -H "X-Auth-Token: pFfxLhBgvnoYeXnbDnFL"  \
     -H "Accept: application/json"            \
     -H "Content-type: application/json"      \
     http://localhost:3000/api/v1/visits/ongoing
```

### Mark exit on an ongoing visit

```
curl -v                                      \
     -X PUT                                 \
     -H "X-Auth-Token: pFfxLhBgvnoYeXnbDnFL" \
     -H "Accept: application/json"           \
     -H "Content-type: application/json"     \
     -d '{"visitable_id":"3sds324234", visitable_type: "Merchant"}' \
     http://localhost:3000/api/v1/visits/:visit_id/exit
```


### Update user information

Using `wrap_parameters`.

```
curl -v                                      \
     -X PUT                                  \
     -H "X-Auth-Token: pFfxLhBgvnoYeXnbDnFL" \
     -H "Accept: application/json"           \
     -H "Content-type: application/json"     \
     -d '{"first_name":"Johnny"}'            \
     http://localhost:3000/api/v1/users/john@example.com
```

Without using `wrap_parameters`.

```
curl -v                                       \
     -X PUT                                   \
     -H "X-Auth-Token: pFfxLhBgvnoYeXnbDnFL"  \
     -H "Accept: application/json"            \
     -H "Content-type: application/json"      \
     -d '{"user":{"first_name":"Johnny"}}'    \
     http://localhost:3000/api/v1/users/john@example.com
```

#### Deleting a user

```
curl -v                                      \
     -X DELETE                               \
     -H "X-Auth-Token: jz_sPhqn-8jySr_72Ehj" \
     -H "Accept: application/json"           \
     -H "Content-type: application/json"     \
     http://localhost:3000/api/v1/users/john@example.com
```

#### Adding a new user

```
curl -v                                      \
     -X POST                                 \
     -H "Accept: application/json"           \
     -H "Content-type: application/json"     \
     -d '{"first_name":"Mary","last_name":"Smith","email":"mary@example.com","[user]password":"welcome","password_confirmation":"welcome"}' \
     http://localhost:3000/api/v1/users
```
