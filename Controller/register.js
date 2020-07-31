const handleRegister = (req, res, db, bcrypt) => {

        const { name, email, password } = req.body;
        if (!email || !name || !password) {
                return res.status(400).json('incorrect form submission')
        }

        const hash = bcrypt.hashSync(password)
        //use transaction when you have to do more than two things at once
        db.transaction(trx => {
                // Insert the value into the database 
                trx.insert({
                        hash: hash,
                        email: email,
                })
                        .into('login')
                        .returning('email')
                        .then(loginEmail => {
                                return trx('users')
                                        //returning the database input to the front end
                                        .returning('*')
                                        .insert({
                                                email: loginEmail[0],
                                                name: name,
                                                joined: new Date()
                                        })
                                        .then(user => {
                                                res.json(user[0])
                                        })
                        })
                        //trx.rollback will return a rejected Promise. 
                        // If you don't pass any argument to trx.rollback,
                        //  a generic Error object will be created and passed in 
                        // to ensure the Promise always rejects with something.
                        // We have to make sure that we commit and then in case anything fails we roll back the changes.
                        .then(trx.commit)
                        .catch(trx.rollback)
        })
                .catch(err => res.status(400).json('unable to register'))
};
module.exports = {
        handleRegister: handleRegister
}