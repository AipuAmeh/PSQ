import { GraphQLError } from 'graphql';

export default  {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
        code: 'UNAUTHENTICATED',
    },
}),
    BadRequestError: new GraphQLError('email not found', {
    extensions: {
        code: 'BAD_USER_INPUT'
    }
})
};
