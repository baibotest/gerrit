// Copyright (C) 2013 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.gerrit.server.restapi.group;

import com.google.gerrit.extensions.common.GroupInfo;
import com.google.gerrit.extensions.restapi.RestReadView;
import com.google.gerrit.server.group.SubgroupResource;
import com.google.gerrit.server.permissions.PermissionBackendException;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class GetSubgroup implements RestReadView<SubgroupResource> {
  private final GroupJson json;

  @Inject
  GetSubgroup(GroupJson json) {
    this.json = json;
  }

  @Override
  public GroupInfo apply(SubgroupResource rsrc) throws PermissionBackendException {
    return json.format(rsrc.getMemberDescription());
  }
}
