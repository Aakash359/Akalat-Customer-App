import { Alert } from 'react-native'

export const logError = (error, name) => {
    const n = name ? name + ' -->> ' : ''
    if (error.response && error.response.data && error.response.data.message) {
        console.log(n, error.response.data.message, error.response)
    } else if (error.code && error.message) {
        console.log(n, error.code, error.message)
    } else {
        console.log(n, error, error.response)
    }
}

export const showAlert = (
    title = 'Something went wrong ...',
    message = 'Please try again',
    buttons = [{ text: 'Ok' }]
) => {
    Alert.alert(title, message, buttons, { Cancelable: false })
}