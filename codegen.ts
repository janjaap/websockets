import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000',
  documents: 'apps/web/gql/*.graphql',
  config: {
    withHooks: true,
  },
  generates: {
    './apps/web/types/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-operations#arrayinputcoercion
        arrayInputCoercion: false,
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-operations#immutabletypes
        immutableTypes: true,
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-operations#dedupeoperationsuffix
        dedupeOperationSuffix: true,
        skipTypename: true,
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo#usetypeimports
        useTypeImports: true,
      },
    },
  },
};

export default config;
