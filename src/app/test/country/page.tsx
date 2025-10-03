async function getCountries() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const apiUrl = process.env.FOOTBALL_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error(
      "Missing FOOTBALL_API_KEY or FOOTBALL_API_URL environment variables"
    );
  }

  const response = await fetch(`${apiUrl}/countries`, {
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

export default async function CountryPage() {
  const data = await getCountries();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Football API - Countries Response
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

      {/* Countries Grid */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Countries ({data.response?.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.response?.map((country: any, index: number) => (
            <div
              key={country.code || index}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                {country.flag && (
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-12 h-8 object-cover rounded border border-gray-200"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{country.name}</h3>
                  {country.code && (
                    <p className="text-sm text-gray-500">
                      Code: {country.code}
                    </p>
                  )}
                </div>
              </div>
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
