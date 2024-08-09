sYT.colorScheme = state => {
    if (!state || state == "default") return;

    let url = new URL(location.href)
    url.searchParams.append('theme', state);
    location.assign(url);
}
