### User
On the user end, the application is to be used by the most common of people. This design has to be kept as simple and bare bones as possible.

This is why we are skipping detailed password based authentication on user. User will have a sign up page where they can enter minimal details of themselves, this will be saved to the backend with a token generated ending the user on main page.
If this token ever gets cleared (assuming that the possibility of this happening is rare), user will be redirected back to the sign up page.

Uniqueness of date of birth + phone number is enforced, so as communicate with other Coronasafe projects easier in the future.

### Merchant
Merchant enters shop details and should be able to generate QR code. 

The QR code is used by the user to track the route map.

### Admin
This is to be used by district officials, the emphasis here is on the functionality rather than the UI.

Functionalities:
<ul>
  <li>Route Map of the user</li>
  <li>Filter Visits based on date</li>
</ul>
