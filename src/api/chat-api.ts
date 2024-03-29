let subscribers = {
    "messages-received": [] as MessagesReceivedSubscriberType[],
    "status-changed": [] as StatusChangedSubscriberType[],
}
type EventsNamesType = "messages-received" | "status-changed"
let ws: WebSocket | null = null
const closeHandler = () => {
    notifySubscibersAboutStatus("pending")
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {

    const parse = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(parse))
}
const openHandler = () => {

    notifySubscibersAboutStatus("ready")
}
const errorHandler = () => {
    notifySubscibersAboutStatus("error")

}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifySubscibersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
    console.log(status)
}

function createChannel() {

    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscibersAboutStatus("pending")
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)

}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType ) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType ) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {

        ws?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type StatusType = "pending" | 'ready' | 'error'
export type ChatMessageApiType = {
    userId: number,
    userName: string,
    message: string,
    photo: string,

}