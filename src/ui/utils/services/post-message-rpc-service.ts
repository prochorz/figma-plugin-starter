import { caller as originCaller, expose as originExpose } from 'postmsg-rpc';
import Logger from '../../../utils/services/simple-logger-service';

const logger = new Logger('UI', 'yellow');

const serverOptions = {
  getMessageData: (event) => event.data.pluginMessage,
  isCallback: true,
};

const clientOptions = {
  getMessageData: (event) => event.data.pluginMessage,
  postMessage: (msg, targetOrigin) => {
    window.parent.postMessage(
      {
        pluginMessage: {
          type: msg.func,
          state: msg.args,
          ...msg,
        },
      },
      targetOrigin,
    );
  },
};

function caller(eventName: string, ...props: any) {
  logger.watch('caller', eventName, ...props);
  const localeCaller = originCaller(eventName, clientOptions);
  const promise = localeCaller(...props);
  setTimeout(promise.cancel, 30000);
  return promise
    .then((res) => {
      logger.watch('caller', eventName, res);
      return res;
    })
    .catch((error) => {
      logger.error('caller', `${eventName}: canceled caller`, error);
    });
}

function expose(eventName: string, callback: (...arg: any) => void) {
  logger.event('subscribe', eventName, callback.name);
  return originExpose(eventName, callback, serverOptions);
}

export { caller, expose as subscribe };
