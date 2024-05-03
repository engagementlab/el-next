import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';
import busboy = require('busboy');

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

    const dataFromReq = req.body as Buffer;
    const fileName = req.query.name.toLocaleLowerCase().replace(/\s+/gi, '-');

    // Create a promise that resolves only after file is fully upload to prevent premature response
    return new Promise((resolve, reject) => {
      const bb = busboy({
        headers: { 'content-type': req.headers['content-type'] },
      });

      // Monitor piped filestream and then begin upload
      bb.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('data', async function (data) {
          // Get a reference to a container
          const containerClient =
            blobServiceClient.getContainerClient('downloads');

          // Get a block blob client
          const blockBlobClient = containerClient.getBlockBlobClient(fileName);

          // Upload data to the blob
          await blockBlobClient.uploadData(data as Buffer);
          context.res = {
            body: {
              url: `https://files.elab.works/downloads/${fileName}`,
            },
          };
          resolve();
        });
      });

      bb.write(dataFromReq);
    });
  } catch (e) {
    context.log(e);
    context.res = { status: 500, body: `Error: ${e.message}` };
  }
};

export default httpTrigger;
