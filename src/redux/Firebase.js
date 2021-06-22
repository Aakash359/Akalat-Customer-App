import messaging from '@react-native-firebase/messaging'
import { Alert } from 'react-native'
import { setFcmToken } from '../CommonConfig/HelperFunctions/AppHelper'

export async function requestUserPermission() {
    
    const authStatus = await messaging().requestPermission({
        sound: true,
        announcement: true,
        alert: true,
        carPlay: true,
        badge: true,
    })
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
        console.log('Authorization status:', authStatus)
    }
}

export const getToken = async () => {
    const fcmToken = await messaging().getToken()
    console.log('====================================')
    console.log(fcmToken)
    console.log('====================================')
    await setFcmToken(fcmToken)
}

export const forgroundMessages = messaging().onMessage(
    async (remoteMessage) => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    }
)

export const backgroundMessages = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage)
    })
}

export function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        console.log('Message App Launched')

        return null
    }
}

export async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages()
}

// Assume a message-notification contains a "type" property in the data payload of the screen to open

export const onNavigationOpendApp = (callback = undefined) => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification
        )

        if (callback) {
            callback(remoteMessage)
        }
    })
}

// Check whether an initial notification is available
export const getInitailNotification = (callback = undefined) => {
    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification
                )
                if (callback) {
                    callback(remoteMessage)
                }
            }
        })
}
