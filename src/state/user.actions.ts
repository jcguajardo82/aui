import { UserInfo } from '../app/models/userInfo'

export class UserAdd {
  static readonly type = '[User] Add';
  constructor(public payload: UserInfo) { }
}
// export class UserGet {
//     static readonly type = '[User] Get';
//   }
