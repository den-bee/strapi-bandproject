/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GetBiographies {\n    biographies {\n      data {\n        id\n        attributes {\n          title\n          content\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetBiographiesDocument,
    "\nquery GetDiscography {\n    discographies {\n      data {\n        id\n        attributes {\n          title\n          tracklist\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetDiscographyDocument,
    "\nquery GetAllPosts($limit: Int) {\n    posts(sort: \"published_datetime:DESC\", pagination: { limit: $limit }) {\n      data {\n        id\n        attributes {\n          title\n          content\n          published_datetime\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "\nquery GetPostsByYear {\n    posts(sort: \"published_datetime:DESC\") {\n      data {\n        id\n        attributes {\n          title\n          content\n          published_datetime\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetPostsByYearDocument,
    "\nquery GetOlderPosts {\n  posts(sort: \"published_datetime:DESC\") {\n    data {\n      id\n      attributes {\n        title\n        content\n        published_datetime\n        image {\n          data {\n            attributes {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": types.GetOlderPostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetBiographies {\n    biographies {\n      data {\n        id\n        attributes {\n          title\n          content\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery GetBiographies {\n    biographies {\n      data {\n        id\n        attributes {\n          title\n          content\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetDiscography {\n    discographies {\n      data {\n        id\n        attributes {\n          title\n          tracklist\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery GetDiscography {\n    discographies {\n      data {\n        id\n        attributes {\n          title\n          tracklist\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAllPosts($limit: Int) {\n    posts(sort: \"published_datetime:DESC\", pagination: { limit: $limit }) {\n      data {\n        id\n        attributes {\n          title\n          content\n          published_datetime\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery GetAllPosts($limit: Int) {\n    posts(sort: \"published_datetime:DESC\", pagination: { limit: $limit }) {\n      data {\n        id\n        attributes {\n          title\n          content\n          published_datetime\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetPostsByYear {\n    posts(sort: \"published_datetime:DESC\") {\n      data {\n        id\n        attributes {\n          title\n          content\n          published_datetime\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery GetPostsByYear {\n    posts(sort: \"published_datetime:DESC\") {\n      data {\n        id\n        attributes {\n          title\n          content\n          published_datetime\n          image {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetOlderPosts {\n  posts(sort: \"published_datetime:DESC\") {\n    data {\n      id\n      attributes {\n        title\n        content\n        published_datetime\n        image {\n          data {\n            attributes {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetOlderPosts {\n  posts(sort: \"published_datetime:DESC\") {\n    data {\n      id\n      attributes {\n        title\n        content\n        published_datetime\n        image {\n          data {\n            attributes {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;