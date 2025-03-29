-- Create function to refresh schema cache
CREATE OR REPLACE FUNCTION public.refresh_schema_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Force a schema cache refresh
  PERFORM pg_notify('schema_refresh', '');
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.refresh_schema_cache() TO authenticated;
GRANT EXECUTE ON FUNCTION public.refresh_schema_cache() TO anon;

-- Ensure the bookings table exists with correct structure
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings') THEN
    CREATE TABLE public.bookings (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      service_id UUID REFERENCES public.services(id) NOT NULL,
      customer_name TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      email TEXT,
      booking_date DATE NOT NULL,
      booking_time TIME NOT NULL,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );

    -- Enable Row Level Security
    ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Enable read access for all users" ON public.bookings
      FOR SELECT USING (true);

    CREATE POLICY "Enable insert for authenticated users only" ON public.bookings
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Enable update for authenticated users only" ON public.bookings
      FOR UPDATE USING (true);

    CREATE POLICY "Enable delete for authenticated users only" ON public.bookings
      FOR DELETE USING (true);

    -- Create updated_at trigger
    CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON public.bookings
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$; 