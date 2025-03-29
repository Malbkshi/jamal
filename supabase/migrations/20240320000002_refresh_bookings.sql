-- Drop existing table and recreate
DROP TABLE IF EXISTS public.bookings CASCADE;

-- Create bookings table with explicit schema
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id TEXT REFERENCES public.services(id) NOT NULL,
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON public.bookings;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.bookings;
DROP POLICY IF EXISTS "Enable update for all users" ON public.bookings;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.bookings;

-- Create new policies
CREATE POLICY "Enable read access for all users" ON public.bookings
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON public.bookings
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON public.bookings
    FOR DELETE USING (true);

-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS set_updated_at ON public.bookings;
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- Create the handle_updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Grant permissions
GRANT ALL ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO anon;

-- Force schema cache refresh
NOTIFY pgrst, 'reload schema'; 