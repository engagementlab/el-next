import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  if (!accountName) throw Error('Azure Storage accountName not found');

  try {
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new DefaultAzureCredential()
    );
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient('downloads');

    console.log(req.body);
    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(req.body.name);
    // Upload data to the blob
    await blockBlobClient.upload(req.body.file, req.body.file.length);

    context.res = {
      body: {
        url: `https://files.elab.works/downloads/${req.body.name}`,
      },
    };
  } catch (e) {
    context.log(e);
    context.res = { body: `Error: ${e.message}` };
  }
};

export default httpTrigger;
