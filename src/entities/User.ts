import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UserGroup } from './UserGroup';

@Entity("users")
export class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @Column()
  is_super: boolean;
  
  @Column()
  image_medium_url: string;
  
  @Column()
  username: string;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserGroup, userGroup => userGroup.user)
  groups!: UserGroup[];

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}
