module.exports = {
  ci: {
    collect: {
      settings: {
        //set which categories you want to run here.
        onlyCategories: ['accessibility'],
      },
    },
    assert: {
      assertions: {
        // 'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 1 }],
      },
    },
  },
};
