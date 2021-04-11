import React, { useState, useEffect } from 'react';

import Style from './assets/styles/app.module.scss';

import { ASvgIcon } from './components/atoms/a-svg-icon';

import { API } from './utils/services/api-service';
import { subscribe } from './utils/services/post-message-rpc-service';
import { VERSION } from '../env';
import { EVENT } from '../utils/constants/app-constants';

export default function App(): JSX.Element {
  const [focusedNode, setFocusedNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  async function onClickHandler() {
    const node = await API.getSelectedNode();
    setSelectedNode(node);
  }

  function setRandomColor() {
    API.setRandomFillByNodeId(selectedNode.id);
  }

  useEffect(() => {
    const selectionsSub = subscribe(EVENT.FIGMA_SELECT_SELECTION, (node) => {
      setFocusedNode(node);
    });
    return selectionsSub.close;
  }, []);

  return (
    <div className={Style.app}>
      <ASvgIcon path="logo" className={Style['app--logo']} />
      <table className={Style['app--table']}>
        <tbody>
          <tr>
            <td colSpan={2}>
              <small>Focused Element:</small>
              <br />
              {JSON.stringify(focusedNode, null, ' ')}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <small>Selected Element:</small>
              <br />
              {JSON.stringify(selectedNode, null, ' ')}
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={onClickHandler}>
                Get node
              </button>
            </td>
            <td>
              {selectedNode?.id && (
                <button type="button" onClick={setRandomColor}>
                  Change color
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <span>v {VERSION}</span>
    </div>
  );
}
