-- Weekly check-in responses
-- Anon users can insert only; reads require service role (bypasses RLS)

create table weekly_checkins (
  id         uuid        primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  rating     int2        not null check (rating between 1 and 10),
  concern    text        not null,
  gratitude  text        not null,
  note       text
);

alter table weekly_checkins enable row level security;

create policy "Anon can insert check-ins"
  on weekly_checkins for insert
  to anon
  with check (true);
