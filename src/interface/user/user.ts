import type { Role } from './login';
import type { Device } from '@/interface/layout/index.interface';

export interface UserState {
  email: string;

  /** login status */
  logged: boolean;

  role: Role;

  /** user's device */
  device: Device;

  /** menu collapsed status */
  collapsed: boolean;

  /** notification count */
  noticeCount: number;

}
