import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "../members/member.entity";
import { Channel } from "../channels/channel.entity";
import { Message } from "../messages/message.entity";
import { DailyServerStats } from "../stats/daily-server-stats.entity";
import { DailyChannelStats } from "../stats/daily-channel-stats.entity";
import { RoleActivityStats } from "../stats/role-activity-stats.entity";
import { Alert } from "../alerts/alert.entity";
import { Report } from "../reports/report.entity";
import { User } from "../users/user.entity";


@Entity("server")
export class Server {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  discordGuildId: string

  @Column()
  name: string

  @Column({ nullable: true })
  iconUrl: string;

  @Column()
  ownerId: string;

  @CreateDateColumn()
  connectedAt: Date;

  @Column({ default: 'free' })
  plan: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Member, (member) => member.server)
  members: Member[]

  @OneToMany(() => Channel, (channel) => channel.server)
  channels: Channel[]

  @OneToMany(() => Message, (message) => message.server)
  messages: Message[]

  @OneToMany(() => DailyServerStats, (dailyStats) => dailyStats.server)
  dailyStats: DailyServerStats[]

  @OneToMany(() => DailyChannelStats, (dailyChannelStats) => dailyChannelStats.server)
  dailyChannelStats: DailyChannelStats[]

  @OneToMany(() => RoleActivityStats, (roleActivityStats) => roleActivityStats.server)
  roleActivityStats: RoleActivityStats[]

  @OneToMany(() => Alert, (alert) => alert.server)
  alerts: Alert[]

  @OneToMany(() => Report, (report) => report.server)
  reports: Report[]

  @ManyToOne(() => User, (user) => user.servers)
  owner: User
}