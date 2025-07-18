import { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  plan?: 'free' | 'plus';
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface AuthError {
  code: string;
  message: string;
}