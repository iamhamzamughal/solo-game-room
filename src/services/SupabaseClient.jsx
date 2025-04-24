import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aedhmxnyfzxywvemmisk.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZGhteG55Znp4eXd2ZW1taXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTQ0MDksImV4cCI6MjA2MTA3MDQwOX0.85HBMJfLCsEhDFxmweFf4P_frXrxFZwjAyuBCK9bJMA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
