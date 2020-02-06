# **GigaPet Backend Documentation!**

This documentation should give you all of the direction needed for utilizing this backend
to it's intended purposes. If there is anything you feel is missing or poorly explained, please do not
hesitate to message me.

# ***End points***


GET: https://gigapetdb.herokuapp.com
Returns a welcome message to verify connection to the DB.


https://gigapetdb.herokuapp.com/users
Returns a list of all users actively signed up for our application.


POST: https://gigapetdb.herokuapp.com/auth/register
Requires a username and password, then returns the newly signed up user.


POST: https://gigapetdb.herokuapp.com/auth/login
Requires login credentials (username and password), and returns a welcome message and token for the user.


POST: https://gigapetdb.herokuapp.com/auth/:id/pet
Requires a name ONLY, health is set default to 15.
Post request adds a pet.
req.params.id points to the user.id.

GET: https://gigapetdb.herokuapp.com/auth/:id/pet
Returns pet name, pet_id, and health for selected pet.


POST: https://gigapetdb.herokuapp.com/auth/:id/pet/:pet_id
