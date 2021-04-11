import { caller as originCaller, expose as originExpose } from 'postmsg-rpc';
import Logger from '../../../utils/services/simple-logger-service';

const logger = new Logger('CODE', 'orange');

const serverOptions = {
  addListener: figma.ui.on,
  removeListener: figma.ui.off,
  postMessage: figma.ui.postMessage,
  getMessageData: (event) => event,
  targetOrigin: { origin: '*' },
  isCallback: false,
};

const clientOptions = {
  addListener: figma.ui.on,
  removeListener: figma.ui.off,
  postMessage: figma.ui.postMessage,
  targetOrigin: { origin: '*' },
};

function caller(eventName: string, ...props: any) {
  logger.event('publish', eventName, ...props);
  const localCaller = originCaller(eventName, clientOptions);
  return localCaller(...props);
}

function expose(eventName: string, callback: (...arg: any) => void) {
  logger.event('expose', eventName, callback.name);
  return originExpose(eventName, callback, serverOptions);
}

export { caller as publish, expose };
