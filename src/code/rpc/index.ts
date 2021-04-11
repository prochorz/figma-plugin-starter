import { RPC } from '../../utils/constants/rpc-constants';
import { expose } from '../utils/services/post-message-rpc-service';

expose(RPC.SET_RANDOM_FILL, (nodeId: string) => {
  const node = figma.getNodeById(nodeId) as any;

  const randomNumber = () => {
    return Math.floor(Math.random() * 10000) / 10000;
  };

  node.fills = node.fills.map((item) => {
    return {
      ...item,
      color: {
        r: randomNumber(),
        g: randomNumber(),
        b: randomNumber(),
      },
    };
  });
});

expose(
  RPC.GET_NODE,
  (): Promise<SceneNode> => {
    const selected: SceneNode = figma.currentPage.selection.length ? figma.currentPage.selection[0] : null;

    return selected ? Promise.resolve(selected) : Promise.reject(Error('node not find'));
  },
);
