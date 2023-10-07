import Console from "./console"
import Message from './message'
import Notification from './notification'
import xj_dialog from "./xj-dialog";
import xj_multi_line_stream from './multi-line-stream-arrangement'

const xj_console = Console
xj_console.versionLog(process.env.VUE_APP_TITLE, process.env.VUE_APP_VERSION)

const xj_message = Message.message.bind(Message)

const xj_notification = Notification.notification.bind(Notification)

export { xj_message, xj_notification, xj_console, xj_dialog, xj_multi_line_stream }
