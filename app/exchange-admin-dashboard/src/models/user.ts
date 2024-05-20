export const user = {
	state: {
		users: [],
		user: {},
		userTokens: {},
		userRoles: []
	},
	reducers: {
		setUserRoles: (state: any, roles: any) => {
			return {
				...state,
				userRoles: roles,
			};
		},
		setUsers: (state: any, users: any) => {
			return {
				...state,
				user: users,
			};
		},
		setUser: (state: any, user: any) => {
			return {
				...state,
				user: user,
			};
		},
		setUserTokens: (state: any, token: any) => {
			return {
				...state,
				userTokens: {
					accessToken: token.accessToken,
					refreshToken: token.refreshToken,
					timestamp: token.timestamp
				},
				
			}
		}
	},
	effects: (dispatch: any) => ({
		logout() {
			dispatch.user.setUser({});
			dispatch.user.setUserTokens({});
		},
	}),
}