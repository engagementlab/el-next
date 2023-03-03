type appConfigType = {
  [key: string]: {
    storageAccount: string;
    apexUrl: string;
  };
};

const appConfigMap: appConfigType = {
  tngvi: {
    storageAccount: 'tngvi',
    apexUrl: 'transformnarratives.org',
  },
  sjm: {
    storageAccount: 'sjmsymposium',
    apexUrl: 'sjmsymposium.org',
  },
  elab: { storageAccount: 'elabhome', apexUrl: '' },
};
export default appConfigMap;
