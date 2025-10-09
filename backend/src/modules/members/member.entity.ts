import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Server } from '../servers/server.entity';
import { Message } from '../messages/message.entity';

export enum MemberStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LEFT = 'left',
}

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  discordUserId: string;

  @ManyToOne(() => Server, (server) => server.members, { onDelete: 'CASCADE' })
  server: Server;

  @Column()
  username: string;

  @CreateDateColumn()
  joinedAt: Date;

  @Column({ nullable: true })
  leftAt: Date;

  @UpdateDateColumn()
  lastActiveAt: Date;

  @Column({ default: false })
  isBot: boolean;

  @Column('text', { array: true, nullable: true })
  roleIds: string[];

  @Column({
    type: 'enum',
    enum: MemberStatus,
    default: MemberStatus.ACTIVE,
  })
  status: MemberStatus;

  @OneToMany(() => Message, (message) => message.member)
  messages: Message[]
}
