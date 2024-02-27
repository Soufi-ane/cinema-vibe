const apiKey = "e8dc9165";
const apiUrl = "//omdbapi.com/";
const IDs = [
    "tt3032476",
    "tt0411008",
    "tt1520211",
    "tt0816692",
    "tt0455275",
    "tt1124373",
    "tt0111161",
    "tt0306414",
    "tt0944947",
    "tt7286456",
    "tt0050083",
    "tt0110912",
    "tt2442560",
    "tt0109830",

    "tt0099685",
    "tt0114369",
    "tt2306299",
    "tt0102926",
    "tt15398776",
];

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

const requests = IDs.map((ID) =>
    fetch(`${apiUrl}?apiKey=${apiKey}&i=${ID}`).then((res) => res.json())
);

export async function getTopMovies() {
    if (!IDs) return;

    const data = await Promise.all(requests);
    if (!data) return [];
    return data;
}
