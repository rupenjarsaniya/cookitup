export const getUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: "userdata",
            payload: data
        })
    }
}

// export const depositMoney = (amount) => {
//     return (dispatch) => {
//         dispatch({
//             type: "deposit",
//             payload: amount
//         })
//     }
// }