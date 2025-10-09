import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Server } from '../servers/server.entity';

@Entity('role_activity_stats')
export class RoleActivityStats {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Server, (server) => server.roleActivityStats, { onDelete: 'CASCADE' })
  server: Server;

  @Column()
  roleId: string;

  @Column()
  roleName: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: 0 })
  messagesSent: number;

  @Column({ default: 0 })
  activeUsers: number;
}
