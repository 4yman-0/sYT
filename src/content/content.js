{

/* `chrome.storage.local.get()` is async and we want to
 * load the injection script immediately.
 * See https://bugs.chromium.org/p/chromium/issues/detail?id=54257
*/

function sYTOnLoad() {

}

function sYTOnNavigate() {

}

function sYTOnFocus() {

}

function sYTOnBlur() {

}

function init(data) {
    // TODO init
    /*for (const key in sYT) {
        sYT[key](data[key]);
    }*/
    window.addEventListener('load', sYTOnLoad);
    document.addEventListener('yt-navigate-finish', sYTOnNavigate);
    document.addEventListener('focus', sYTOnFocus);
    document.addEventListener('blur', sYTOnBlur);
}

chrome.runtime.sendMessage(['get-options'], (options) => {
    if (!options) console.error(chrome.runtime.lastError);
    init(options);
});

chrome.runtime.onMessage.addListener(([message, data], sender, respond) => {
    switch (message){
        case 'set-option':
            const key = Object.keys(data)[0];
            sYT[key](data[key]);
            break;
        default:
            throw 'Unknown message';
    }
});

}
