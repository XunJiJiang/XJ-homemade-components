import Message from './message'
import Notification from './notification'
import xjDialog from "./xjDialog";

export const message = Message.message.bind(Message);

export const notification = Notification.notification.bind(Notification);

export { xjDialog }
