import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreatePostRequestSchema = z.object({
    text: z.string(),
    title: z.string(),
});

const CreatePostResponseSchema = z.object({
    uuid: z.string(),
});

export namespace CreatePostCommand {
    export const RequestSchema = CreatePostRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = CreatePostResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}

export class CreatePostDto extends createZodDto(CreatePostCommand.RequestSchema) {}

export class CreatePostResponseDto extends createZodDto(CreatePostCommand.ResponseSchema) {}
