import Message from './message'
import Notification from './notification'
import ConsoleOutput from "./consoleOutput";
import xj_dialog from "./xj-dialog";

const xj_message = Message.message.bind(Message);

const xj_notification = Notification.notification.bind(Notification);

const xj_console = ConsoleOutput
xj_console.versionLog('XJ', '0.1.0')

export { xj_message, xj_notification, xj_console, xj_dialog }
