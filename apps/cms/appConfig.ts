type appConfigType = {
  [key: string]: {
    storageAccount: string;
    apexUrl: string;
    cdnName?: string;
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
  elab: {
    storageAccount: 'elabapps',
    apexUrl: 'elab.emerson.edu',
    cdnName: 'engagementlab',
  },
};
export default appConfigMap;
