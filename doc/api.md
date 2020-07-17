### Testing with api using curl

``` ruby
user = User.where(email: 'john@example.com').first
auth_token = user.authentication_token
```

In the following example replace the `auth_token` value with the value derived in the above step when appropriate.

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
