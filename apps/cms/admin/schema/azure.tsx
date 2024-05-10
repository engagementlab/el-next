import {
  AzureStorageDataType,
  GetFileNameFunc,
} from '@el-next/fields-azure/src/lib/types';

if (
  !process.env.AZURE_STORAGE_ACCOUNT ||
  !process.env.AZURE_STORAGE_ACCESS_KEY ||
  !process.env.AZURE_STORAGE_CONTAINER
)
  throw new Error(
    `Please provide AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY, AZURE_STORAGE_CONTAINER`
  );

type AzureStorageConfig = {
  transformFilename?: (str: string) => string;
  getFilename?: (args: GetFileNameFunc) => string;
  getUrl?: (
    config: AzureStorageConfig,
    fileData: AzureStorageDataType
  ) => string;
  azureStorageOptions: {
    account: string;
    accessKey: string;
    container: string;
    url?: string;
  };
};
const azConfig: AzureStorageConfig = {
  azureStorageOptions: {
    account: process.env.AZURE_STORAGE_ACCOUNT,
    accessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
    container: process.env.AZURE_STORAGE_CONTAINER,
    url: process.env.AZURE_STORAGE_URL,
  },
};

const azConfigCustom = (container: string) => {
  const config: AzureStorageConfig = {
    azureStorageOptions: {
      account: process.env.AZURE_STORAGE_ACCOUNT || '',
      accessKey: process.env.AZURE_STORAGE_ACCESS_KEY || '',
      container,
      url: process.env.AZURE_STORAGE_URL,
    },
  };
  return config;
};
export { azConfig, azConfigCustom };
