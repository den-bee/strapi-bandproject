import type { CodegenConfig } from '@graphql-codegen/cli'

const render = "https://strapi-bandproject.onrender.com/graphql/?populate=*"

const local = "http://host.docker.internal:1338/graphql/?populate=*";
 
const config: CodegenConfig = {
   schema: render,
   documents: ['src/**/*.tsx'],
   generates: {
      './src/gql/': {
        preset: 'client',
      }
   }
}

export default config