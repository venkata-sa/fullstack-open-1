const reducer = ( state = null, action ) => {
    switch( action.type ) {
        case 'ALERT':
            return action.data
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export const setNotification = (message) => {
    return {
        type: 'ALERT',
        data: message
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default reducer