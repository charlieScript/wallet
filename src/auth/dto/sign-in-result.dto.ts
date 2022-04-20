import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../typeorm/entities/users.entity';

@ObjectType()
export class SignInResult extends User {
  @Field()
  readonly token: string;
}
