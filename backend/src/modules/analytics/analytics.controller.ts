import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";

type Iso = string | undefined;

function parseRange(from?: Iso, to?: Iso): { from?: Date; to?: Date } {
  const out: { from?: Date; to?: Date } = {};
  if (from) {
    const fromDate = new Date(from);
    if (!isNaN(fromDate.getTime())) out.from = fromDate;
  }
  if (to) {
    const toDate = new Date(to);
    if (!isNaN(toDate.getTime())) out.to = toDate;
  }
  return out;
}

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) { }

  /**
   * High-level snapshot for the dashboard sidebar/header.
   * Returns: totalMessages, joins, activeMembers(7d), healthScore (simple heuristic)
   *
   * GET /analytics/:guildId/overview?from=2025-10-01&to=2025-10-31
   */
  @Get(':guildId/overview')
  async getOverview(
    @Param('guildId') guildId: string,
    @Query('from') from?: Iso,
    @Query('to') to?: Iso,
  ) {
    const { from: f, to: t } = parseRange(from, to);

    const [messages, joins] = await Promise.all([
      this.analytics.getMessageCount(guildId, f, t),
      this.analytics.getGuildJoins(guildId, f, t),
    ]);

    // Active members = distinct senders in last 7 days (independent of query range)
    const last7 = new Date();
    last7.setDate(last7.getDate() - 7);
    const activeLast7 = await this.analytics.getDistinctSenders(guildId, last7, new Date());

    // Very simple health score (0-100): weight activity & growth
    // Tweak later to your liking.
    const healthScore = Math.min(
      100,
      Math.round((activeLast7 * 0.6) + (joins * 4)),
    );

    return {
      guildId,
      range: { from: f ?? null, to: t ?? null },
      totals: {
        messages,
        joins,
        activeMembers7d: activeLast7,
        healthScore,
      },
    };
  }

  /**
   * GET /analytics/:guildId/messages/count?from=&to=
   */
  @Get(':guildId/messages/count')
  async getMessagesCount(
    @Param('guildId') guildId: string,
    @Query('from') from?: Iso,
    @Query('to') to?: Iso,
  ) {
    const { from: f, to: t } = parseRange(from, to);
    const count = await this.analytics.getMessageCount(guildId, f, t);
    return { guildId, range: { from: f ?? null, to: t ?? null }, count };
  }

  /**
   * GET /analytics/:guildId/joins/count?from=&to=
   */
  @Get(':guildId/joins/count')
  async getJoinsCount(
    @Param('guildId') guildId: string,
    @Query('from') from?: Iso,
    @Query('to') to?: Iso,
  ) {
    const { from: f, to: t } = parseRange(from, to);
    const count = await this.analytics.getGuildJoins(guildId, f, t);
    return { guildId, range: { from: f ?? null, to: t ?? null }, count };
  }

  /**
   * GET /analytics/:guildId/top-users?limit=10
   */
  @Get(':guildId/top-users')
  async getTopUsers(
    @Param('guildId') guildId: string,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    const rows = await this.analytics.getTopActiveUsers(guildId, limit);
    return { guildId, limit, users: rows };
  }

  /**
   * GET /analytics/:guildId/top-channels?limit=10
   */
  @Get(':guildId/top-channels')
  async getTopChannels(
    @Param('guildId') guildId: string,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    const rows = await this.analytics.getTopChannels(guildId, limit);
    return { guildId, limit, channels: rows };
  }

  /**
   * GET /analytics/:guildId/activity/daily?type=messageCreate
   * type = 'messageCreate' | 'guildMemberAdd' | 'guildMemberRemove' | 'messageDelete'
   */
  @Get(':guildId/activity/daily')
  async getDaily(
    @Param('guildId') guildId: string,
    @Query('type') type = 'messageCreate',
  ) {
    const rows = await this.analytics.getDailyActivity(guildId, type);
    // Normalize keys for charts
    return {
      guildId,
      type,
      series: rows.map((r) => ({ date: r.date, count: Number(r.count) })),
    };
  }

  /**
   * GET /analytics/:guildId/activity/hourly
   * Returns distribution of messageCreate by hour (0-23)
   */
  @Get(':guildId/activity/hourly')
  async getHourly(@Param('guildId') guildId: string) {
    const rows = await this.analytics.getHourlyActivity(guildId);
    return {
      guildId,
      series: rows.map((r) => ({ hour: Number(r.hour), count: Number(r.count) })),
    };
  }
}