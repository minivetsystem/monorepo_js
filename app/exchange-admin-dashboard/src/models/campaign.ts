export const campaign = {
	state: {
		campaigns: [],
		campaign: {}
	},
	reducers: {
		setCampaigns: (state: any, campaigns: any) => {
			return {
				...state,
				campaigns,
			};
		},
		setCampaign: (state: any, campaign: any) => {
			return {
				...state,
				campaign,
			};
		}
	}
}