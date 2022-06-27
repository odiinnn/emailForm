import {GraphQLError} from 'graphql';
import {prisma} from '../tools/Prisma';
import * as PrismaClient from '@prisma/client';

enum statusOfSending {
    error = 'error',
    success = 'success'
}

async function addCardData(input: {
    prisma: PrismaClient.PrismaClient,
    credits: string
    email: string
    number: number
    dateOfbirth: Date
    message?: string | null
   }
) {
    const {credits, email, number, dateOfbirth, message} = input;
    await input.prisma.userForm.create({
        data: {
            credits,
            email,
            number,
            dateOfbirth,
            message
        }
    });
}

const mutation = {
    Mutation: {
        addForm: async (_parent: unknown, args: { credits: string, email: string, number: number, dateOfBirth: Date, message: string }) => {
            const {credits, email, number, dateOfBirth, message} = args;
            if (!credits) {
                throw new GraphQLError('No credits');
            }
            if (!email) {
                throw new GraphQLError('No email');
            }
            if (!number) {
                throw new GraphQLError('No number');
            }
            if (!dateOfBirth) {
                throw new GraphQLError('No dateOfBirth');
            }
            try {
                await addCardData({
                    prisma,
                    credits,
                    email,
                    number,
                    dateOfbirth: dateOfBirth,
                    message
                });
                return {
                    status: statusOfSending.success
                };
            } catch (e) {
                return {
                    status: statusOfSending.error
                };
            }

        }
    }
};

export default mutation;
