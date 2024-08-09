let options = {};
var optionsCache = undefined;

function getOptions() {
    if (typeof optionsCache === 'object'){
        return optionsCache;
    }
    let result = {};
    function iterate(options) {
        for (const key in options){
            const option = options[key];
            if (!option.type) {
                iterate(option);
            } else {
                result[key] = option;
            }
        }
    }
    iterate(options);
    optionsCache = result;
    Object.seal(optionsCache);
    return result;
}

function getOptionsKeys() {
    return Object.keys(getOptions());
}

function exportOptions() {
    const options = getOptions();
    const result = {};
    for (const key in options){
        result[key] = options[key].state;
    }
    return result;
}

function importOptions(data) {
    const options = getOptions();
    for (const key in data){
        options[key].state = data[key];
    }
}

function setStorage(name, state) {
    const set = {};
    set[name] = state;
    chrome.storage.local.set(set);
    chrome.runtime.sendMessage(['set-option', set]);
}

fetch('../options.json')
    .then((data) => data.json())
    .then((json) => {
        options = json;
        return chrome.storage.local.get(getOptionsKeys());
    })
    .then((data) => {
        importOptions(data);
        renderCategories(options)
    });

window.addEventListener("beforeunload", () => {
    chrome.storage.local.set(exportOptions());
});
