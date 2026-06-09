-- The Wandering Man — initial schema

create table if not exists authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  bio text,
  title text,
  credentials text,
  photo_url text,
  role text default 'contributor',
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  featured_image_url text,
  author_id uuid references authors(id),
  content_type text not null,
  category text,
  youtube_embed_id text,
  is_featured boolean default false,
  status text default 'draft',
  seo_title text,
  seo_description text,
  tags text[],
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  event_type text,
  location_name text,
  location_address text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  is_recurring boolean default false,
  recurrence_label text,
  featured_image_url text,
  rsvp_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  first_name text,
  created_at timestamptz default now()
);

create table if not exists speaking_enquiries (
  id uuid primary key default gen_random_uuid(),
  organisation text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

-- Indexes
create index if not exists posts_status_published_at on posts (status, published_at desc);
create index if not exists posts_author_id on posts (author_id);
create index if not exists events_starts_at on events (starts_at);
create index if not exists events_is_active on events (is_active);

-- Auto-update updated_at on posts
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at_column();
