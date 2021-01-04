# TODO

- When doing auth, in some cases, encrypted password will be sent back to client so will the active tag. Even through they are set as "selected: false" in our user model. Best way I can think of to solve this is to write a middleware function that runs before a response is sent back to client that removes both of those and any more fields like that in the future.
- This same thing also happens with \_id which is leaked, so we should solve that aswell
- Also happens with passwordChangedAt, passwordResetToken & passwordResetExpires
- Also we cannot login when in active because of middleware we need to solve that.
- Also de \_v
- we can pass "select" when using populate (getTour) but maybe we should centralize our fields somewhere and tag them as "leaky" & "nonLeaky"
- We can add multiple copies of the same user as a tour guide (will appear multiple times);
- Also, we have deleted users, we need to add code so that they can login and their status can be turned from active: false to active: true
- Compound Index for reviews -> user can only leave one review per tour not working
- Aggregation middleware for not showing secret tours has been disabled at Tour Model. Because it fucks over with our getDistances aggregation pipeline ($geo something has to be the first stage).

- Pug is the template engine we use. To generate dyamic websites

- Reenable helmet for content security policy in app.js -> WILL BREAK MAPS

- forgotPassword need to change the email that is sent

- Implemet passwordReset with UI

  - IDK but we are sending the code only for now.

- Implement a virutal populate in getMyTours.js

- I NEED TO GO BACK AND LOOK AT HOW NESTED ROUTES WORK BECAUSE I DON'T REMEMBER

- LIST OF THINGS TO CHANGE ON WEBSITE PRODUCTION

  - in getCheckoutSession.js under stripe.checkout.sessions.create -> the images we need to add them (the url to them that is).
  - Change createBookingCheckout.js
  - remove createBookingCheckout.js from viewRouter/index.js

- List of challenges API
  - More business logic ->
    - Users can only review tour they have booked
    - Lead-Guides can only access and edit their own tours
  - Implement nested booking tours /tours/:id/bookings (get all bookings for certain tour) && /users/:id/bookings (get all bookings for certain users)
  - Improve tour dates
    - Add participants and soldOut field to each data. A date becomes like an instance of the tour. Then, when user books, they need to select one of the dates. A new booking will increase number of participants in the date, until it is booked out (participants > maxGroupSize). So when users wants to book you need to check if tour is available at selected date
  - Implement advanced authentication features
    - Confirm user email (by sending email and having them click on link. They are not signed out until they do so).
    - Keep users logged in with refresh tokens
    - Two-factor authentication (user gets message on their phone to log in)
- List of Challenges WEBSITE
  - Implement sign up form (similar to login form)
  - On tour detail page, if user has taken a tour, allow them to add a review directly on the website (implement a form for this) (check if user has booked tour && time of tour has already passed)
  - Hide the entire booking section on the tour detail page if the current user has already booked the tour (also prevent duplicate bookings on the model).
  - Implement a "like tour" functionality with favorite tour's page
  - On account page implement "My Reviews" Page. Where all reviews are displayed and user can edit them (maybe add and delete them aswell).
  - For administrators implement "Manage" pages where they ca CRUD tours, users, reviews, bookings.
