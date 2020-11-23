import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CreateEventInput = {
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  image: MediaInput;
  restriction: Scalars['Int'];
  startDate: Scalars['DateTime'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  registrationMethod: RegistrationMethod;
};


export type Event = {
  __typename?: 'Event';
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  image?: Maybe<Media>;
  restriction: Scalars['Float'];
  startDate: Scalars['DateTime'];
  title: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  accessToken: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  id: Scalars['Float'];
  mediaType: Scalars['String'];
};

export type MediaInput = {
  id: Scalars['Float'];
  mediaType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Event;
  createUser: User;
  deleteEvent: Event;
  deleteUser: User;
  joinEvent: Scalars['Boolean'];
  leaveEvent: Scalars['Boolean'];
  login: LoginResult;
  updateEvent: Event;
  updateUser: User;
  uploadFile: Media;
};


export type MutationCreateEventArgs = {
  event: CreateEventInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationJoinEventArgs = {
  eventId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationLeaveEventArgs = {
  eventId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateEventArgs = {
  event: UpdateEventInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  coHostEvents: Array<Event>;
  discoverEvents: Array<Event>;
  event: Event;
  events: Array<Event>;
  hostEvents: Array<Event>;
  participantEvents: Array<Event>;
  user: User;
  users: Array<User>;
};


export type QueryCoHostEventsArgs = {
  coHostId: Scalars['Int'];
};


export type QueryDiscoverEventsArgs = {
  userId: Scalars['Int'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};


export type QueryHostEventsArgs = {
  hostId: Scalars['Int'];
};


export type QueryParticipantEventsArgs = {
  userId: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export enum RegistrationMethod {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Local = 'LOCAL',
  Twitter = 'TWITTER'
}

export type UpdateEventInput = {
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  restriction?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  dob?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  description: Scalars['String'];
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  friends: Array<User>;
  id: Scalars['ID'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  registrationMethod: RegistrationMethod;
  timezone: Scalars['String'];
};

export type CreateEventMutationVariables = Exact<{
  event: CreateEventInput;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent: (
    { __typename?: 'Event' }
    & Pick<Event, 'id'>
  ) }
);

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = (
  { __typename?: 'Mutation' }
  & { uploadFile: (
    { __typename?: 'Media' }
    & Pick<Media, 'id' | 'mediaType'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'accessToken'>
  ) }
);

export type EventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventQuery = (
  { __typename?: 'Query' }
  & { event: (
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'restriction'>
  ) }
);

export type DiscoverEventsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type DiscoverEventsQuery = (
  { __typename?: 'Query' }
  & { discoverEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate'>
  )> }
);

export type OwnedEventsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type OwnedEventsQuery = (
  { __typename?: 'Query' }
  & { coHostEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate'>
  )>, hostEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate'>
  )> }
);

export type ParticipantEventsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type ParticipantEventsQuery = (
  { __typename?: 'Query' }
  & { participantEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'endDate' | 'description' | 'startDate' | 'title'>
  )> }
);


export const CreateEventDocument = gql`
    mutation CreateEvent($event: CreateEventInput!) {
  createEvent(event: $event) {
    id
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, baseOptions);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    id
    mediaType
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, baseOptions);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const EventDocument = gql`
    query Event($id: Int!) {
  event(id: $id) {
    id
    title
    description
    startDate
    endDate
    restriction
  }
}
    `;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, baseOptions);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, baseOptions);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const DiscoverEventsDocument = gql`
    query DiscoverEvents($userId: Int!) {
  discoverEvents(userId: $userId) {
    id
    title
    description
    startDate
    endDate
  }
}
    `;

/**
 * __useDiscoverEventsQuery__
 *
 * To run a query within a React component, call `useDiscoverEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscoverEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiscoverEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDiscoverEventsQuery(baseOptions: Apollo.QueryHookOptions<DiscoverEventsQuery, DiscoverEventsQueryVariables>) {
        return Apollo.useQuery<DiscoverEventsQuery, DiscoverEventsQueryVariables>(DiscoverEventsDocument, baseOptions);
      }
export function useDiscoverEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiscoverEventsQuery, DiscoverEventsQueryVariables>) {
          return Apollo.useLazyQuery<DiscoverEventsQuery, DiscoverEventsQueryVariables>(DiscoverEventsDocument, baseOptions);
        }
export type DiscoverEventsQueryHookResult = ReturnType<typeof useDiscoverEventsQuery>;
export type DiscoverEventsLazyQueryHookResult = ReturnType<typeof useDiscoverEventsLazyQuery>;
export type DiscoverEventsQueryResult = Apollo.QueryResult<DiscoverEventsQuery, DiscoverEventsQueryVariables>;
export const OwnedEventsDocument = gql`
    query OwnedEvents($userId: Int!) {
  coHostEvents(coHostId: $userId) {
    id
    title
    description
    startDate
    endDate
  }
  hostEvents(hostId: $userId) {
    id
    title
    description
    startDate
    endDate
  }
}
    `;

/**
 * __useOwnedEventsQuery__
 *
 * To run a query within a React component, call `useOwnedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnedEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useOwnedEventsQuery(baseOptions: Apollo.QueryHookOptions<OwnedEventsQuery, OwnedEventsQueryVariables>) {
        return Apollo.useQuery<OwnedEventsQuery, OwnedEventsQueryVariables>(OwnedEventsDocument, baseOptions);
      }
export function useOwnedEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OwnedEventsQuery, OwnedEventsQueryVariables>) {
          return Apollo.useLazyQuery<OwnedEventsQuery, OwnedEventsQueryVariables>(OwnedEventsDocument, baseOptions);
        }
export type OwnedEventsQueryHookResult = ReturnType<typeof useOwnedEventsQuery>;
export type OwnedEventsLazyQueryHookResult = ReturnType<typeof useOwnedEventsLazyQuery>;
export type OwnedEventsQueryResult = Apollo.QueryResult<OwnedEventsQuery, OwnedEventsQueryVariables>;
export const ParticipantEventsDocument = gql`
    query ParticipantEvents($userId: Int!) {
  participantEvents(userId: $userId) {
    id
    endDate
    description
    startDate
    title
  }
}
    `;

/**
 * __useParticipantEventsQuery__
 *
 * To run a query within a React component, call `useParticipantEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useParticipantEventsQuery(baseOptions: Apollo.QueryHookOptions<ParticipantEventsQuery, ParticipantEventsQueryVariables>) {
        return Apollo.useQuery<ParticipantEventsQuery, ParticipantEventsQueryVariables>(ParticipantEventsDocument, baseOptions);
      }
export function useParticipantEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantEventsQuery, ParticipantEventsQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantEventsQuery, ParticipantEventsQueryVariables>(ParticipantEventsDocument, baseOptions);
        }
export type ParticipantEventsQueryHookResult = ReturnType<typeof useParticipantEventsQuery>;
export type ParticipantEventsLazyQueryHookResult = ReturnType<typeof useParticipantEventsLazyQuery>;
export type ParticipantEventsQueryResult = Apollo.QueryResult<ParticipantEventsQuery, ParticipantEventsQueryVariables>;