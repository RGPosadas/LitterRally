import { Post } from '../entities';
import { mockAllUsers } from '../user/user.mockdata';
import { CreatePostInput, UpdatePostInput } from './inputs/post.input';

const userA = mockAllUsers[0]; // id: 1
const userB = mockAllUsers[1]; // id: 7
const userC = mockAllUsers[2]; // id: 3

export const mockPartialPosts: CreatePostInput | UpdatePostInput = {
  id: 22,
  user: { id: 23 },
  message: 'This is a post',
  createdTime: new Date('2020-10-27T01:31:00.000Z'),
  channel: { id: 2 },
};

export const mockAllPosts: Post[] = [
  {
    id: 23,
    user: userA,
    message: 'This the first post',
    createdTime: new Date('2020-10-27T01:31:00.000Z'),
    channel: {
      id: 1,
      name: 'private',
      rights: 0,
      posts: [],
      participants: mockAllUsers,
    },
  },

  {
    id: 24,
    user: userB,
    message: 'This the 2nd post',
    createdTime: new Date('2020-10-27T01:31:00.000Z'),
    channel: {
      id: 1,
      name: 'private',
      rights: 0,
      posts: [],
      participants: mockAllUsers,
    },
  },
  {
    id: 25,
    user: userC,
    message: 'This the 3rd post',
    createdTime: new Date('2020-10-27T01:31:00.000Z'),
    channel: {
      id: 1,
      name: 'private',
      rights: 0,
      posts: [],
      participants: mockAllUsers,
    },
  },
];