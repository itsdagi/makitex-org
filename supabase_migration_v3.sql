-- Services Table
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  icon text, -- Lucide icon name or image URL
  image_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Testimonials Table
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text,
  content text,
  image_url text,
  rating integer default 5,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site Settings (Key-Value)
create table if not exists site_settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text,
  category text default 'general', -- hero, about, contact, etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Initial Hero Settings
insert into site_settings (key, value, category) values 
('hero_badge', 'Pioneering the Urban Horizon', 'hero'),
('hero_title', 'Design Beyond Build.', 'hero'),
('hero_description', 'Makitex Trading PLC integrates cutting-edge architecture with industrial-grade construction to deliver timeless masterpieces.', 'hero'),
('hero_phone', '+251 911 234 567', 'hero'),
('about_title', 'The Makitex Standard', 'about'),
('about_description', 'Founded on the principles of precision and innovation, Makitex Trading PLC has evolved into a premier architectural and construction firm in East Africa.', 'about');

-- Initial Services Seed
insert into services (title, description, icon, display_order) values 
('Architectural Design', 'Bespoke architectural solutions that harmonize aesthetics with functional excellence.', 'Pencil', 1),
('General Construction', 'Turnkey construction services for commercial, residential, and industrial sectors.', 'Hammer', 2),
('Interior Excellence', 'Curated interior spaces that reflect identity and foster inspiration.', 'Layout', 3),
('Landscape Integration', 'Sustainable outdoor environments that bridge the gap between nature and structure.', 'Trees', 4);

-- Initial Testimonials Seed
insert into testimonials (name, role, content, rating, display_order) values 
('Elias Solomon', 'CEO, Zemen Bank', 'Makitex delivered our headquarters ahead of schedule with craftsmanship that exceeded our international benchmarks.', 5, 1),
('Sara Bekele', 'Lead Architect', 'The attention to detail and ability to handle complex structural challenges makes them our go-to partner.', 5, 2);
