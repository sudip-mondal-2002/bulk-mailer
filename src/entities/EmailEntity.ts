import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {UserEntity} from "./UserEntity";
@Entity({name: 'email_templates'})
export class EmailEntity {
    @PrimaryGeneratedColumn()
    id = 0;

    @Column('varchar', {length: 5000, nullable: false})
    body: string;

    @ManyToOne(type=>UserEntity)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @Column({type: "timestamp", default: "now()"})
    created_at: Date = new Date();

    @Column({type: "timestamp"})
    updated_at: Date = new Date();

    constructor(body: string, user: UserEntity) {
        this.body = body
        this.user = user
    }
}
