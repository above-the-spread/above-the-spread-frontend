async function getFixtures() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const apiUrl = process.env.FOOTBALL_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error(
      "Missing FOOTBALL_API_KEY or FOOTBALL_API_URL environment variables"
    );
  }

  // Get fixtures for a specific date (Free plan: 2025-09-29 to 2025-10-01)
  const date = "2025-09-29"; // Must be within free plan range
  const season = "2025"; // Current season
  const league = "145"; // Premier League

  const response = await fetch(`${apiUrl}/fixtures?date=${date}`, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export default async function FixturePage() {
  const data = await getFixtures();
  const displayDate = new Date("2025-09-30").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Premier League - Fixtures</h1>
      <p className="text-gray-600 mb-6">{displayDate}</p>

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
            <p className="text-sm text-gray-600">Parameters</p>
            <p className="font-semibold">{JSON.stringify(data.parameters)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Pages</p>
            <p className="font-semibold">{data.paging?.total}</p>
          </div>
        </div>
      </div>

      {/* No Fixtures */}
      {data.results === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">
                No Fixtures on 2025-09-30
              </h3>
              <p className="text-sm text-yellow-700">
                There are no scheduled Premier League matches on this date.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fixtures */}
      {data.results > 0 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚽</span>
              <h2 className="text-2xl font-bold">
                {data.results} Match{data.results > 1 ? "es" : ""} on 2025-09-30
              </h2>
            </div>
          </div>

          {data.response?.map((match: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* League Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {match.league.logo && (
                      <img
                        src={match.league.logo}
                        alt={match.league.name}
                        className="w-8 h-8 object-contain bg-white rounded p-1"
                      />
                    )}
                    <div>
                      <h3 className="font-bold">{match.league.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        {match.league.flag && (
                          <img
                            src={match.league.flag}
                            alt={match.league.country}
                            className="w-4 h-3"
                          />
                        )}
                        <span>{match.league.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        match.fixture.status.short === "NS"
                          ? "bg-gray-200 text-gray-700"
                          : match.fixture.status.short === "FT"
                          ? "bg-gray-400 text-gray-900"
                          : match.fixture.status.short === "HT"
                          ? "bg-yellow-400 text-yellow-900"
                          : "bg-green-400 text-green-900"
                      }`}
                    >
                      {match.fixture.status.short === "NS" ? (
                        <span>
                          {new Date(match.fixture.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      ) : match.fixture.status.short === "FT" ? (
                        <span>FT</span>
                      ) : match.fixture.status.short === "HT" ? (
                        <span>HT</span>
                      ) : (
                        <>
                          <span className="animate-pulse">●</span>
                          <span>{match.fixture.status.elapsed}'</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Score */}
              <div className="p-6">
                <div className="grid grid-cols-7 gap-4 items-center">
                  {/* Home Team */}
                  <div className="col-span-3 flex items-center gap-3">
                    {match.teams.home.logo && (
                      <img
                        src={match.teams.home.logo}
                        alt={match.teams.home.name}
                        className="w-16 h-16"
                      />
                    )}
                    <div>
                      <h4 className="text-xl font-bold">
                        {match.teams.home.name}
                      </h4>
                      {match.teams.home.winner && (
                        <span className="text-sm text-green-600">✓ Winner</span>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-1 text-center">
                    <div className="text-4xl font-bold">
                      {match.goals.home ?? "-"} - {match.goals.away ?? "-"}
                    </div>
                    {match.score.halftime.home !== null && (
                      <div className="text-sm text-gray-500 mt-1">
                        HT: {match.score.halftime.home} -{" "}
                        {match.score.halftime.away}
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="col-span-3 flex items-center gap-3 justify-end">
                    <div className="text-right">
                      <h4 className="text-xl font-bold">
                        {match.teams.away.name}
                      </h4>
                      {match.teams.away.winner && (
                        <span className="text-sm text-green-600">✓ Winner</span>
                      )}
                    </div>
                    {match.teams.away.logo && (
                      <img
                        src={match.teams.away.logo}
                        alt={match.teams.away.name}
                        className="w-16 h-16"
                      />
                    )}
                  </div>
                </div>

                {/* Match Details */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Fixture ID</p>
                    <p className="font-semibold">#{match.fixture.id}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="font-semibold">
                      {match.fixture.venue.name || "N/A"}
                    </p>
                    {match.fixture.venue.city && (
                      <p className="text-xs text-gray-500">
                        {match.fixture.venue.city}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold">{match.fixture.status.long}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full JSON Response */}
      <div className="bg-gray-100 p-4 rounded-lg mt-8">
        <h2 className="text-xl font-semibold mb-4">Full Response (JSON)</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-[600px]">
          <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
