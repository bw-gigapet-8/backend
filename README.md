# **GigaPet Backend Documentation!**

This documentation should give you all of the direction needed for utilizing this backend
to it's intended purposes. If there is anything you feel is missing or poorly explained, please do not
hesitate to message me.

# ***End points***

Returns a welcome message to verify connection to the DB.
https://gigapetdb.herokuapp.com


Returns a list of all users actively signed up for our application.
https://gigapetdb.herokuapp.com/users

Requires a username and password, then returns the newly signed up user.
https://gigapetdb.herokuapp.com/auth/register


Requires login credentials (username and password), and returns a welcome message and token for the user.
https://gigapetdb.herokuapp.com/auth/login

Requires a name ONLY, health is set default to 15.
Post request adds a pet, more coming soon.
req.param.id points to the user.id.
https://gigapetdb.herokuapp.com/auth/:id/pet