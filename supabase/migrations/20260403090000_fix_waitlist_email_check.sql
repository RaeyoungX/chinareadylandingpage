alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_email_check;

alter table public.waitlist_signups
  add constraint waitlist_signups_email_check check (
    email ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$'
  );
