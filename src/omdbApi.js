const apiKey = "e8dc9165";
const apiUrl = "//omdbapi.com/";

export async function getMovies({ query, type, year }) {
    let url = `${apiUrl}?apikey=${apiKey}`;

    if (query) url += `&s=${query}`;
    if (year) url += `&y=${year}`;
    if (type) url += `&type=${type}`;

    const res = await fetch(url);
    const data = await res.json();
    if (!data) return {};
    return data.Search || null;
}

export async function getMovieDetails(id) {
    const res = await fetch(`${apiUrl}?apiKey=${apiKey}&i=${id}`);
    const data = await res.json();

    return data;
}
export async function getTopMovies(IDs) {
    if (!IDs) return;
    let data = [];
    for (let i = 0; i < IDs.length; i++) {
        const r = await fetch(`${apiUrl}?apiKey=${apiKey}&i=${IDs.at(i)}`);
        const detail = await r.json();
        data = [...data, detail];
    }

    return data;
}
