import { createParamDecorator, ExecutionContext } from '@nestjs/common'; export const CurrentUser = createParamDecorator((data, ctx) => ctx.switchToHttp().getRequest().user);
