const User = require('../models/user')

const initialUsers = [
    {
      username: 'cWood',
      name: 'Charlie Wood',
      passwordHash: await bcrypt.hash('reallySecret', 10)
    },
    {
        username: 'cWilliam',
        name: 'Charlie William',
        passwordHash: await bcrypt.hash('secret', 10)
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers, usersInDb
}