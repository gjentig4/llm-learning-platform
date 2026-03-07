import { OpenRouterTool } from "./openrouter";

export const AVAILABLE_TOOLS: OpenRouterTool[] = [
  {
    type: "function",
    function: {
      name: "get_current_datetime",
      description:
        "Get the current date and time. Use this when the user asks about the current date, time, day of the week, or anything time-related.",
      parameters: {
        type: "object",
        properties: {
          timezone: {
            type: "string",
            description:
              "Timezone (e.g., 'Europe/Brussels', 'America/New_York'). Defaults to UTC if not specified.",
          },
          format: {
            type: "string",
            enum: ["full", "date_only", "time_only"],
            description:
              "Output format. 'full' includes date and time, 'date_only' just the date, 'time_only' just the time.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_weather",
      description:
        "Get current weather information for a city or location. Returns temperature, conditions, humidity, and wind speed.",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description:
              "City name (e.g., 'Prishtina', 'Brussels', 'New York')",
          },
          units: {
            type: "string",
            enum: ["celsius", "fahrenheit"],
            description: "Temperature units (default: celsius)",
          },
        },
        required: ["location"],
      },
    },
  },
];

export async function executeTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
  switch (name) {
    case "get_current_datetime":
      return getDateTime(args.timezone as string, args.format as string);
    case "get_weather":
      return await getWeather(args.location as string, args.units as string);
    default:
      return {
        error: `Unknown tool: ${name}`,
        availableTools: AVAILABLE_TOOLS.map((t) => t.function.name),
      };
  }
}

function getDateTime(timezone?: string, format?: string) {
  const tz = timezone || "UTC";
  const now = new Date();

  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const parts = dateFormatter.formatToParts(now);

    const getPart = (type: string) =>
      parts.find((p) => p.type === type)?.value || "";

    const fullDate = `${getPart("weekday")}, ${getPart("month")} ${getPart("day")}, ${getPart("year")}`;
    const fullTime = `${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;

    if (format === "date_only") {
      return { date: fullDate, timezone: tz, iso: now.toISOString().split("T")[0] };
    }

    if (format === "time_only") {
      return { time: fullTime, timezone: tz };
    }

    return {
      datetime: `${fullDate} at ${fullTime}`,
      date: fullDate,
      time: fullTime,
      timezone: tz,
      iso: now.toISOString(),
      unix_timestamp: Math.floor(now.getTime() / 1000),
    };
  } catch {
    return {
      datetime: now.toUTCString(),
      timezone: "UTC (fallback - invalid timezone provided)",
      iso: now.toISOString(),
      unix_timestamp: Math.floor(now.getTime() / 1000),
    };
  }
}

// Weather condition codes from Open-Meteo WMO
const WMO_CODES: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

async function getWeather(location: string, units: string = "celsius") {
  try {
    // Step 1: Geocode the location using Open-Meteo
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return { error: `Could not find location: ${location}` };
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Get current weather
    const tempUnit = units === "fahrenheit" ? "fahrenheit" : "celsius";
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=${tempUnit}`
    );
    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    const tempCelsius =
      units === "fahrenheit"
        ? Math.round(((current.temperature_2m - 32) * 5) / 9)
        : current.temperature_2m;
    const tempFahrenheit =
      units === "fahrenheit"
        ? current.temperature_2m
        : Math.round((current.temperature_2m * 9) / 5 + 32);

    return {
      location: `${name}, ${country}`,
      temperature: `${current.temperature_2m}°${units === "fahrenheit" ? "F" : "C"}`,
      temperature_celsius: tempCelsius,
      temperature_fahrenheit: tempFahrenheit,
      condition: WMO_CODES[current.weather_code] ?? `Code ${current.weather_code}`,
      humidity: `${current.relative_humidity_2m}%`,
      wind_speed: `${current.wind_speed_10m} km/h`,
      units: units || "celsius",
      timestamp: new Date().toISOString(),
      source: "Open-Meteo (real-time data)",
    };
  } catch (err) {
    return {
      error: `Failed to fetch weather: ${err instanceof Error ? err.message : "unknown error"}`,
      location,
    };
  }
}
