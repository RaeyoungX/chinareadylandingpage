create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  source text not null check (source in ('homepage_hero', 'homepage_waitlist', 'coming_soon')),
  page_path text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint waitlist_signups_email_check check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'
  ),
  constraint waitlist_signups_name_check check (
    name is null or char_length(name) between 2 and 80
  ),
  constraint waitlist_signups_email_length_check check (
    char_length(email) <= 120
  ),
  constraint waitlist_signups_page_path_check check (
    page_path is null or char_length(page_path) <= 120
  )
);

comment on table public.waitlist_signups is
  'Public waitlist signups for the ChinaReady mobile app launch.';

alter table public.waitlist_signups enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.waitlist_signups to anon, authenticated;

drop policy if exists "Anyone can join waitlist" on public.waitlist_signups;
create policy "Anyone can join waitlist"
on public.waitlist_signups
for insert
to anon, authenticated
with check (true);
