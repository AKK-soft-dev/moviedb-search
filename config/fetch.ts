import "server-only";

export default function fetchData(uri: string, options?: RequestInit) {
  const { headers, ...others } = options || {};
  // console.log({ token: process.env.TMDB_API_ACCESS_TOKEN });
  const url = `https://api.themoviedb.org/3${uri}`;
  // console.log({ url });
  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
      ...headers,
    },
    ...others,
  });
}
