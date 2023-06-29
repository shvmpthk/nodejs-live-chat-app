const users = []

//add user
const addUser = ({id, username, room}) => {
    //Clean data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()    

    // validate the data
    if(!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    // check for existing user
    const existingUser = users.find((user) => {
        return user.room == room && user.username === username
    })

    // validate username
    if(existingUser) {
        return {
            error: 'Username already in use'
        }
    }

    //Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

//remove user
const removeUser = (id) => {
    const index = users.findIndex( user => user.id === id)
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// getUser
const getUser = (id) => {
    // return users.find( user => user.id === id)
    const user = users.find( user => user.id === id)
    return user ? user : { error: 'User not found' }
}

// get Users In a Room
const getUsersInRoom = (roomName) => {
    // return users.filter( user => user.room === roomName)
    if(!roomName)
        return {
            error: 'Invalid Room name'
        }

    roomName = roomName.trim().toLowerCase()
    const usersInRoom = users.filter( (user) => {
        return user.room === roomName
    })

    if(usersInRoom.length > 0)
        return usersInRoom
    
    return {
        error: 'No User exists in this room'
    }
}

module.exports = {
    addUser,
    getUser,
    removeUser,
    getUsersInRoom
}