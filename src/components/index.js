import Message from './message'
import Notification from './notification'

export const message = Message.message.bind(Message);

export const notification = Notification.notification.bind(Notification);
