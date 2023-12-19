import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
/**
 * request or authorization to call APIs.
 */
async function authorize() {
  const client = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.FAIRMOUNT_API_GOOGLE),
    scopes: SCOPES,
  });

  return client;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  /**
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */
  async function getResponses(auth: any) {
    const sheets = google.sheets({ version: 'v4', auth });
    try {
      const res = await sheets.spreadsheets.get({
        spreadsheetId: req.query.spreadsheetId,
      });
      const rowCount = res.data.sheets[0].properties.gridProperties.rowCount;
      const resValues = await sheets.spreadsheets.values.get({
        spreadsheetId: req.query.spreadsheetId,
        range: `Form Responses 1!B2:D${rowCount}`,
      });

      const rows = resValues.data.values;
      if (!rows || rows.length === 0)
        return { status: 204, body: { msg: 'No data found.' } };

      return { status: 200, body: { msg: rows } };
      // rows
      //   .filter((r) => r[2] === 'Approved')
      //   .forEach((row) => {
      //     console.log(row);
      //   });
    } catch (e) {
      console.error(e);
      return { status: 500, body: { msg: e } };
    }
  }

  const auth = await authorize();
  const response = await getResponses(auth);
  context.res = response;
  // .catch((e) => {
  //   console.error(e);
  //   context.res = { status: 500, body: { msg: e } };
  // });
};

export default httpTrigger;
