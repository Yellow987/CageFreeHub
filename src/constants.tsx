enum Stage {
  PROD,
  PREPROD,
  DEV
}

const stageMap: { [key: string]: Stage } = {
  'prod': Stage.PROD,
  'preprod': Stage.PREPROD,
  'dev': Stage.DEV,
};

export const stage = stageMap[process.env.REACT_APP_STAGE || 'dev'];

const logRocketEnvironmentMap = {
  [Stage.PROD]: 'rufgqm/cagefreehub-prod',
  [Stage.PREPROD]: 'rufgqm/cagefreehub-staging',
  [Stage.DEV]: 'rufgqm/cagefreehub-staging',
};

export const logRocketEnvironment = logRocketEnvironmentMap[stage];