export type Role = 'Admin' | 'Teacher' | 'Student' | 'NoRole';

export interface UserDetails extends User {
  role: Role;
}

export interface User {
  id: string;
  name: string;
  roleId?: string;
}
