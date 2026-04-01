-- Blog Posts Table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text,
  cover_url text,
  tags text[],
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_published boolean default false
);

-- Projects Enhancements
alter table projects add column if not exists slug text unique;
alter table projects add column if not exists client text;
alter table projects add column if not exists year text;
alter table projects add column if not exists area text;
alter table projects add column if not exists full_description text;
alter table projects add column if not exists tags text[];
alter table projects add column if not exists gallery_urls text[];
