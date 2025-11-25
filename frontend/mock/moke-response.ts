import { OverviewResponse } from "@/types/api-response";

export const mockOverview: OverviewResponse = {
  guildId: "123456789012345678",
  range: {
    from: "2025-10-01T00:00:00.000Z",
    to: "2025-10-31T23:59:59.999Z",
  },
  totals: {
    messages: 18452,
    joins: 237,
    activeMembers7d: 412,
    healthScore: 88,
  },
}