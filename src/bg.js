function getOptionsKeys(options) {
    let result = [];
    function iterate(options) {
        for (key in options){
            let option = options[key];
            if (!option.type) {
                iterate(option);
            } else {
                result.push(key);
            }
        }
    }
    iterate(options);
    return result;
}

function getOptions() {
    return fetch('options.json')
        .then(data => data.json())
        .then(json => chrome.storage.local.get(getOptionsKeys(json)));
}

chrome.runtime.onMessage.addListener(function bg([message, data], sender, respond) {
    switch (message){
        case 'get-options':
            getOptions().then(options => respond(options));
            return true;
        case 'set-option':
            // Broadcast message to content scripts
            chrome.tabs.query({ discarded: false, url: 'https://www.youtube.com/' })
                .then((tabs) => {
                    tabs.forEach((tab) => {
                        chrome.tabs.sendMessage(tab.id, [message, data]);
                    });
                });
            break;
        default:
            throw 'Unknown message';
    }
});
