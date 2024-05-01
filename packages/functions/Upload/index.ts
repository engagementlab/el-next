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

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(req.body.name);

    const fileBuffer = Buffer.from(req.body.file);
    console.log(typeof req.body.file, fileBuffer);
    // Upload data to the blob
    const response = await blockBlobClient.uploadData(fileBuffer);

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
