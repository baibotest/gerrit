// Copyright (C) 2015 The Android Open Source Project
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

package com.google.gerrit.server.query.change;

import static com.google.gerrit.server.index.change.ChangeField.AUTHOR;
import static com.google.gerrit.server.query.change.ChangeQueryBuilder.FIELD_AUTHOR;

import com.google.gerrit.server.index.change.ChangeField;
import com.google.gwtorm.server.OrmException;
import java.io.IOException;

public class AuthorPredicate extends ChangeIndexPredicate {
  AuthorPredicate(String value) {
    super(AUTHOR, FIELD_AUTHOR, value.toLowerCase());
  }

  @Override
  public boolean match(ChangeData object) throws OrmException {
    try {
      return ChangeField.getAuthorParts(object).contains(getValue().toLowerCase());
    } catch (IOException e) {
      throw new OrmException(e);
    }
  }

  @Override
  public int getCost() {
    return 1;
  }
}