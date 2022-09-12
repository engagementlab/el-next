import * as df from 'durable-functions';

const orchestrator = df.orchestrator(function* (context) {
  const response = yield context.df.callActivity(
    'UserCreate',
    context.df.getInput()
  );
  yield context.df.callActivity('PersonProfileCreate', {
    userId: response.userId,
    input: response.body,
  });
  context.df.setCustomStatus(response.token);
});

export default orchestrator;
