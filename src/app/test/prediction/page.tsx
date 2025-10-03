async function getPredictions() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const apiUrl = process.env.FOOTBALL_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error(
      "Missing FOOTBALL_API_KEY or FOOTBALL_API_URL environment variables"
    );
  }

  // Example: fetch predictions for a specific fixture
  const response = await fetch(`${apiUrl}/predictions?fixture=198772`, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export default async function PredictionsPage() {
  const data = await getPredictions();

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Football API - Match Predictions
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
      </div>

      {/* Predictions */}
      {data.response?.map((item: any, index: number) => (
        <div key={index} className="space-y-6">
          {/* League Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4">
              {item.league.logo && (
                <img
                  src={item.league.logo}
                  alt={item.league.name}
                  className="w-16 h-16 object-contain"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{item.league.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  {item.league.flag && (
                    <img
                      src={item.league.flag}
                      alt={item.league.country}
                      className="w-6 h-4 object-cover rounded"
                    />
                  )}
                  <span className="text-gray-600">
                    {item.league.country} • Season {item.league.season}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Prediction Card */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">🎯 AI Prediction</h3>

            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🏆</span>
                <div>
                  <p className="text-sm opacity-90">Predicted Winner</p>
                  <p className="text-2xl font-bold">
                    {item.predictions.winner.name}
                  </p>
                  <p className="text-sm opacity-75">
                    {item.predictions.winner.comment}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Win or Draw</p>
                <p className="text-xl font-bold">
                  {item.predictions.win_or_draw ? "Yes ✓" : "No ✗"}
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Total Goals</p>
                <p className="text-xl font-bold">
                  {item.predictions.under_over}
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-sm opacity-90 mb-2">Expected Goals</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs opacity-75">Home</p>
                  <p className="text-2xl font-bold">
                    {item.predictions.goals.home}
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Away</p>
                  <p className="text-2xl font-bold">
                    {item.predictions.goals.away}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-400 text-yellow-900 rounded-lg p-4">
              <p className="font-semibold mb-1">💡 Betting Advice</p>
              <p className="text-sm">{item.predictions.advice}</p>
            </div>
          </div>

          {/* Win Probability */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">📊 Win Probability</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Home Win</span>
                  <span className="font-bold text-blue-600">
                    {item.predictions.percent.home}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: item.predictions.percent.home }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Draw</span>
                  <span className="font-bold text-gray-600">
                    {item.predictions.percent.draw}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gray-500 h-4 rounded-full"
                    style={{ width: item.predictions.percent.draw }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Away Win</span>
                  <span className="font-bold text-red-600">
                    {item.predictions.percent.away}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-red-500 h-4 rounded-full"
                    style={{ width: item.predictions.percent.away }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Teams Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">⚖️ Teams Comparison</h3>
            <div className="space-y-3">
              {Object.entries(item.comparison).map(([key, value]: any) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{key.replace(/_/g, " ")}</span>
                    <div className="flex gap-4">
                      <span className="font-semibold text-blue-600">
                        {value.home}
                      </span>
                      <span className="font-semibold text-red-600">
                        {value.away}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="bg-blue-500 h-2 rounded-l"
                      style={{ width: value.home }}
                    ></div>
                    <div
                      className="bg-red-500 h-2 rounded-r"
                      style={{ width: value.away }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teams Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Home Team */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                {item.teams.home.logo && (
                  <img
                    src={item.teams.home.logo}
                    alt={item.teams.home.name}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold">{item.teams.home.name}</h3>
                  <p className="text-sm text-gray-600">Home Team</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-1">Last 5 Matches</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Form</p>
                      <p className="font-bold">{item.teams.home.last_5.form}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Attack</p>
                      <p className="font-bold">{item.teams.home.last_5.att}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Defense</p>
                      <p className="font-bold">{item.teams.home.last_5.def}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-semibold mb-2">Season Form</p>
                  <div className="flex gap-1 mb-2">
                    {item.teams.home.league.form
                      .split("")
                      .map((result: string, i: number) => (
                        <span
                          key={i}
                          className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
                            result === "W"
                              ? "bg-green-500 text-white"
                              : result === "D"
                              ? "bg-yellow-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">Played</p>
                    <p className="font-bold">
                      {item.teams.home.league.fixtures.played.total}
                    </p>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-gray-600">Wins</p>
                    <p className="font-bold text-green-600">
                      {item.teams.home.league.fixtures.wins.total}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded">
                    <p className="text-gray-600">Draws</p>
                    <p className="font-bold text-yellow-600">
                      {item.teams.home.league.fixtures.draws.total}
                    </p>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <p className="text-gray-600">Losses</p>
                    <p className="font-bold text-red-600">
                      {item.teams.home.league.fixtures.loses.total}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-gray-600">Goals For</p>
                    <p className="font-bold text-blue-600">
                      {item.teams.home.league.goals.for.total.total} (avg:{" "}
                      {item.teams.home.league.goals.for.average.total})
                    </p>
                  </div>
                  <div className="bg-orange-50 p-2 rounded">
                    <p className="text-gray-600">Goals Against</p>
                    <p className="font-bold text-orange-600">
                      {item.teams.home.league.goals.against.total.total} (avg:{" "}
                      {item.teams.home.league.goals.against.average.total})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Away Team */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                {item.teams.away.logo && (
                  <img
                    src={item.teams.away.logo}
                    alt={item.teams.away.name}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold">{item.teams.away.name}</h3>
                  <p className="text-sm text-gray-600">Away Team</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-1">Last 5 Matches</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Form</p>
                      <p className="font-bold">{item.teams.away.last_5.form}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Attack</p>
                      <p className="font-bold">{item.teams.away.last_5.att}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Defense</p>
                      <p className="font-bold">{item.teams.away.last_5.def}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-semibold mb-2">Season Form</p>
                  <div className="flex gap-1 mb-2">
                    {item.teams.away.league.form
                      .split("")
                      .map((result: string, i: number) => (
                        <span
                          key={i}
                          className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
                            result === "W"
                              ? "bg-green-500 text-white"
                              : result === "D"
                              ? "bg-yellow-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">Played</p>
                    <p className="font-bold">
                      {item.teams.away.league.fixtures.played.total}
                    </p>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-gray-600">Wins</p>
                    <p className="font-bold text-green-600">
                      {item.teams.away.league.fixtures.wins.total}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded">
                    <p className="text-gray-600">Draws</p>
                    <p className="font-bold text-yellow-600">
                      {item.teams.away.league.fixtures.draws.total}
                    </p>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <p className="text-gray-600">Losses</p>
                    <p className="font-bold text-red-600">
                      {item.teams.away.league.fixtures.loses.total}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-gray-600">Goals For</p>
                    <p className="font-bold text-blue-600">
                      {item.teams.away.league.goals.for.total.total} (avg:{" "}
                      {item.teams.away.league.goals.for.average.total})
                    </p>
                  </div>
                  <div className="bg-orange-50 p-2 rounded">
                    <p className="text-gray-600">Goals Against</p>
                    <p className="font-bold text-orange-600">
                      {item.teams.away.league.goals.against.total.total} (avg:{" "}
                      {item.teams.away.league.goals.against.average.total})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Head to Head */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              🔄 Head to Head ({item.h2h?.length} matches)
            </h3>
            <div className="space-y-3">
              {item.h2h?.map((match: any, matchIndex: number) => (
                <div
                  key={matchIndex}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      {match.league.name} • {match.league.round}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(match.fixture.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 items-center">
                    <div className="col-span-3 flex items-center gap-2">
                      <img
                        src={match.teams.home.logo}
                        alt={match.teams.home.name}
                        className="w-6 h-6 object-contain"
                      />
                      <span
                        className={`text-sm ${
                          match.teams.home.winner
                            ? "font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {match.teams.home.name}
                      </span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="font-bold text-lg">
                        {match.goals.home} - {match.goals.away}
                      </span>
                      <p className="text-xs text-gray-500">
                        {match.fixture.status.short}
                      </p>
                    </div>
                    <div className="col-span-3 flex items-center gap-2 justify-end">
                      <span
                        className={`text-sm ${
                          match.teams.away.winner
                            ? "font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {match.teams.away.name}
                      </span>
                      <img
                        src={match.teams.away.logo}
                        alt={match.teams.away.name}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  </div>
                  {match.score.halftime && (
                    <p className="text-xs text-gray-500 mt-2">
                      HT: {match.score.halftime.home} -{" "}
                      {match.score.halftime.away}
                    </p>
                  )}
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
