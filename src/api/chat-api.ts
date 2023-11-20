const subscribers = [] as SubscriberType[]

let ws: WebSocket
const closeHandler = () => {
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const parse = JSON.parse(e.data)
    subscribers.forEach(s => s(parse))
}

function createChannel() {

    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener('close', closeHandler)

}

export const chatAPI = {
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
    }
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {

    userId: number,
    userName: string,
    message: string,
    photo: string
}