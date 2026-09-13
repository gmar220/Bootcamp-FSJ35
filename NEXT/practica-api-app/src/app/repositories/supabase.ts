import {createClient} from '@supabase/supabase-js'

const supabaseUrl = "https://qsdirvvveyfmhkfxlall.supabase.co";
const supabaseKey = "sb_publishable_9zWZfHZy62QWpNnFTlIDvw_5TtjB3N2";

//Creamos la conexion con supabase

export const supabase = createClient(supabaseUrl,supabaseKey);