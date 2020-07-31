const handleProfile = (req, res, db) => {
        //req. param() searches the URL path, body,
        //and query string of the request (in that order) for
        //the specified parameter.
        //Transactions are handled by passing a handler 
        //function into knex.transaction. The handler function
        // accepts a single argument


        const { id } = req.params;
        db.select('*').from('users').where({
                id
        })
                .then(user => {
                        if (user.length) {
                                res.json(user[0])
                        }
                        else {
                                res.status(400).json('User is not found')
                        }
                })
                .catch(err => res.status(400).json('getting error'))
}
module.exports = {
        handleProfile,
}