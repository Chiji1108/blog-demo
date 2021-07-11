/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { Timestamp } from '../../google/protobuf/timestamp';

export const protobufPackage = 'blog';

export interface Post {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  content: string;
  published: boolean;
  author?: User;
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

const basePost: object = { id: 0, title: '', content: '', published: false };

export const Post = {
  encode(message: Post, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.title !== '') {
      writer.uint32(34).string(message.title);
    }
    if (message.content !== '') {
      writer.uint32(42).string(message.content);
    }
    if (message.published === true) {
      writer.uint32(48).bool(message.published);
    }
    if (message.author !== undefined) {
      User.encode(message.author, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Post {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePost } as Post;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          break;
        case 4:
          message.title = reader.string();
          break;
        case 5:
          message.content = reader.string();
          break;
        case 6:
          message.published = reader.bool();
          break;
        case 7:
          message.author = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Post {
    const message = { ...basePost } as Post;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = fromJsonTimestamp(object.createdAt);
    } else {
      message.createdAt = undefined;
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = fromJsonTimestamp(object.updatedAt);
    } else {
      message.updatedAt = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = '';
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = '';
    }
    if (object.published !== undefined && object.published !== null) {
      message.published = Boolean(object.published);
    } else {
      message.published = false;
    }
    if (object.author !== undefined && object.author !== null) {
      message.author = User.fromJSON(object.author);
    } else {
      message.author = undefined;
    }
    return message;
  },

  toJSON(message: Post): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined &&
      (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined &&
      (obj.updatedAt = message.updatedAt.toISOString());
    message.title !== undefined && (obj.title = message.title);
    message.content !== undefined && (obj.content = message.content);
    message.published !== undefined && (obj.published = message.published);
    message.author !== undefined &&
      (obj.author = message.author ? User.toJSON(message.author) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Post>): Post {
    const message = { ...basePost } as Post;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = undefined;
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = '';
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = '';
    }
    if (object.published !== undefined && object.published !== null) {
      message.published = object.published;
    } else {
      message.published = false;
    }
    if (object.author !== undefined && object.author !== null) {
      message.author = User.fromPartial(object.author);
    } else {
      message.author = undefined;
    }
    return message;
  },
};

const baseUser: object = { id: 0, email: '', name: '' };

export const User = {
  encode(message: User, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.email !== '') {
      writer.uint32(18).string(message.email);
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name);
    }
    for (const v of message.posts) {
      Post.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): User {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUser } as User;
    message.posts = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.posts.push(Post.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    const message = { ...baseUser } as User;
    message.posts = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = '';
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.posts !== undefined && object.posts !== null) {
      for (const e of object.posts) {
        message.posts.push(Post.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.email !== undefined && (obj.email = message.email);
    message.name !== undefined && (obj.name = message.name);
    if (message.posts) {
      obj.posts = message.posts.map((e) => (e ? Post.toJSON(e) : undefined));
    } else {
      obj.posts = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<User>): User {
    const message = { ...baseUser } as User;
    message.posts = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = '';
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    if (object.posts !== undefined && object.posts !== null) {
      for (const e of object.posts) {
        message.posts.push(Post.fromPartial(e));
      }
    }
    return message;
  },
};

const baseFeedRequest: object = {};

export const FeedRequest = {
  encode(_: FeedRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FeedRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFeedRequest } as FeedRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): FeedRequest {
    const message = { ...baseFeedRequest } as FeedRequest;
    return message;
  },

  toJSON(_: FeedRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<FeedRequest>): FeedRequest {
    const message = { ...baseFeedRequest } as FeedRequest;
    return message;
  },
};

const baseFeedResponse: object = {};

export const FeedResponse = {
  encode(message: FeedResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.feed) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FeedResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFeedResponse } as FeedResponse;
    message.feed = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feed.push(Post.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FeedResponse {
    const message = { ...baseFeedResponse } as FeedResponse;
    message.feed = [];
    if (object.feed !== undefined && object.feed !== null) {
      for (const e of object.feed) {
        message.feed.push(Post.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: FeedResponse): unknown {
    const obj: any = {};
    if (message.feed) {
      obj.feed = message.feed.map((e) => (e ? Post.toJSON(e) : undefined));
    } else {
      obj.feed = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<FeedResponse>): FeedResponse {
    const message = { ...baseFeedResponse } as FeedResponse;
    message.feed = [];
    if (object.feed !== undefined && object.feed !== null) {
      for (const e of object.feed) {
        message.feed.push(Post.fromPartial(e));
      }
    }
    return message;
  },
};

const baseFilterPostsRequest: object = { searchString: '' };

export const FilterPostsRequest = {
  encode(
    message: FilterPostsRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.searchString !== '') {
      writer.uint32(10).string(message.searchString);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FilterPostsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFilterPostsRequest } as FilterPostsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.searchString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FilterPostsRequest {
    const message = { ...baseFilterPostsRequest } as FilterPostsRequest;
    if (object.searchString !== undefined && object.searchString !== null) {
      message.searchString = String(object.searchString);
    } else {
      message.searchString = '';
    }
    return message;
  },

  toJSON(message: FilterPostsRequest): unknown {
    const obj: any = {};
    message.searchString !== undefined &&
      (obj.searchString = message.searchString);
    return obj;
  },

  fromPartial(object: DeepPartial<FilterPostsRequest>): FilterPostsRequest {
    const message = { ...baseFilterPostsRequest } as FilterPostsRequest;
    if (object.searchString !== undefined && object.searchString !== null) {
      message.searchString = object.searchString;
    } else {
      message.searchString = '';
    }
    return message;
  },
};

const baseFilterPostsResponse: object = {};

export const FilterPostsResponse = {
  encode(
    message: FilterPostsResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    for (const v of message.filteredPosts) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FilterPostsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFilterPostsResponse } as FilterPostsResponse;
    message.filteredPosts = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filteredPosts.push(Post.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FilterPostsResponse {
    const message = { ...baseFilterPostsResponse } as FilterPostsResponse;
    message.filteredPosts = [];
    if (object.filteredPosts !== undefined && object.filteredPosts !== null) {
      for (const e of object.filteredPosts) {
        message.filteredPosts.push(Post.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: FilterPostsResponse): unknown {
    const obj: any = {};
    if (message.filteredPosts) {
      obj.filteredPosts = message.filteredPosts.map((e) =>
        e ? Post.toJSON(e) : undefined,
      );
    } else {
      obj.filteredPosts = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<FilterPostsResponse>): FilterPostsResponse {
    const message = { ...baseFilterPostsResponse } as FilterPostsResponse;
    message.filteredPosts = [];
    if (object.filteredPosts !== undefined && object.filteredPosts !== null) {
      for (const e of object.filteredPosts) {
        message.filteredPosts.push(Post.fromPartial(e));
      }
    }
    return message;
  },
};

const basePostRequest: object = { id: 0 };

export const PostRequest = {
  encode(message: PostRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PostRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePostRequest } as PostRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PostRequest {
    const message = { ...basePostRequest } as PostRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: PostRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<PostRequest>): PostRequest {
    const message = { ...basePostRequest } as PostRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseSignupUserRequest: object = { name: '', email: '' };

export const SignupUserRequest = {
  encode(message: SignupUserRequest, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.email !== '') {
      writer.uint32(18).string(message.email);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SignupUserRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignupUserRequest } as SignupUserRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignupUserRequest {
    const message = { ...baseSignupUserRequest } as SignupUserRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = '';
    }
    return message;
  },

  toJSON(message: SignupUserRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  fromPartial(object: DeepPartial<SignupUserRequest>): SignupUserRequest {
    const message = { ...baseSignupUserRequest } as SignupUserRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = '';
    }
    return message;
  },
};

const baseCreateDraftRequest: object = {
  title: '',
  content: '',
  authorEmail: '',
};

export const CreateDraftRequest = {
  encode(
    message: CreateDraftRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.title !== '') {
      writer.uint32(10).string(message.title);
    }
    if (message.content !== '') {
      writer.uint32(18).string(message.content);
    }
    if (message.authorEmail !== '') {
      writer.uint32(26).string(message.authorEmail);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateDraftRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateDraftRequest } as CreateDraftRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.content = reader.string();
          break;
        case 3:
          message.authorEmail = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateDraftRequest {
    const message = { ...baseCreateDraftRequest } as CreateDraftRequest;
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = '';
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = '';
    }
    if (object.authorEmail !== undefined && object.authorEmail !== null) {
      message.authorEmail = String(object.authorEmail);
    } else {
      message.authorEmail = '';
    }
    return message;
  },

  toJSON(message: CreateDraftRequest): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.content !== undefined && (obj.content = message.content);
    message.authorEmail !== undefined &&
      (obj.authorEmail = message.authorEmail);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateDraftRequest>): CreateDraftRequest {
    const message = { ...baseCreateDraftRequest } as CreateDraftRequest;
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = '';
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = '';
    }
    if (object.authorEmail !== undefined && object.authorEmail !== null) {
      message.authorEmail = object.authorEmail;
    } else {
      message.authorEmail = '';
    }
    return message;
  },
};

const basePublishRequest: object = { id: 0 };

export const PublishRequest = {
  encode(message: PublishRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PublishRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePublishRequest } as PublishRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PublishRequest {
    const message = { ...basePublishRequest } as PublishRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: PublishRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<PublishRequest>): PublishRequest {
    const message = { ...basePublishRequest } as PublishRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseDeletePostRequest: object = { id: 0 };

export const DeletePostRequest = {
  encode(message: DeletePostRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeletePostRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeletePostRequest } as DeletePostRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeletePostRequest {
    const message = { ...baseDeletePostRequest } as DeletePostRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: DeletePostRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<DeletePostRequest>): DeletePostRequest {
    const message = { ...baseDeletePostRequest } as DeletePostRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

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

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
