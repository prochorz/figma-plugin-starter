import { caller } from './post-message-rpc-service';

import { RPC } from '../../../utils/constants/rpc-constants';

const API = {
  getSelectedNode(): Promise<SceneNode> {
    return caller(RPC.GET_NODE);
  },
  setRandomFillByNodeId(nodeId: string): Promise<void> {
    return caller(RPC.SET_RANDOM_FILL, nodeId);
  },
};

export { API };
