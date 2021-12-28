import { UserEntity } from 'src/users/model/users.model';
import {
    BeforeUpdate,
    Column,
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('article')
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    body: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;    

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }

    @Column({default: 0})
    likes: number;

    @Column({nullable: true})
    headerImage: string;

    @Column({nullable: true})
    publishedDate: Date;

    @Column({nullable: true})
    isPublished: boolean;

    @ManyToOne(type => UserEntity, user => user.articles)
    author: UserEntity;
}