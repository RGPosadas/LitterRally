import { IMedia } from '@mull/types';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
@ObjectType()
export class Media implements IMedia {
  constructor(mediaType: string) {
    this.mediaType = mediaType;
  }
  @Field()
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  @Field()
  mediaType: string;

  @ManyToOne(() => Post, (post) => post.medias)
  post: Post;
}
