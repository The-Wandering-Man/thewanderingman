-- Door sign-ins now cover more than the BBQ. Tag each row with the event it
-- came from ('bbq' or 'coffee'); existing rows are all BBQ sign-ins.

alter table bbq_signins add column event text not null default 'bbq';

-- One row per person per event per day, so someone can sign in to a coffee
-- catch-up and a BBQ on the same date.
alter table bbq_signins drop constraint bbq_signins_email_event_date_key;
alter table bbq_signins
  add constraint bbq_signins_email_event_date_event_key unique (email, event_date, event);
