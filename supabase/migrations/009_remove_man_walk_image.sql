-- Remove references to /man-walk.png.
--
-- That photo is of Chris from The Man Walk, a separate organisation, so it must
-- not appear anywhere on the site. The asset has been deleted from public/, which
-- means any row still pointing at it would render a broken image.
--
-- This migration is safe to run even if nothing matches - every statement is a
-- no-op on zero rows, and the notices tell you what (if anything) was touched.

do $$
declare
  n_posts    int;
  n_events   int;
  n_content  int;
  n_descr    int;
begin
  -- 1. Featured images on posts.
  update posts
     set featured_image_url = null
   where featured_image_url ilike '%man-walk.png';
  get diagnostics n_posts = row_count;

  -- 2. Featured images on events.
  update events
     set featured_image_url = null
   where featured_image_url ilike '%man-walk.png';
  get diagnostics n_events = row_count;

  -- 3. Body copy that embeds the image inline (markdown or raw html).
  --    Counted and reported but NOT auto-edited: blindly deleting the URL would
  --    leave dangling markdown like ![alt]() behind. Fix these by hand.
  select count(*) into n_content
    from posts
   where content ilike '%man-walk.png%';

  select count(*) into n_descr
    from events
   where description ilike '%man-walk.png%';

  raise notice 'man-walk.png cleanup: % post featured image(s) cleared, % event featured image(s) cleared', n_posts, n_events;

  if n_content > 0 or n_descr > 0 then
    raise warning 'man-walk.png still appears inline in % post body/bodies and % event description(s) - these need a manual edit', n_content, n_descr;
  end if;
end $$;
