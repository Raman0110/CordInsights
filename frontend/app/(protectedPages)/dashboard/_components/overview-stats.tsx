// app/(app)/dashboard/_components/overview-stats.tsx
import { StatsCard } from "@/components/ui/dashboard/stats-card"
import { mockOverview } from "@/mock/moke-response"
import { MessageSquare, UserPlus, Users, Activity } from "lucide-react"

export function OverviewStats() {
  const { messages, joins, activeMembers7d, healthScore } = mockOverview.totals

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Messages"
        value={messages.toLocaleString()}
        icon={MessageSquare}
        description="Messages in selected range"
      />

      <StatsCard
        title="New Joins"
        value={joins.toLocaleString()}
        icon={UserPlus}
        description="Members joined in this range"
      />

      <StatsCard
        title="Active Members (7d)"
        value={activeMembers7d.toLocaleString()}
        icon={Users}
        description="Unique senders in the last 7 days"
      />

      <StatsCard
        title="Health Score"
        value={`${healthScore}%`}
        icon={Activity}
        description="Overall community health"
      />
    </div>
  )
}
