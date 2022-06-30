const getUserReducer = (state = null, action) => {
    switch (action.type) {
        case "userdata":
            return action.payload

        default:
            return state;
    }
}

export default getUserReducer;