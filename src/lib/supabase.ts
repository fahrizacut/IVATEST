import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://drpagmyiblhtxzhpbhhy.supabase.co'

const supabaseAnonKey =
  'sb_publishable_fdQSvUR4dYTVcslpTejmRQ_SkLPTgSf'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)