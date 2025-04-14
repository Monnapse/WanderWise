async function init() {
    const searchInput = document.querySelector("#search");
    const searchButton = document.querySelector("#search-button");

    searchButton.addEventListener("click", async () => {
        const search = searchInput.value.trim();
        if (search) {
            const url = new URL(window.location.href);
            url.searchParams.set("q", search);
            window.location.href = url.toString();
        }
    });

    // Replace search input with current query param
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q) {
        searchInput.value = q;
    } else {
        searchInput.value = "Spain";
    }
}

init();