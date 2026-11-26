import { JWT } from 'google-auth-library';
import { educationalGames, gameVoteEvent } from './educationalGames';

interface Report {
  rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
}

export async function loadEducationalGameRanking() {
  const property = process.env.GA4_PROPERTY_ID?.trim();
  const credentials = process.env.GA4_RANKING_CREDENTIALS;
  if (!property || !credentials) return null;

  try {
    if (!/^\d+$/.test(property)) throw new Error('Invalid property ID');
    const key = JSON.parse(credentials);
    if (key.type !== 'service_account' || !key.client_email || !key.private_key) {
      throw new Error('Invalid credentials');
    }

    const client = new JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });
    const { data } = await client.request<Report>({
      url: `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`,
      method: 'POST',
      timeout: 15_000,
      data: {
        dateRanges: [{ startDate: '2026-11-24', endDate: 'today' }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            inListFilter: { values: educationalGames.map((game) => gameVoteEvent(game.slug)), caseSensitive: true },
          },
        },
      },
    });

    const totals = new Map(
      (data.rows ?? []).map((row) => [row.dimensionValues[0].value, Number(row.metricValues[0].value)]),
    );
    const games = educationalGames
      .map((game) => ({ ...game, votes: totals.get(gameVoteEvent(game.slug)) ?? 0 }))
      .filter((game) => Number.isSafeInteger(game.votes) && game.votes > 0)
      .sort((a, b) => b.votes - a.votes || a.title.localeCompare(b.title, 'pt-BR'));

    let position = 0;
    return games.map((game, index) => {
      if (game.votes !== games[index - 1]?.votes) position = index + 1;
      return { ...game, position };
    });
  } catch {
    // Avoid logging authentication or HTTP request details from the Google client.
    throw new Error('Não foi possível ler a apuração do GA4. Confira o ID da propriedade, o acesso de leitura e a Analytics Data API.');
  }
}
