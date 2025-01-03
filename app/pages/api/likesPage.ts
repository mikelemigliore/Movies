
export async function getLikes(ids: number[]) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  try {
    const responses = await Promise.all(
      ids.map((id) =>
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      )
    );
    const movies = await Promise.all(responses.map((res) => res.json()));
    return new Response(JSON.stringify(movies), { status: 200 });
    //res.status(200).json(movies);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
