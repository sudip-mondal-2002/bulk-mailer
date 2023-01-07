import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {UserEntity} from "./UserEntity";
@Entity({name: 'email_templates'})
export class EmailEntity {
    @PrimaryGeneratedColumn()
    id = 0;

    @Column('varchar', {length: 5000, nullable: false})
    body: string;
    
    @Column({type: "boolean", default: false})
    is_private: boolean;

    @ManyToOne(type=>UserEntity)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: UserEntity;

    @Column({type: "timestamp", default: "now()"})
    created_at: Date = new Date();

    @Column({type: "timestamp"})
    updated_at: Date = new Date();

    constructor(body: string, user: UserEntity, is_private=false) {
        this.body = body
        this.user = user
        this.is_private = is_private
    }
}
