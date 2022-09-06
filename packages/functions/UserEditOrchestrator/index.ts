import * as df from 'durable-functions';

const orchestrator = df.orchestrator(function* (context) {
  const result = yield context.df.callActivity(
    'PersonProfileEdit',
    context.df.getInput()
  );
  context.log(result);
  //   context.df.setCustomStatus(response.token);
});

export default orchestrator;
