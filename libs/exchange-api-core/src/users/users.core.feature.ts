import { UsersSchema, Users } from './user.core.schema';

export const UsersCoreFeature = {
  name: Users.name,
  useFactory: async () => {
    return UsersSchema;
  },
};
