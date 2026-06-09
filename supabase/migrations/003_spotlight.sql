-- Add spotlight_order to posts
-- Posts with spotlight_order 1, 2, or 3 appear in the homepage spotlight panel.
-- Null means not spotlighted. Featured post (is_featured=true) is the hero card.

alter table posts add column if not exists spotlight_order smallint;

create index if not exists posts_spotlight_order on posts (spotlight_order)
  where spotlight_order is not null;
