async function Home() {
  const response = await fetch(
    "http://www.omdbapi.com/?apikey=58f0e4b0&s=Avenger",
  );
  if (!response.ok) throw new Error("failed to fetch");

  const movies = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols">
      {movies.Search.map((movie: { Title: string; imdbID: string }) => (
        <div
          key={movie.imdbID}
          className="bg-white shadow-md rounded-lg p-4 transition t..."
        >
          <h3 className="text-lg font-blod mb-2">{movie.Title}</h3>
          <p className="text-gray-600">Movie Id: {movie.imdbID}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
