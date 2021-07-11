/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'blog';

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  published: boolean;
  author: User | undefined;
}

export interface User {
  id: number;
  email: string;
  name: string;
  posts: Post[];
}

export interface FeedRequest {}

export interface FeedResponse {
  feed: Post[];
}

export interface FilterPostsRequest {
  searchString: string;
}

export interface FilterPostsResponse {
  filteredPosts: Post[];
}

export interface PostRequest {
  id: number;
}

export interface SignupUserRequest {
  name: string;
  email: string;
}

export interface CreateDraftRequest {
  title: string;
  content: string;
  authorEmail: string;
}

export interface PublishRequest {
  id: number;
}

export interface DeletePostRequest {
  id: number;
}

export const BLOG_PACKAGE_NAME = 'blog';

export interface BlogClient {
  /** Read operations */

  fetchFeed(request: FeedRequest): Observable<FeedResponse>;

  fetchFilterPosts(
    request: FilterPostsRequest,
  ): Observable<FilterPostsResponse>;

  fetchPost(request: PostRequest): Observable<Post>;

  /** Write operations */

  signupUser(request: SignupUserRequest): Observable<User>;

  createDraft(request: CreateDraftRequest): Observable<Post>;

  deletePost(request: DeletePostRequest): Observable<Post>;

  publish(request: PublishRequest): Observable<Post>;
}

export interface BlogController {
  /** Read operations */

  fetchFeed(
    request: FeedRequest,
  ): Promise<FeedResponse> | Observable<FeedResponse> | FeedResponse;

  fetchFilterPosts(
    request: FilterPostsRequest,
  ):
    | Promise<FilterPostsResponse>
    | Observable<FilterPostsResponse>
    | FilterPostsResponse;

  fetchPost(request: PostRequest): Promise<Post> | Observable<Post> | Post;

  /** Write operations */

  signupUser(
    request: SignupUserRequest,
  ): Promise<User> | Observable<User> | User;

  createDraft(
    request: CreateDraftRequest,
  ): Promise<Post> | Observable<Post> | Post;

  deletePost(
    request: DeletePostRequest,
  ): Promise<Post> | Observable<Post> | Post;

  publish(request: PublishRequest): Promise<Post> | Observable<Post> | Post;
}

export function BlogControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'fetchFeed',
      'fetchFilterPosts',
      'fetchPost',
      'signupUser',
      'createDraft',
      'deletePost',
      'publish',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Blog', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('Blog', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const BLOG_SERVICE_NAME = 'Blog';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
