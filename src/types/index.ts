// src/types/index.ts

export type Message = {
  id: string; // atau number, tergantung tipe di Supabase
  created_at: string;
  content: string;
  user_id: string;
};