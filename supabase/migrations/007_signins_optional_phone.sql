-- Door sign-ins: every field is now optional (encouraged, not required) and
-- phone is collected alongside name and email for insurance attendance records.
-- A fully blank sign-in still counts as a head at the door.

alter table bbq_signins alter column name  drop not null;
alter table bbq_signins alter column email drop not null;
alter table bbq_signins add column phone text;

-- The (email, event_date) unique constraint stays. Postgres treats NULLs as
-- distinct, so sign-ins without an email never collide with each other.
