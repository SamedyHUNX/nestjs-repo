import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  price: number;

  @Column()
  model: string;

  @Column({ default: false })
  approved: boolean;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @Column()
  make: string;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
