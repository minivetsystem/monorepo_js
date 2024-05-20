export const PingAcceptedResponse = {
    response: 'Accepted',
	confirmation: '12345678901',
	price: 6.00 
};

export const PingRejectedResponses = [
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'No Buyers Found',
        message: 'There were no buyers available to bid on this lead'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'No Buyers Found',
        message: 'Bids do not meet minimum_price requirement'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Maintenance Mode',
        message: 'Our system is currently in maintenance mode'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Post data is empty',
        message: 'Please check your integration'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Post data is empty',
        message: 'Please check your integration'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Invalid lead_type',
        message: 'Please pass a valid lead_type as per our specs'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Invalid lead_mode',
        message: 'Please ensure lead_mode is either "0" for TEST or "1" for LIVE'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Invalid vendor_id',
        message: 'Please check the vendor_id is correct'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Provided vendor_id is in TEST MODE',
        message: 'Please contact us if you believe your account should be in LIVE MODE'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Daily Cap Exhausted',
        message: 'Please contact us to increase your daily cap'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Per Minute Cap Exhausted',
        message: 'Please contact us to increase your per minute cap'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Errors Detected',
        message: 'The following errors were detected in this lead:',
        errors: ['error 1', 'error 2', 'error 3']
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Duplicate Lead',
        message: 'Lead was identified as a duplicate in our system'
    },
    {
        response: 'Rejected',
        confirmation: '12345678901',
        price: 0.00,
        reason: 'Blacklisted Data',
        message: 'The lead matches data on our internal blacklist - please investigate the lead source'
    }
];