import { GraphQLError } from 'graphql';
import { GraphQLContext } from '../graphql/context';

export function requireAuth(context: GraphQLContext) {
  if (!context.user) {
    throw new GraphQLError('Authentication required', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
  return context.user;
}

export function optionalAuth(context: GraphQLContext) {
  return context.user || null;
}


export function requireRole(
  context: GraphQLContext,
  allowedRoles: ('ADMIN' | 'VENDOR' | 'USER')[]
) {
  const user = requireAuth(context);
  if (!user.role || !allowedRoles.includes(user.role)) {
    throw new GraphQLError('Forbidden: insufficient role', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
  return user;
}
