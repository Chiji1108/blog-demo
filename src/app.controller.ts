import { Controller } from '@nestjs/common';
import {
  BlogControllerMethods,
  BlogController,
  CreateDraftRequest,
  DeletePostRequest,
  FeedResponse,
  FilterPostsRequest,
  FilterPostsResponse,
  Post,
  PostRequest,
  PublishRequest,
  SignupUserRequest,
  User,
} from 'src/proto/src/proto/blog';
import { PrismaService } from 'src/prisma.service';

@Controller()
@BlogControllerMethods()
export class AppController implements BlogController {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchFeed(): Promise<FeedResponse> {
    const feed = await this.prismaService.post.findMany({
      where: { published: true },
      include: {
        author: true,
      },
    });

    return FeedResponse.fromPartial({ feed });
  }

  async fetchFilterPosts({
    searchString,
  }: FilterPostsRequest): Promise<FilterPostsResponse> {
    const filteredPosts = await this.prismaService.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
            },
          },
          {
            content: {
              contains: searchString,
            },
          },
        ],
      },
      include: {
        author: true,
      },
    });

    return FilterPostsResponse.fromPartial({ filteredPosts });
  }

  async fetchPost({ id }: PostRequest): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: { author: true },
    });

    return Post.fromPartial(post);
  }

  async signupUser({ name, email }: SignupUserRequest): Promise<User> {
    const user = await this.prismaService.user.create({
      data: { name, email },
    });
    return User.fromPartial(user);
  }

  async createDraft({
    title,
    content,
    authorEmail,
  }: CreateDraftRequest): Promise<Post> {
    const post = await this.prismaService.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } },
      },
    });

    return Post.fromPartial(post);
  }

  async deletePost({ id }: DeletePostRequest): Promise<Post> {
    const post = await this.prismaService.post.delete({ where: { id } });

    return Post.fromPartial(post);
  }

  async publish({ id }: PublishRequest): Promise<Post> {
    const post = await this.prismaService.post.update({
      where: { id },
      data: { published: true },
    });

    return Post.fromPartial(post);
  }
}
