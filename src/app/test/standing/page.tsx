async function getStandings() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const apiUrl = process.env.FOOTBALL_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error(
      "Missing FOOTBALL_API_KEY or FOOTBALL_API_URL environment variables"
    );
  }

  // Example: Premier League 2019 season
  const response = await fetch(`${apiUrl}/standings?league=9&season=2024`, {
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

export default async function StandingsPage() {
  const data = await getStandings();

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Football API - League Standings
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
            <p className="text-sm text-gray-600">League</p>
            <p className="font-semibold">{data.parameters.league}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Season</p>
            <p className="font-semibold">{data.parameters.season}</p>
          </div>
        </div>
      </div>

      {/* League Standings */}
      {data.response?.map((item: any, index: number) => (
        <div key={index} className="space-y-6">
          {/* League Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4">
              {item.league.logo && (
                <img
                  src={item.league.logo}
                  alt={item.league.name}
                  className="w-20 h-20 object-contain bg-white rounded-lg p-2"
                />
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold">{item.league.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  {item.league.flag && (
                    <img
                      src={item.league.flag}
                      alt={item.league.country}
                      className="w-8 h-5 object-cover rounded"
                    />
                  )}
                  <span className="text-lg">
                    {item.league.country} • {item.league.season}/
                    {item.league.season + 1}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Standings Table */}
          {item.league.standings?.map(
            (standing: any, standingIndex: number) => (
              <div
                key={standingIndex}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Pos
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          P
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          W
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          D
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          L
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          GF
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          GA
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          GD
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Pts
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Form
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {standing.map((team: any, teamIndex: number) => (
                        <tr
                          key={teamIndex}
                          className={`hover:bg-gray-50 transition-colors ${
                            team.description?.includes("Champions League")
                              ? "border-l-4 border-blue-500"
                              : team.description?.includes("Europa League")
                              ? "border-l-4 border-orange-500"
                              : team.description?.includes("Relegation")
                              ? "border-l-4 border-red-500"
                              : ""
                          }`}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-700">
                                {team.rank}
                              </span>
                              {team.status === "up" && (
                                <span className="text-green-500 text-xs">
                                  ▲
                                </span>
                              )}
                              {team.status === "down" && (
                                <span className="text-red-500 text-xs">▼</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              {team.team.logo && (
                                <img
                                  src={team.team.logo}
                                  alt={team.team.name}
                                  className="w-8 h-8 object-contain"
                                />
                              )}
                              <span className="font-semibold text-gray-900">
                                {team.team.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center text-sm text-gray-700">
                            {team.all.played}
                          </td>
                          <td className="px-4 py-4 text-center text-sm font-semibold text-green-600">
                            {team.all.win}
                          </td>
                          <td className="px-4 py-4 text-center text-sm font-semibold text-yellow-600">
                            {team.all.draw}
                          </td>
                          <td className="px-4 py-4 text-center text-sm font-semibold text-red-600">
                            {team.all.lose}
                          </td>
                          <td className="px-4 py-4 text-center text-sm text-gray-700">
                            {team.all.goals.for}
                          </td>
                          <td className="px-4 py-4 text-center text-sm text-gray-700">
                            {team.all.goals.against}
                          </td>
                          <td
                            className={`px-4 py-4 text-center text-sm font-semibold ${
                              team.goalsDiff > 0
                                ? "text-green-600"
                                : team.goalsDiff < 0
                                ? "text-red-600"
                                : "text-gray-700"
                            }`}
                          >
                            {team.goalsDiff > 0 ? "+" : ""}
                            {team.goalsDiff}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-10 h-10 font-bold text-lg bg-blue-100 text-blue-700 rounded">
                              {team.points}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-1 justify-center">
                              {team.form
                                ?.split("")
                                .map((result: string, i: number) => (
                                  <span
                                    key={i}
                                    className={`w-5 h-5 flex items-center justify-center rounded text-xs font-bold ${
                                      result === "W"
                                        ? "bg-green-500 text-white"
                                        : result === "D"
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                    title={
                                      result === "W"
                                        ? "Win"
                                        : result === "D"
                                        ? "Draw"
                                        : "Loss"
                                    }
                                  >
                                    {result}
                                  </span>
                                ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">
                    Legend:
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-l-4 border-blue-500"></div>
                      <span>Champions League</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-l-4 border-orange-500"></div>
                      <span>Europa League</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-l-4 border-red-500"></div>
                      <span>Relegation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">P:</span>
                      <span>Played</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">W:</span>
                      <span>Won</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">D:</span>
                      <span>Draw</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">L:</span>
                      <span>Lost</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">GF:</span>
                      <span>Goals For</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">GA:</span>
                      <span>Goals Against</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">GD:</span>
                      <span>Goal Difference</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Pts:</span>
                      <span>Points</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Team Details Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {item.league.standings?.[0]
              ?.slice(0, 4)
              .map((team: any, teamIndex: number) => (
                <div
                  key={teamIndex}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {team.team.logo && (
                      <img
                        src={team.team.logo}
                        alt={team.team.name}
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-400">
                          #{team.rank}
                        </span>
                        <h3 className="text-xl font-bold">{team.team.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {team.points} points • {team.goalsDiff > 0 ? "+" : ""}
                        {team.goalsDiff} GD
                      </p>
                    </div>
                  </div>

                  {team.description && (
                    <div
                      className={`mb-4 p-2 rounded text-sm ${
                        team.description.includes("Champions League")
                          ? "bg-blue-100 text-blue-800"
                          : team.description.includes("Europa League")
                          ? "bg-orange-100 text-orange-800"
                          : team.description.includes("Relegation")
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {team.description}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-2xl font-bold text-gray-900">
                        {team.all.played}
                      </p>
                      <p className="text-xs text-gray-600">Played</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <p className="text-2xl font-bold text-green-600">
                        {team.all.win}
                      </p>
                      <p className="text-xs text-gray-600">Wins</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <p className="text-2xl font-bold text-blue-600">
                        {team.points}
                      </p>
                      <p className="text-xs text-gray-600">Points</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">
                        🏠 Home Record
                      </p>
                      <div className="flex gap-2 text-sm">
                        <span className="text-green-600 font-semibold">
                          {team.home.win}W
                        </span>
                        <span className="text-yellow-600 font-semibold">
                          {team.home.draw}D
                        </span>
                        <span className="text-red-600 font-semibold">
                          {team.home.lose}L
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {team.home.goals.for} - {team.home.goals.against} goals
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">
                        ✈️ Away Record
                      </p>
                      <div className="flex gap-2 text-sm">
                        <span className="text-green-600 font-semibold">
                          {team.away.win}W
                        </span>
                        <span className="text-yellow-600 font-semibold">
                          {team.away.draw}D
                        </span>
                        <span className="text-red-600 font-semibold">
                          {team.away.lose}L
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {team.away.goals.for} - {team.away.goals.against} goals
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-2">Recent Form</p>
                    <div className="flex gap-1">
                      {team.form?.split("").map((result: string, i: number) => (
                        <span
                          key={i}
                          className={`flex-1 h-8 flex items-center justify-center rounded font-bold ${
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
                </div>
              ))}
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
