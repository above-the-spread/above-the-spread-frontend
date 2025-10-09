export default function Home() {
  return <div>Hello World</div>;
}
// import Link from "next/link";

// async function getLeagues() {
//   const apiKey = process.env.FOOTBALL_API_KEY;
//   const apiUrl = process.env.FOOTBALL_API_URL;

//   if (!apiKey || !apiUrl) {
//     return null;
//   }

//   try {
//     const response = await fetch(`${apiUrl}/leagues`, {
//       headers: {
//         "x-rapidapi-key": apiKey,
//         "x-rapidapi-host": "v3.football.api-sports.io",
//       },
//       next: { revalidate: 3600 },
//     });

//     if (!response.ok) return null;
//     return response.json();
//   } catch (error) {
//     return null;
//   }
// }

// async function getCountries() {
//   const apiKey = process.env.FOOTBALL_API_KEY;
//   const apiUrl = process.env.FOOTBALL_API_URL;

//   if (!apiKey || !apiUrl) {
//     return null;
//   }

//   try {
//     const response = await fetch(`${apiUrl}/countries`, {
//       headers: {
//         "x-rapidapi-key": apiKey,
//         "x-rapidapi-host": "v3.football.api-sports.io",
//       },
//       next: { revalidate: 3600 },
//     });

//     if (!response.ok) return null;
//     return response.json();
//   } catch (error) {
//     return null;
//   }
// }

// async function getLiveBets() {
//   const apiKey = process.env.FOOTBALL_API_KEY;
//   const apiUrl = process.env.FOOTBALL_API_URL;

//   if (!apiKey || !apiUrl) {
//     return null;
//   }

//   try {
//     const response = await fetch(`${apiUrl}/odds/live/bets`, {
//       headers: {
//         "x-rapidapi-key": apiKey,
//         "x-rapidapi-host": "v3.football.api-sports.io",
//       },
//       next: { revalidate: 3600 },
//     });

//     if (!response.ok) return null;
//     return response.json();
//   } catch (error) {
//     return null;
//   }
// }

// export default async function Home() {
//   const [leagues, countries, liveBets] = await Promise.all([
//     getLeagues(),
//     getCountries(),
//     getLiveBets(),
//   ]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="p-8 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             ⚽ Football API Dashboard
//           </h1>
//           <p className="text-gray-600">
//             Real-time football data from API-Sports.io
//           </p>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {/* Leagues Card */}
//           <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Leagues</h2>
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">🏆</span>
//               </div>
//             </div>
//             {leagues ? (
//               <>
//                 <p className="text-3xl font-bold text-blue-600 mb-2">
//                   {leagues.results}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Total leagues available
//                 </p>
//                 <Link
//                   href="/test/league"
//                   className="inline-block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//                 >
//                   View All Leagues →
//                 </Link>
//               </>
//             ) : (
//               <p className="text-red-500 text-sm">
//                 API Error - Check credentials
//               </p>
//             )}
//           </div>

//           {/* Countries Card */}
//           <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Countries</h2>
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">🌍</span>
//               </div>
//             </div>
//             {countries ? (
//               <>
//                 <p className="text-3xl font-bold text-green-600 mb-2">
//                   {countries.results}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Countries with football data
//                 </p>
//                 <Link
//                   href="/test/country"
//                   className="inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//                 >
//                   View All Countries →
//                 </Link>
//               </>
//             ) : (
//               <p className="text-red-500 text-sm">
//                 API Error - Check credentials
//               </p>
//             )}
//           </div>

//           {/* Live Bets Card */}
//           <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Live Bets</h2>
//               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">🎲</span>
//               </div>
//             </div>
//             {liveBets ? (
//               <>
//                 <p className="text-3xl font-bold text-purple-600 mb-2">
//                   {liveBets.results}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Available bet types
//                 </p>
//                 <Link
//                   href="/test/live"
//                   className="inline-block w-full text-center bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//                 >
//                   View All Bet Types →
//                 </Link>
//               </>
//             ) : (
//               <p className="text-red-500 text-sm">
//                 API Error - Check credentials
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Sample Leagues */}
//         {leagues && leagues.response && leagues.response.length > 0 && (
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Featured Leagues
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {leagues.response.slice(0, 6).map((item: any, index: number) => (
//                 <div
//                   key={item.league.id || index}
//                   className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
//                 >
//                   <div className="flex items-center gap-3">
//                     {item.league.logo && (
//                       <img
//                         src={item.league.logo}
//                         alt={item.league.name}
//                         className="w-10 h-10 object-contain"
//                       />
//                     )}
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-sm">
//                         {item.league.name}
//                       </h3>
//                       <div className="flex items-center gap-2 mt-1">
//                         {item.country.flag && (
//                           <img
//                             src={item.country.flag}
//                             alt={item.country.name}
//                             className="w-4 h-3 object-cover rounded"
//                           />
//                         )}
//                         <p className="text-xs text-gray-600">
//                           {item.country.name}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Sample Countries */}
//         {countries && countries.response && countries.response.length > 0 && (
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Top Countries
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
//               {countries.response
//                 .slice(0, 12)
//                 .map((country: any, index: number) => (
//                   <div
//                     key={country.code || index}
//                     className="p-3 border border-gray-200 rounded-lg hover:border-green-400 hover:shadow-md transition-all text-center"
//                   >
//                     {country.flag && (
//                       <img
//                         src={country.flag}
//                         alt={country.name}
//                         className="w-12 h-8 object-cover rounded mx-auto mb-2 border border-gray-200"
//                       />
//                     )}
//                     <h3 className="font-medium text-xs">{country.name}</h3>
//                     {country.code && (
//                       <p className="text-xs text-gray-500">{country.code}</p>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}

//         {/* Sample Bet Types */}
//         {liveBets && liveBets.response && liveBets.response.length > 0 && (
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Popular Bet Types
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//               {liveBets.response.slice(0, 9).map((bet: any) => (
//                 <div
//                   key={bet.id}
//                   className="p-3 border-l-4 border-purple-400 bg-purple-50 rounded hover:bg-purple-100 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
//                       {bet.id}
//                     </span>
//                     <h3 className="text-sm font-medium text-gray-800">
//                       {bet.name}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* API Status */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">API Status</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="flex items-center gap-3">
//               <div
//                 className={`w-3 h-3 rounded-full ${
//                   leagues ? "bg-green-500" : "bg-red-500"
//                 }`}
//               ></div>
//               <span className="text-sm">
//                 Leagues API: {leagues ? "Active" : "Error"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <div
//                 className={`w-3 h-3 rounded-full ${
//                   countries ? "bg-green-500" : "bg-red-500"
//                 }`}
//               ></div>
//               <span className="text-sm">
//                 Countries API: {countries ? "Active" : "Error"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <div
//                 className={`w-3 h-3 rounded-full ${
//                   liveBets ? "bg-green-500" : "bg-red-500"
//                 }`}
//               ></div>
//               <span className="text-sm">
//                 Live Bets API: {liveBets ? "Active" : "Error"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
