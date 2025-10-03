async function getTimezones() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const apiUrl = process.env.FOOTBALL_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error(
      "Missing FOOTBALL_API_KEY or FOOTBALL_API_URL environment variables"
    );
  }

  const response = await fetch(`${apiUrl}/timezone`, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export default async function TimezonePage() {
  const data = await getTimezones();

  // Group timezones by continent
  const groupedTimezones: Record<string, string[]> = {};
  data.response?.forEach((timezone: string) => {
    const continent = timezone.split("/")[0];
    if (!groupedTimezones[continent]) {
      groupedTimezones[continent] = [];
    }
    groupedTimezones[continent].push(timezone);
  });

  // Sort continents
  const continents = Object.keys(groupedTimezones).sort();

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Football API - Timezones</h1>

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

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {continents.map((continent) => (
          <div
            key={continent}
            className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow"
          >
            <p className="text-3xl font-bold text-blue-600">
              {groupedTimezones[continent].length}
            </p>
            <p className="text-sm text-gray-600 mt-1">{continent}</p>
          </div>
        ))}
      </div>

      {/* Timezones by Continent */}
      <div className="space-y-6">
        {continents.map((continent) => (
          <div key={continent} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">
                  {continent === "Africa"
                    ? "🌍"
                    : continent === "America"
                    ? "🌎"
                    : continent === "Asia"
                    ? "🌏"
                    : continent === "Europe"
                    ? "🇪🇺"
                    : continent === "Pacific"
                    ? "🌊"
                    : continent === "Antarctica"
                    ? "🧊"
                    : continent === "Atlantic"
                    ? "🌊"
                    : continent === "Indian"
                    ? "🌊"
                    : continent === "Arctic"
                    ? "❄️"
                    : "🌐"}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{continent}</h2>
                <p className="text-sm text-gray-600">
                  {groupedTimezones[continent].length} timezones
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {groupedTimezones[continent].map((timezone, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 group-hover:text-blue-600">
                      🕐
                    </span>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                      {timezone}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    {timezone.split("/").slice(1).join(" / ") || continent}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* All Timezones List */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">
          All Timezones ({data.results})
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {data.response?.map((timezone: string, index: number) => (
              <div
                key={index}
                className="text-sm font-mono text-gray-700 p-2 hover:bg-white hover:shadow-sm rounded transition-all"
              >
                {timezone}
              </div>
            ))}
          </div>
        </div>
      </div>

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
