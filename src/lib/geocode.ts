export async function searchLocations(query: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
  );
  const data = await response.json();

  return data.map((item: any) => ({
    name: item.display_name,
    latitude: parseFloat(item.lat),
    longitude: parseFloat(item.lon),
  }));
}
