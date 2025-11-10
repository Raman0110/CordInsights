import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guildId: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  channelId?: string;

  @Column()
  event: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
