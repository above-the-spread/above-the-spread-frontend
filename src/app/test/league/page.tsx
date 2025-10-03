async function getLeagues() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const apiUrl = process.env.FOOTBALL_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error(
      "Missing FOOTBALL_API_KEY or FOOTBALL_API_URL environment variables"
    );
  }

  const response = await fetch(`${apiUrl}/leagues`, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
    // Optionally cache for 1 hour
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export default async function Home() {
  const data = await getLeagues();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Football API - Leagues Response
      </h1>

      {/* API Metadata */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">API Response Info</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Endpoint</p>
            <p className="font-semibold">{data.get}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Results</p>
            <p className="font-semibold">{data.results}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Page</p>
            <p className="font-semibold">{data.paging?.current}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Pages</p>
            <p className="font-semibold">{data.paging?.total}</p>
          </div>
        </div>
        {data.parameters && Object.keys(data.parameters).length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-600">Parameters</p>
            <p className="font-mono text-sm">
              {JSON.stringify(data.parameters)}
            </p>
          </div>
        )}
        {data.errors && data.errors.length > 0 && (
          <div className="mt-3 p-2 bg-red-100 rounded">
            <p className="text-sm text-red-600">
              Errors: {data.errors.join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Leagues Grid */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Leagues ({data.response?.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.response?.map((item: any, index: number) => (
            <div
              key={item.league.id || index}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              {/* League Header */}
              <div className="flex items-start gap-3 mb-3">
                {item.league.logo && (
                  <img
                    src={item.league.logo}
                    alt={item.league.name}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.league.name}</h3>
                  <p className="text-sm text-gray-500">
                    ID: {item.league.id} • {item.league.type}
                  </p>
                </div>
              </div>

              {/* Country Info */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                {item.country.flag && (
                  <img
                    src={item.country.flag}
                    alt={item.country.name}
                    className="w-6 h-4 object-cover rounded"
                  />
                )}
                <span className="text-sm font-medium">{item.country.name}</span>
                {item.country.code && (
                  <span className="text-xs text-gray-500">
                    ({item.country.code})
                  </span>
                )}
              </div>

              {/* Seasons Info */}
              {item.seasons && item.seasons.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 mb-2">
                    <strong>Seasons:</strong> {item.seasons.length} available
                  </p>
                  <div className="text-xs space-y-1">
                    {item.seasons.slice(0, 3).map((season: any) => (
                      <div
                        key={season.year}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">
                          {season.year}
                          {season.current && (
                            <span className="ml-1 px-1 bg-green-100 text-green-700 rounded text-xs">
                              Current
                            </span>
                          )}
                        </span>
                        <span className="text-gray-500">
                          {season.start} → {season.end}
                        </span>
                      </div>
                    ))}
                    {item.seasons.length > 3 && (
                      <p className="text-gray-500 italic">
                        +{item.seasons.length - 3} more seasons
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full JSON Response */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Full Response (JSON)</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-[600px]">
          <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
