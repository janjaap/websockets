import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  generates: {
    './types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
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
