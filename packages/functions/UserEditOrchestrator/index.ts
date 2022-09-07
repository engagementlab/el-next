import * as df from 'durable-functions';

const orchestrator = df.orchestrator(function* (context) {
  const result = yield context.df.callActivity(
    'PersonProfileEdit',
    context.df.getInput()
  );

  context.df.setCustomStatus(result);
});

export default orchestrator;
