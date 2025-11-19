import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Event } from './analytics.entity';

interface RecordEventDto {
  guildId: string;
  userId: string;
  channelId?: string;
  event: string;
  timestamp: Date;
}

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(@InjectRepository(Event) private readonly eventRepo: Repository<Event>) { }

  async recordEvent(data: RecordEventDto): Promise<void> {
    try {
      const event = this.eventRepo.create(data);
      await this.eventRepo.save(event);
    } catch (err) {
      this.logger.error('Failed to record event', err);
    }
  }


  async getGuildJoins(guildId: string, from?: Date, to?: Date): Promise<number> {
    const where: any = { guildId, event: 'guildMemberAdd' };
    if (from && to) where.timestamp = Between(from, to);

    return this.eventRepo.count({ where });
  }


  async getMessageCount(guildId: string, from?: Date, to?: Date): Promise<number> {
    const where: any = { guildId, event: 'messageCreate' };
    if (from && to) where.timestamp = Between(from, to);

    return this.eventRepo.count({ where });
  }


  async getTopActiveUsers(guildId: string, limit = 10) {
    return this.eventRepo
      .createQueryBuilder('event')
      .select('event.userId', 'userId')
      .addSelect('COUNT(event.id)', 'messageCount')
      .where('event.guildId = :guildId', { guildId })
      .andWhere('event.event = :event', { event: 'messageCreate' })
      .groupBy('event.userId')
      .orderBy('COUNT(event.id)', 'DESC')
      .limit(limit)
      .getRawMany();
  }


  async getDailyActivity(guildId: string, eventType: string) {
    return this.eventRepo
      .createQueryBuilder('event')
      .select("DATE_TRUNC('day', event.timestamp)", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('event.guildId = :guildId', { guildId })
      .andWhere('event.event = :eventType', { eventType })
      .groupBy("DATE_TRUNC('day', event.timestamp)")
      .orderBy('date', 'ASC')
      .getRawMany();
  }


  async getHourlyActivity(guildId: string) {
    return this.eventRepo
      .createQueryBuilder('event')
      .select("EXTRACT(HOUR FROM event.timestamp)", 'hour')
      .addSelect('COUNT(*)', 'count')
      .where('event.guildId = :guildId', { guildId })
      .andWhere('event.event = :event', { event: 'messageCreate' })
      .groupBy('hour')
      .orderBy('hour', 'ASC')
      .getRawMany();
  }

  async getTopChannels(guildId: string, limit = 10) {
    return this.eventRepo
      .createQueryBuilder('event')
      .select('event.channelId', 'channelId')
      .addSelect('COUNT(event.id)', 'messageCount')
      .where('event.guildId = :guildId', { guildId })
      .andWhere('event.event = :event', { event: 'messageCreate' })
      .andWhere('event.channelId IS NOT NULL')
      .groupBy('event.channelId')
      .orderBy('COUNT(event.id)', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getDistinctSenders(guildId: string, from: Date, to: Date) {
    const rows = await this.eventRepo
      .createQueryBuilder('event')
      .select('event.userId', 'userId')
      .where('event.guildId = :guildId', { guildId })
      .andWhere('event.event = :event', { event: 'messageCreate' })
      .andWhere('event.timestamp BETWEEN :from AND :to', { from, to })
      .groupBy('event.userId')
      .getRawMany();

    return rows.length;
  }

}
