/*
 * We use gql.tada to automatically generate TypeScript types from the GraphQL
 * schema. This module customizes the default behavior of gql.tada to match the
 * DatoCMS schema of the project.
 *
 * For more information:
 * - https://gql-tada.0no.co/
 */

import type { introspection } from './graphql-env.js';
import type { TadaDocumentNode } from 'gql.tada';

import { initGraphQLTada } from 'gql.tada';

/**
 * The Content Delivery API exposes a number of custom GraphQL scalar types. For
 * each one, we must manually define an appropriate TypeScript type mapping.
 *
 * https://www.datocms.com/docs/content-delivery-api/custom-scalar-types
 */

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    BooleanType: boolean;
    CustomData: { [key: string]: string };
    Date: string;
    DateTime: string;
    FloatType: number;
    IntType: number;
    ItemId: string;
    JsonField: unknown;
    MetaTagAttributes: { [key: string]: string };
    UploadId: string;
  };
}>();

export { readFragment } from 'gql.tada';

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';

export type TypeFromQuery<T extends TadaDocumentNode> = T extends TadaDocumentNode<infer Q, any> ? Q : never;

export type VariablesFromQuery<T extends TadaDocumentNode> = T extends TadaDocumentNode<any, infer V> ? V : never;
