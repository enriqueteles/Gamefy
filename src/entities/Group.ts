import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UserGroup } from './UserGroup';

@Entity("groups")
export class Group {
  
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  is_private: boolean;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserGroup, userGroup => userGroup.group)
  users!: UserGroup[];

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}
