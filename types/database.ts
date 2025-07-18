export type UserPlan = 'free' | 'plus';

export interface UserMetadata {
  id: string;
  user_id: string;
  plan: UserPlan;
  daily_regenerations: number;
  regeneration_reset_at: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  company_name?: string;
  company_achievements?: string;
  contact_info?: string;
  personal_name?: string;
  personal_bio?: string;
  achievements?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  service_name: string;
  redirect_url?: string;
  purpose?: 'product' | 'service' | 'brand' | 'lead' | 'event';
  service_description?: string;
  main_copy?: string;
  cta_text?: string;
  service_achievements?: string;
  custom_head?: string;
  custom_body?: string;
  generated_html?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SwipeResult {
  id: string;
  project_id: string;
  warm_score: number;
  cool_score: number;
  mono_score: number;
  vivid_score: number;
  friendly_score: number;
  professional_score: number;
  creative_score: number;
  minimal_score: number;
  energetic_score: number;
  trustworthy_score: number;
  luxurious_score: number;
  approachable_score: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status?: string;
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}