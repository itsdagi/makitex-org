-- Testimonials Table
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  author text not null,
  role text,
  content text not null,
  image_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Partners Table
create table if not exists partners (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text,
  display_order integer default 0
);

-- Jobs / Careers Table
create table if not exists jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  department text not null,
  location text not null,
  type text default 'Full-time',
  description text not null,
  requirements text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
