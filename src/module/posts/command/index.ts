import { CreatePostHandler } from './create-post';
import { DeletePostHandler } from './delete-post';
import { UpdatePostHandler } from './update-post';

export const COMMANDS = [CreatePostHandler, DeletePostHandler, UpdatePostHandler];
