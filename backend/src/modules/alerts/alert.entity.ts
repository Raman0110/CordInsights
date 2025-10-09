import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Server } from '../servers/server.entity';

export enum AlertType {
  DROP_IN_ACTIVITY = 'drop_in_activity',
  GROWTH_SPIKE = 'growth_spike',
  RETENTION_WARNING = 'retention_warning',
}

export enum AlertStatus {
  UNREAD = 'unread',
  READ = 'read',
  RESOLVED = 'resolved',
}

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Server, (server) => server.alerts, { onDelete: 'CASCADE' })
  server: Server;

  @Column({ type: 'enum', enum: AlertType })
  type: AlertType;

  @Column('text')
  message: string;

  @CreateDateColumn()
  detectedAt: Date;

  @Column({ type: 'enum', enum: AlertStatus, default: AlertStatus.UNREAD })
  status: AlertStatus;
}
