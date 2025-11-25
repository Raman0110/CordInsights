export type OverviewResponse = {
  guildId: string
  range: { from: string | null; to: string | null }
  totals: {
    messages: number
    joins: number
    activeMembers7d: number
    healthScore: number // 0–100
  }
}