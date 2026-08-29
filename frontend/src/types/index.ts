export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  gamification_profile?: GamificationProfile;
}

export interface GamificationProfile {
  xp: number;
  level: number;
  points: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  equipped_title: string;
  unlocked_titles: string[];
}

export interface Dataset {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  file_size_bytes: number;
  file_format: string;
  row_count: number;
  column_count: number;
  schema_metadata: Record<string, any>;
  created_at: string;
}

export interface MLModel {
  id: string;
  user_id: string;
  dataset_version_id: string;
  name: string;
  algorithm: string;
  problem_type: string;
  target_column?: string;
  feature_columns: { features: string[] };
  hyperparameters: Record<string, any>;
  created_at: string;
  evaluations: ModelEvaluation[];
}

export interface ModelEvaluation {
  id: string;
  model_id: string;
  split_type: string;
  metrics: Record<string, number>;
  confusion_matrix?: { matrix: number[][]; labels: string[] };
  feature_importances?: Record<string, number>;
  evaluated_at: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'insane';
  xp_reward: number;
  points_reward: number;
  requirements_config: { metric: string; threshold: number };
  user_status: 'not_started' | 'passed' | 'failed';
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  xp: number;
  level: number;
  equipped_title: string;
}
