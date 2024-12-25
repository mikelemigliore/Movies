import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const time = 600;
// Function to format a Date object as 'YYYY-MM-DD'
function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Calculate min_date (current date)
const today = new Date();
const min_date = formatDate(today);

// Calculate max_date (e.g., 30 days from today)
const daysToAdd = 365;
const max_date = formatDate(
  new Date(today.getTime() - daysToAdd * 24 * 60 * 60 * 1000)
);

// interface SortBy {
//   popularity: string,
//   releaseDate: string,
//   rating: string,
//   alphabetical: string,
// }

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getContent: builder.query({
      query: ({
        type,
        page,
        sortBy,
      }: {
        type: string;
        page: number;
        sortBy: string;
      }) => {
        const endpoints: Record<string, string> = {
          //Syntax: Record<KeyType, ValueType> is a utility type that allows you to create an object type
          //movie/popular?api_key=${apiKey}&region=US&language=en-US&page=${page}
          movie: `discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&primary_release_date.lte=${min_date}&vote_count.gte=300&vote_average.gte=4`,
          series: `discover/tv?api_key=${apiKey}&region=US&sort_by=${sortBy}&vote_count.gte=100&vote_average.gte=7&page=${page}&primary_release_date.lte=${min_date}`,
          all: `trending/all/day?api_key=${apiKey}&page=${page}`,
        };

        return (
          endpoints[type] || //The function attempts to find the URL for the specified type in the endpoints object.
          (() => {
            throw new Error("Invalid type provided");
          })()
        );
      },
      keepUnusedDataFor: time,
      //We don't need the meta segment but, the Redux library expects a function with exactly three parameters, and removing one breaks the type matching.
      transformResponse: (
        response: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: { type: string; page: number; sortBy: string }
      ) => {
        const { type } = arg; // Access the type from the query arguments
        const { sortBy } = arg;
        if (!response || !response.results) {
          return []; // Return an empty array if response is invalid
        }

        const newData = response.results.map((item: any) => ({
          ...item,
          media_type:
            type === "movie" //If type is "movie",
              ? "movie" //it sets media_type to "movie". If media_type is not present , it create it.
              : type === "series" //If type is "series"
              ? "tv" //sets media_type to "tv". If media_type is not present , it create it.
              : item.media_type, // it uses the existing media_type
        }));

        const filteredData = newData.filter((item:any)=>{
          return item.original_language !== "ko"
        })

        if (type === "all") {
          const sorteData = filteredData.sort((a: any, b: any) => {
            switch (sortBy) {
              case "primary_release_date.desc":
                return (
                  new Date(b.release_date || b.first_air_date).getTime() -
                  new Date(a.release_date || a.first_air_date).getTime()
                );
              case "popularity.desc":
                return b.popularity - a.popularity;
              case "vote_average.desc":
                return b.vote_average - a.vote_average;
              case "title.desc": // Sort alphabetically
                const titleA = (a.title || a.name || "").toLowerCase();
                const titleB = (b.title || b.name || "").toLowerCase();
                if (titleA < titleB) return -1; // A comes before B
                if (titleA > titleB) return 1; // B comes before A
                return 0; // Titles are the same
              default:
                return 0; // No sorting
            }
          });
          return sorteData;
        } else {
          return filteredData;
        }
      },
    }),
  }),
});

export const { useGetContentQuery } = searchApi;
