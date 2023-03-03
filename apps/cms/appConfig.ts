import { tngvi, sjm, elab } from './admin/schema';

type appConfigType = {
  [key: string]: {
    schema: object;
    storageAccount: string;
    apexUrl: string;
  };
};

const appConfigMap: appConfigType = {
  tngvi: {
    schema: tngvi,
    storageAccount: 'tngvi',
    apexUrl: 'transformnarratives.org',
  },
  sjm: {
    schema: sjm,
    storageAccount: 'sjmsymposium',
    apexUrl: 'sjmsymposium.org',
  },
  elab: { schema: elab, storageAccount: 'elabhome', apexUrl: '' },
};
export default appConfigMap;
