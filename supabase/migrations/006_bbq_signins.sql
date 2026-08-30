-- Monthly BBQ door sign-ins
-- Rows are written only by /api/bbq/signin using the service role key, which
-- bypasses RLS. RLS is enabled with no policies, so anon and authenticated
-- can neither read nor write.

create table bbq_signins (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  -- current_date is UTC, which is the wrong calendar day for a Melbourne
  -- morning. Default to the Melbourne date so the constraint below lines up
  -- with the day the BBQ actually ran.
  event_date date        not null default (now() at time zone 'Australia/Melbourne')::date,
  created_at timestamptz not null default now()
);

-- One row per person per BBQ. The route handler upserts on this constraint,
-- so a second scan on the same day updates the existing row rather than
-- erroring. Emails are lowercased and trimmed before insert so the match
-- holds regardless of how someone typed it.
alter table bbq_signins
  add constraint bbq_signins_email_event_date_key unique (email, event_date);

create index bbq_signins_event_date_idx on bbq_signins (event_date desc);

alter table bbq_signins enable row level security;
