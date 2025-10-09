import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Server } from "../servers/server.entity";
import { Channel } from "../channels/channel.entity";
import { Member } from "../members/member.entity";


@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(() => Server, (server) => server.messages)
  server: Server

  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel: Channel

  @ManyToOne(() => Member, (member) => member.messages)
  member: Member

  @Column()
  messageId: string

  @Column({ default: 0 })
  contentLength: number;

  @CreateDateColumn()
  timestamp: Date;
}