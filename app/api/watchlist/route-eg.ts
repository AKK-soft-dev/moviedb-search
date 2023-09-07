// import WatchListMovie from "@/models/watchlist-movie";
// import WatchListTVShow from "@/models/watchlist-tvshow";
// import { connectToDB } from "@/utils/database";

// export const GET = async () => {
//   try {
//     await connectToDB();

//     const tvShows = await WatchListTVShow.find({}).populate("creator");
//     const movies = await WatchListMovie.find({}).populate("creator");
//     return new Response(JSON.stringify({ tvShows, movies }), { status: 200 });
//   } catch (err) {
//     return new Response("Failed to fetch watch list.", {
//       status: 500,
//     });
//   }
// };
