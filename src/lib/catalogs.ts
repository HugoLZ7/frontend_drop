const AREA_CODES_URL = "https://countriesnow.space/api/v0.1/countries/codes";

const CENTRAL_AMERICA = ["SV", "GT", "HN", "NI", "CR", "PA", "BZ"];

export type AreaCode = { country: string; dialCode: string };

const FALLBACK_AREA_CODES: AreaCode[] = [
  { country: "El Salvador", dialCode: "+503" },
];

type CountryCode = { name: string; code: string; dial_code: string };

export async function getAreaCodes(): Promise<AreaCode[]> {
  try {
    const response = await fetch(AREA_CODES_URL, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) return FALLBACK_AREA_CODES;

    const json: { data: CountryCode[] } = await response.json();
    return json.data
      .filter((country) => CENTRAL_AMERICA.includes(country.code))
      .sort(
        (a, b) =>
          CENTRAL_AMERICA.indexOf(a.code) - CENTRAL_AMERICA.indexOf(b.code),
      )
      .map((country) => ({
        country: country.name,
        dialCode: country.dial_code,
      }));
  } catch {
    return FALLBACK_AREA_CODES;
  }
}
