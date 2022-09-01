import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { UserInfo } from '../app/models/userInfo'
import { UserAdd } from './user.actions';

export class UserStateModel {
  public user: UserInfo ;
}

// const defaults = {
//   items: []
// };

@State<UserStateModel>({
  name: 'user'
})
@Injectable()
export class UserState {
  @Action(UserAdd)
  add({ getState, setState }: StateContext<UserStateModel>, { payload }: UserAdd) {
    const state = getState();
    setState({ user: payload });
  }
}
