async function getLiveOdds() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const apiUrl = process.env.FOOTBALL_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error(
      "Missing FOOTBALL_API_KEY or FOOTBALL_API_URL environment variables"
    );
  }

  // Example: fetch live odds for a specific fixture
  // You can change the fixture parameter or remove it to get all live matches
  const response = await fetch(`${apiUrl}/odds/live?fixture=721238`, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
    // Cache for shorter time since it's live data
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export default async function LiveOddsPage() {
  const data = await getLiveOdds();

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Football API - Live Odds</h1>

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

      {/* Live Matches */}
      {data.response?.map((match: any, matchIndex: number) => (
        <div key={matchIndex} className="mb-8">
          {/* Match Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">
                  Fixture #{match.fixture.id} • League {match.league.id} •
                  Season {match.league.season}
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {match.fixture.status.long}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">
                  {match.fixture.status.elapsed}'
                </p>
                <p className="text-sm opacity-90">
                  {match.fixture.status.seconds}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Home Team</p>
                <p className="text-3xl font-bold">{match.teams.home.goals}</p>
                <p className="text-sm">Team ID: {match.teams.home.id}</p>
              </div>
              <div className="text-center text-2xl font-bold">VS</div>
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Away Team</p>
                <p className="text-3xl font-bold">{match.teams.away.goals}</p>
                <p className="text-sm">Team ID: {match.teams.away.id}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-4 text-sm">
              <span
                className={`px-2 py-1 rounded ${
                  match.status.stopped ? "bg-red-500" : "bg-green-700"
                }`}
              >
                {match.status.stopped ? "⏸ Stopped" : "▶ Live"}
              </span>
              <span
                className={`px-2 py-1 rounded ${
                  match.status.blocked ? "bg-red-500" : "bg-green-700"
                }`}
              >
                {match.status.blocked ? "🔒 Blocked" : "🔓 Open"}
              </span>
              <span
                className={`px-2 py-1 rounded ${
                  match.status.finished ? "bg-gray-700" : "bg-green-700"
                }`}
              >
                {match.status.finished ? "✓ Finished" : "⚡ In Play"}
              </span>
              <span className="px-2 py-1 rounded bg-green-700">
                🕐 Updated: {new Date(match.update).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Odds Section */}
          <div className="bg-white rounded-b-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">
              Available Odds ({match.odds?.length} markets)
            </h3>

            <div className="space-y-6">
              {match.odds?.map((odd: any) => (
                <div
                  key={odd.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">
                        {odd.id}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg">{odd.name}</h4>
                    <span className="ml-auto text-sm text-gray-500">
                      {odd.values.length} options
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {odd.values.map((value: any, valueIndex: number) => (
                      <div
                        key={valueIndex}
                        className={`p-3 rounded border-2 ${
                          value.suspended
                            ? "bg-gray-100 border-gray-300 opacity-50"
                            : value.main
                            ? "bg-yellow-50 border-yellow-400"
                            : "bg-white border-gray-200 hover:border-blue-400"
                        } transition-colors`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-sm">
                            {value.value}
                          </span>
                          {value.main && (
                            <span className="text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded">
                              Main
                            </span>
                          )}
                          {value.suspended && (
                            <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">
                              Suspended
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-blue-600">
                            {value.odd}
                          </span>
                          {value.handicap && (
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                              {value.handicap}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

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
