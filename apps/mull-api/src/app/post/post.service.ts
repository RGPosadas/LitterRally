import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelService } from '../channel/channel.service';
import { Post } from '../entities';
import { CreatePostInput, UpdatePostInput } from './inputs/post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private readonly channelService: ChannelService
  ) {}

  getPost(postId: number): Promise<Post> {
    return this.postRepository.findOne(postId, { relations: ['user', 'user.avatar', 'media'] });
  }

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getAllChannelPosts(channelId: number): Promise<Post[]> {
    return this.postRepository.find({ where: { channel: { id: channelId } } });
  }

  async createPost(input: CreatePostInput, userId: number): Promise<Post> {
    const channel = await this.channelService.getChannel(input.channel.id);
    if (channel.validateWritePermission(userId)) {
      return this.postRepository.save({ ...input, user: { id: userId } });
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async deletePost(postId: number): Promise<Post> {
    const post = await this.getPost(postId);
    await this.postRepository.delete(post.id);
    return post;
  }

  async updatePost(input: UpdatePostInput): Promise<Post> {
    await this.postRepository.update(input.id, { ...input });
    return this.getPost(input.id);
  }

  async getLatestPost(channelId: number): Promise<Post> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.channel', 'channel')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.media', 'media')
      .where('channel.id = :channelId', { channelId })
      .orderBy('post.createdTime', 'DESC')
      .getOne();
  }
}
