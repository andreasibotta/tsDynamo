// config.ts
// Defines configuration variables for our runtime environments

type Config = {
    endpoint: string;
    tableName: string
  };
  
  const baseConfig: Config = {
    endpoint: 'http://localhost:4569',
    tableName: 'testTable',
  };
  
  const currentEnvironment = process.env.LAMBDA_ENV ?? '';
  
  const environments: { [env: string]: Config } = {
    staging: {
      endpoint: '',
      tableName: ''
    },
    production: {
        endpoint: '',
        tableName: ''
    },
  };
  
  export const config = {
    ...baseConfig,
    ...environments[currentEnvironment],
  };

  