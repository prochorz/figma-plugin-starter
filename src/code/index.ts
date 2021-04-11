/**
 * This plugin will open a window to prompt the user to enter a number, and
 * it will then create that many rectangles on the screen.
 *
 * This file holds the main code for the plugins. It has access to the *document*.
 * You can access browser APIs in the <script> tag inside "ui.html" which has a
 * full browser environment (see documentation).
 */
import './rpc';

import { publish } from './utils/services/post-message-rpc-service';

import { EVENT } from '../utils/constants/app-constants';

figma.showUI(__html__, { width: 300, height: 554 });

// событие из фигмы - выдиление любой ноды
figma.on('selectionchange', () => {
  const selected: any = figma.currentPage.selection.length ? figma.currentPage.selection[0] : null;

  const data = selected && {
    id: selected.id,
    type: selected.type,
    name: selected.name,
  };

  publish(EVENT.FIGMA_SELECT_SELECTION, data);
});
