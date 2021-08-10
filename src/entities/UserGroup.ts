import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Group } from './Group';
import { User } from './User';

@Entity("user_group")
export class UserGroup {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @Column()
    group_id: string;

    @Column()
    is_admin: boolean;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user : User) => user.groups)
    @JoinColumn({ name: 'user_id' })
    user: User;  

    @ManyToOne(() => Group, (group : Group) => group.users)
    @JoinColumn({ name: 'group_id' })
    group: Group;

    constructor(is_admin: boolean, user: User, group: Group) {
      if(!this.id) {
        this.id = uuid();
      }
      this.is_admin = is_admin;
      this.user = user;
      this.group = group;
    }
}
