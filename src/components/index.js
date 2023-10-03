import Message from './message'
import Notification from './notification'
import xjDialog from "./xjDialog";

const message = Message.message.bind(Message);

const notification = Notification.notification.bind(Notification);

export { message, notification, xjDialog }
