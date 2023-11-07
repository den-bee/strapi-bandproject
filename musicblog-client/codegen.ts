import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
   schema: 'http://host.docker.internal:1338/graphql/?populate=*',
   documents: ['src/**/*.tsx'],
   generates: {
      './src/gql/': {
        preset: 'client',
      }
   }
}
export default config