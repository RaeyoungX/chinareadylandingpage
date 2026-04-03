create extension if not exists pgcrypto;

create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  category text not null check (category in ('launch', 'feature', 'content', 'bug')),
  message text not null check (char_length(message) between 20 and 1200),
  page_path text,
  source text not null default 'web',
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  constraint feedback_submissions_name_check check (
    name is null or char_length(name) between 2 and 80
  ),
  constraint feedback_submissions_email_check check (
    email is null or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'
  )
);

comment on table public.feedback_submissions is
  'Public feedback submissions collected from the ChinaReady landing page.';

alter table public.feedback_submissions enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.feedback_submissions to anon, authenticated;

drop policy if exists "Anyone can submit feedback" on public.feedback_submissions;
create policy "Anyone can submit feedback"
on public.feedback_submissions
for insert
to anon, authenticated
with check (true);
