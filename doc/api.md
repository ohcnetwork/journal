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


### Login 

Using `wrap_parameters`.

```
curl -v                                      \
     -X POST                                  \
     -H "Accept: application/json"           \
     -H "Content-type: application/json"     \
     -d '{"name":"Jacky", date_of_birth: "1985/05/03", phone_number: "2255"}'            \
     http://localhost:3000/api/v1/sessions
```

### OTP Verification

```
curl -v                                      \
     -X POST                                  \
     -H "Accept: application/json"           \
     -H "Content-type: application/json"     \
     -d '{"name":"Jacky", date_of_birth: "1985/05/03", phone_number: "2255"}'            \
     http://localhost:3000/api/v1/sessions/verify_otp?otp=1947
```

If OTP is incorrect response will be a `400`

Otherwise:
```
{
  "id": 45, 
  "name": "Gudrun Ziemann", 
  "phone_number": "1243444037", 
  "date_of_birth": "1956-09-12"
}
```