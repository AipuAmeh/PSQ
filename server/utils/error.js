import { GraphQLError } from 'graphql';

export default  {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
        code: 'UNAUTHENTICATED',
    },
})
};
