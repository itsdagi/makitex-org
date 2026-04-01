-- Blogs Table
create table if not exists blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  category text,
  author text default 'Admin',
  image_url text,
  published boolean default true,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Projects Table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text,
  content text,
  category text,
  client text,
  location text,
  completion_year integer,
  image_url text,
  gallery_images text[],
  before_image text,
  after_image text,
  display_order integer default 0,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Quote Requests Table
create table if not exists quote_requests (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  project_type text,
  budget text,
  timeline text,
  details text,
  status text default 'pending', -- pending, reviewed, contacted, rejected
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Initial Blogs Seed
insert into blogs (title, slug, excerpt, content, category, author, image_url, featured) values
('The Future of Sustainable Construction in Ethiopia', 'future-sustainable-construction', 'Exploring how local materials and modern engineering are redefining urban living in Addis Ababa.', '# The Future of Sustainable Construction\n\nEthiopia is at a turning point in architectural history...', 'Innovation', 'Eng. Samuel K.', 'https://images.unsplash.com/photo-1518005020251-095c1a2702c1?q=80&w=800', true),
('10 Principles of High-Performance Modern Homes', 'modern-homes-principles', 'What makes a modern residence truly ''high-performance''? From thermal mass to smart automation.', '# 10 Principles of High-Performance Modern Homes\n\n1. **Thermal Mass**: Building with local stone...\n\n...', 'Design', 'Ark. Helen T.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800', false),
('Navigating Complex Infrastructure Projects', 'navigating-infrastructure', 'A deep dive into the logistical and engineering challenges of our most ambitious span projects.', '# Complex Infrastructure\n\nBuilding in diverse terrains requires adaptability and precision.', 'Engineering', 'Eng. Elias W.', 'https://images.unsplash.com/photo-1513360309081-38f0d12739a7?q=80&w=800', false);

-- Initial Projects Seed
insert into projects (title, slug, description, content, category, client, location, completion_year, image_url, gallery_images, featured, display_order) values
('Zemen Heights', 'zemen-heights', 'A state-of-the-art commercial complex blending modern aesthetics with functional workspaces.', 'Zemen Heights is a flagship commercial development...', 'Commercial', 'Zemen Corp', 'Addis Ababa', 2025, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200', ARRAY['https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'], true, 1),
('Bole Luxury Villa', 'bole-luxury-villa', 'High-end residential design featuring sustainable materials and smart home automation.', 'Situated in the heart of Bole, this luxury villa...', 'Residential', 'Private Client', 'Bole, Addis Ababa', 2024, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200', ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800'], true, 2),
('Industrial Park Facelift', 'industrial-park-facelift', 'A comprehensive exterior and structural renovation of an aging industrial facility.', 'Before and after showcase of how we transformed...', 'Industrial', 'Ethio-Manufacturing Group', 'Hawassa', 2025, 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1200', ARRAY[]::text[], false, 3);
