# **GigaPet Backend Documentation!**

This documentation should give you all of the direction needed for utilizing this backend
to it's intended purposes. If there is anything you feel is missing or poorly explained, please do not
hesitate to message me.

# ***End points***


### GET: https://gigapetdb.herokuapp.com
Returns a welcome message to verify connection to the DB.


### GET: https://gigapetdb.herokuapp.com/users
Returns a list of all users actively signed up for our application.


### POST: https://gigapetdb.herokuapp.com/auth/register
Requires a username and password, then returns the newly signed up user.


### POST: https://gigapetdb.herokuapp.com/auth/login
Requires login credentials (username and password), and returns a welcome message and token for the user.


### POST: https://gigapetdb.herokuapp.com/auth/:id/pet
Requires a pet_name (string) ONLY, health is set default to 15.
Post request adds a pet.
req.params.id points to the user.id.


### GET: https://gigapetdb.herokuapp.com/auth/:id/pet/:pet_id
Returns pet name (string), pet_id (integer), and health(integer) for selected pet.


### GET: https://gigapetdb.herokuapp.com/auth/:id/pet/:pet_id/foods
Returns list of all foods eaten by this pet.

### POST: https://gigapetdb.herokuapp.com/auth/:id/pet/:pet_id/foods
Requires name (of food), category_id (integer), and a time_of_day (string).


### GET: https://gigapetdb.herokuapp.com/auth/:id/pet/:pet_id/foods/food_eaten_id
Returns the specific food item matching the food_eaten_id. This is for CRUD ops of individual items.

### PUT: https://gigapetdb.herokuapp.com/auth/:id/pet/:pet_id/foods/food_eaten_id
Requires name (of food), category_id (integer), and a time_of_day (string).

### DELETE: https://gigapetdb.herokuapp.com/auth/:id/pet/:pet_id/foods/food_eaten_id
Deletes food item with the corresponding food_eaten_id.