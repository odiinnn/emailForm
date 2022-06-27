/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Json: any;
};

export type AddFormResponse = {
  __typename?: 'AddFormResponse';
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addForm: AddFormResponse;
};


export type MutationAddFormArgs = {
  credits: Scalars['String'];
  dateOfBirth: Scalars['Date'];
  email: Scalars['String'];
  message?: InputMaybe<Scalars['String']>;
  number: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  debug?: Maybe<Scalars['Json']>;
};

export type AddFormMutationVariables = Exact<{
  credits: Scalars['String'];
  email: Scalars['String'];
  number: Scalars['Float'];
  dateOfBirth: Scalars['Date'];
  message?: InputMaybe<Scalars['String']>;
}>;


export type AddFormMutation = { __typename?: 'Mutation', addForm: { __typename?: 'AddFormResponse', status: string } };


export const AddFormDocument = gql`
    mutation AddForm($credits: String!, $email: String!, $number: Float!, $dateOfBirth: Date!, $message: String) {
  addForm(
    credits: $credits
    email: $email
    number: $number
    dateOfBirth: $dateOfBirth
    message: $message
  ) {
    status
  }
}
    `;
export type AddFormMutationFn = Apollo.MutationFunction<AddFormMutation, AddFormMutationVariables>;

/**
 * __useAddFormMutation__
 *
 * To run a mutation, you first call `useAddFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFormMutation, { data, loading, error }] = useAddFormMutation({
 *   variables: {
 *      credits: // value for 'credits'
 *      email: // value for 'email'
 *      number: // value for 'number'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useAddFormMutation(baseOptions?: Apollo.MutationHookOptions<AddFormMutation, AddFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFormMutation, AddFormMutationVariables>(AddFormDocument, options);
      }
export type AddFormMutationHookResult = ReturnType<typeof useAddFormMutation>;
export type AddFormMutationResult = Apollo.MutationResult<AddFormMutation>;
export type AddFormMutationOptions = Apollo.BaseMutationOptions<AddFormMutation, AddFormMutationVariables>;