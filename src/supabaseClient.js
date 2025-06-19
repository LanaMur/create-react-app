// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpalfgwfybdsnbpwhzin.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwYWxmZ3dmeWJkc25icHdoemluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyOTUwNDcsImV4cCI6MjA2Mzg3MTA0N30.nXgXojgaMN178w782hh0QxZVkLOgpkV7NKncxU8QTMo';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;