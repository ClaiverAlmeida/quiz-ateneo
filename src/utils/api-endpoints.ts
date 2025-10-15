const normalizeBase = (base: string) =>
  base.endsWith("/") ? base.slice(0, -1) : base;

const ensureApiSuffix = (base: string) =>
  base.endsWith("/api") ? base : `${base}/api`;

export function getSubmitQuizEndpoint(): string {
  const nextBase =
    typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_API_BASE_URL ?? ""
      : "";
  const viteBase =
    typeof import.meta !== "undefined" && (import.meta as any).env
      ? ((import.meta as any).env.VITE_API_BASE_URL as string | undefined) ?? ""
      : "";

  let baseUrl = (nextBase || viteBase || "").trim();

  if (!baseUrl && typeof window !== "undefined") {
    const origin = window.location.origin;

    if (origin.includes("localhost:5173")) {
      // Ambiente padrão do Vite: assume backend Next em 3000
      return "http://localhost:3000/api/submit-quiz";
    }

    baseUrl = origin;
  }

  if (!baseUrl) {
    return "/api/submit-quiz";
  }

  const normalizedBase = ensureApiSuffix(normalizeBase(baseUrl));
  return `${normalizedBase}/submit-quiz`;
}
  