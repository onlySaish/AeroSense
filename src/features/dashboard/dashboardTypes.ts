//Profile
export interface UserProfile {
  _id: string | null;
  avatar: string;
  username: string;
  fullName: string;
  email: string;
}

export interface ProfileDataPayload {
  username: string;
  fullName: string;
  email: string;
}

export interface Popup {
  visible: boolean;
  message: string;
  duration: number;
  type: 'success' | 'error';
}

export interface ProfileState {
  profileActiveContent: string;
  user: UserProfile;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  popup: Popup;
}

export interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
