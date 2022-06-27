import Mutation from './mutation';
import {GraphQLScalarType} from 'graphql';

const resolvers = {
    Mutation: Mutation.Mutation,
    Date: new GraphQLScalarType<Date, string>({
        name: 'Date',
        parseValue(value) {
            return new Date(value as string);
        },
        serialize(value) {
            return (value as Date).toISOString();
        }
    })
};
export default resolvers;
