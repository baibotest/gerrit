/**
 * @license
 * Copyright (C) 2016 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import '../../../scripts/bundled-polymer.js';

import '../../../styles/shared-styles.js';
import '../../shared/gr-copy-clipboard/gr-copy-clipboard.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import {LegacyElementMixin} from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {htmlTemplate} from './gr-commit-info_html.js';
import {GerritNav} from '../../core/gr-navigation/gr-navigation.js';

/** @extends Polymer.Element */
class GrCommitInfo extends GestureEventListeners(
    LegacyElementMixin(
        PolymerElement)) {
  static get template() { return htmlTemplate; }

  static get is() { return 'gr-commit-info'; }

  static get properties() {
    return {
      change: Object,
      /** @type {?} */
      commitInfo: Object,
      serverConfig: Object,
      _showWebLink: {
        type: Boolean,
        computed: '_computeShowWebLink(change, commitInfo, serverConfig)',
      },
      _webLink: {
        type: String,
        computed: '_computeWebLink(change, commitInfo, serverConfig)',
      },
    };
  }

  _getWeblink(change, commitInfo, config) {
    return GerritNav.getPatchSetWeblink(
        change.project,
        commitInfo.commit,
        {
          weblinks: commitInfo.web_links,
          config,
        });
  }

  _computeShowWebLink(change, commitInfo, serverConfig) {
    // Polymer 2: check for undefined
    if ([change, commitInfo, serverConfig].some(arg => arg === undefined)) {
      return undefined;
    }

    const weblink = this._getWeblink(change, commitInfo, serverConfig);
    return !!weblink && !!weblink.url;
  }

  _computeWebLink(change, commitInfo, serverConfig) {
    // Polymer 2: check for undefined
    if ([change, commitInfo, serverConfig].some(arg => arg === undefined)) {
      return undefined;
    }

    const {url} = this._getWeblink(change, commitInfo, serverConfig) || {};
    return url;
  }

  _computeShortHash(commitInfo) {
    const {name} =
          this._getWeblink(this.change, commitInfo, this.serverConfig) || {};
    return name;
  }
}

customElements.define(GrCommitInfo.is, GrCommitInfo);
