-- Row Level Security for The Wandering Man
-- Anon key: read published/active content only
-- Service role key: bypasses RLS (used server-side for writes)

-- Enable RLS on all tables
alter table authors enable row level security;
alter table posts enable row level security;
alter table events enable row level security;
alter table newsletter_signups enable row level security;
alter table speaking_enquiries enable row level security;

-- authors: public can read active authors
create policy "Public can read active authors"
  on authors for select
  to anon, authenticated
  using (is_active = true);

-- posts: public can read published posts only
create policy "Public can read published posts"
  on posts for select
  to anon, authenticated
  using (status = 'published');

-- events: public can read active events
create policy "Public can read active events"
  on events for select
  to anon, authenticated
  using (is_active = true);

-- newsletter_signups: public can insert only (no reads)
create policy "Public can subscribe to newsletter"
  on newsletter_signups for insert
  to anon, authenticated
  with check (true);

-- speaking_enquiries: public can insert only (no reads)
create policy "Public can submit speaking enquiries"
  on speaking_enquiries for insert
  to anon, authenticated
  with check (true);

-- Note: all writes (admin post/event management, reading signups/enquiries)
-- go through the service role key which bypasses RLS entirely.
