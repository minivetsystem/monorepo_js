import { filter } from "lodash";

export const app = {
	state: {
		theme: 'light',
		notifications: [],
		leadTypes: []
	},
	reducers: {
		setTheme: (state: any, theme: any) => {
			return {
				...state,
				theme,
			};
		},
		addNotification: (state: any, notification: any) => {
			return {
				...state,
				notifications: [ ...state.notifications, notification ]
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
		},
		setLeadTypes: (state: any, leadTypes: any) => {
			return {
				...state,
				leadTypes
			}
		}
	},
	effects: (dispatch: any) => ({
		reset() {
			dispatch.app.setNotifications([]);
		},
	}),
}