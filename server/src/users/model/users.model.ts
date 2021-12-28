import {
    BeforeInsert,
    Column,
    Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRole } from '../interface/users.interface';
import { ArticleEntity } from 'src/articles/model/articles.model';


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @Column({nullable: true})
    avatar: string;

    @OneToMany(type => ArticleEntity, articleEntity => articleEntity.author)
    articles: ArticleEntity[];

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}