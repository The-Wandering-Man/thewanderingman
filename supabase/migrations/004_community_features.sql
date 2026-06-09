-- Community features: job board, business directory, sponsors

-- Member job profiles
create table if not exists member_profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,          -- "Tony S." - first name + last initial
  suburb text,
  headline text,                        -- "Experienced tradesperson seeking construction work"
  skills text[],
  years_experience int,
  work_history text,                    -- narrative: who they worked for, what they did
  achievements text,                    -- something they're proud of
  looking_for text,                     -- full-time / part-time / casual / any
  contact_email text not null,          -- private, never shown publicly
  contact_phone text,                   -- private
  is_approved boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Member businesses
create table if not exists member_businesses (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  owner_display_name text,              -- "Tony S."
  category text,                        -- trades, services, retail, food, health, etc.
  description text,
  suburb text,
  website_url text,
  phone text,
  email text,
  is_approved boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Sponsors (active paying/supporting sponsors)
create table if not exists sponsors (
  id uuid primary key default gen_random_uuid(),
  org_name text not null,
  slug text unique not null,
  tier text not null default 'community', -- 'gold' | 'silver' | 'bronze' | 'community'
  tagline text,                           -- short line shown in banner
  logo_url text,
  -- Landing page fields
  use_landing_page boolean default true,  -- true = /sponsors/[slug], false = external URL
  external_url text,                      -- used if use_landing_page = false
  lp_hero_headline text,                  -- big H1 on landing page
  lp_hero_subheading text,
  lp_about text,                          -- multi-paragraph about section
  lp_offer text,                          -- e.g. "10% off when you mention The Wandering Man"
  lp_offer_cta_text text,                 -- e.g. "Claim your 10% off"
  lp_offer_cta_url text,                  -- where CTA button goes
  lp_services text[],                     -- list of services/products
  lp_color_primary text default '#0D0D0D',-- brand colour for landing page accents
  -- Contact / location
  address text,
  suburb text,
  phone text,
  website_url text,
  opening_hours text,                     -- freeform e.g. "Mon-Fri 6:30am-5:30pm"
  -- Admin
  contact_name text,
  contact_email text,
  renewal_date date,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Inbound sponsorship enquiries (from /sponsors page)
create table if not exists sponsor_enquiries (
  id uuid primary key default gen_random_uuid(),
  org_name text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  tier_interest text,
  message text,
  status text default 'new',            -- 'new' | 'contacted' | 'signed' | 'closed'
  created_at timestamptz default now()
);

-- Indexes
create index if not exists member_profiles_approved on member_profiles (is_approved, is_active);
create index if not exists member_businesses_approved on member_businesses (is_approved, is_active);
create index if not exists sponsors_tier on sponsors (tier, is_active);

-- RLS
alter table member_profiles enable row level security;
alter table member_businesses enable row level security;
alter table sponsors enable row level security;
alter table sponsor_enquiries enable row level security;

-- Public reads approved/active records
create policy "Public reads approved member profiles"
  on member_profiles for select to anon, authenticated
  using (is_approved = true and is_active = true);

create policy "Public reads approved businesses"
  on member_businesses for select to anon, authenticated
  using (is_approved = true and is_active = true);

create policy "Public reads active sponsors"
  on sponsors for select to anon, authenticated
  using (is_active = true);

-- Public inserts for self-registration (no reads)
create policy "Anyone can register a member profile"
  on member_profiles for insert to anon, authenticated
  with check (true);

create policy "Anyone can register a business"
  on member_businesses for insert to anon, authenticated
  with check (true);

create policy "Anyone can submit a sponsor enquiry"
  on sponsor_enquiries for insert to anon, authenticated
  with check (true);

-- Seed: Grovedale Quality Meats
insert into sponsors (
  org_name, slug, tier, tagline, use_landing_page,
  lp_hero_headline, lp_hero_subheading,
  lp_about, lp_offer, lp_offer_cta_text, lp_offer_cta_url,
  lp_services, lp_color_primary,
  address, suburb, phone, website_url, opening_hours,
  contact_email, is_active
) values (
  'Grovedale Quality Meats',
  'grovedale-quality-meats',
  'gold',
  'Geelong''s best butcher. Member discount inside.',
  true,
  'Geelong''s Best Butcher. Trusted by The Wandering Man.',
  'Real meat from real people. The reason our Saturday BBQs are legendary.',
  'Tucked away on Peter Street in Grovedale, this is the kind of butcher shop that used to exist in every suburb — where the bloke behind the counter knows his product, gives you an honest recommendation, and doesn''t charge city prices for it.

Grovedale Quality Meats has been serving Geelong families, tradies, and backyard BBQ heroes for years. Huge variety of cuts, staff who''ll tell you exactly how to cook it, and quality that will ruin supermarket meat for you forever.

Every Wandering Man BBQ runs on Grovedale Quality Meats. When you''re feeding 20 blokes on a Saturday morning, you need a supplier you can trust — and these guys have never let us down.',
  'Mention "The Wandering Man" and get 10% off your entire order.',
  'Get your 10% off — visit the shop',
  'https://www.google.com/maps/dir//13+Peter+St,+Grovedale+VIC+3216',
  ARRAY['Fresh cuts to order', 'BBQ packs & party trays', 'Marinated meats', 'Smallgoods & deli', 'Whole & half carcasses', 'Expert advice on every cut'],
  '#8B1A1A',
  '13 Peter St, Grovedale VIC 3216',
  'Grovedale',
  '(03) 5243 8612',
  null,
  'Mon-Fri: 6:30am - 5:30pm · Sat: 6:30am - 12:30pm · Sun: Closed',
  'admin@thewanderingman.com.au',
  true
);
