import { filter } from "lodash";

export const notification = {
	state: {
		notifications: [],
	},
	reducers: {
		addNotification: (state: any, notification: any) => {
            const exists = filter(state.notifications, { message: notification.message });
			return {
				...state,
				notifications: exists.length === 0 ? [ ...state.notifications, notification ] : state.notifications
			}
		},
		removeNotification: (state: any, notification: any) => {
			return {
				...state,
				notifications: filter(state.notifications, (msg) => {
					if(msg.message !== notification.message) {
						return msg;
					}
				})
			}
		},
		setNotifications: (state: any, notifications: any) => {
			return {
				...state,
				notifications
			}
		}
	},
	effects: (dispatch: any) => ({
		reset() {
			dispatch.app.setNotifications([]);
		},
	}),
}