const sYT = {};

function getPageType () {
    switch (location.pathname){
        case '/':
            return 'home';
        case '/watch':
            return 'video';
        case '/live':
            return 'live';
        case '/feed/subscriptions':
            return 'subscriptions';
        default:
            break;
    }
    if (/^\/@|^\/(channel|user|c)/.test(location.pathname)) {
        return 'channel';
    } else if (location.pathname.startsWith('/embed')) {
        return 'embed';
	}

    return 'unknown';
};
