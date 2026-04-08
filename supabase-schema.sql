-- Run this in your Supabase SQL editor

create table writings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  slug text not null unique,
  tag text,
  published boolean default true,
  created_at timestamp with time zone default now(),
  user_id uuid references auth.users(id)
);

-- Only the authenticated owner can insert/update/delete
alter table writings enable row level security;

create policy "Public can read published writings"
  on writings for select
  using (published = true);

create policy "Auth user can insert"
  on writings for insert
  with check (auth.uid() = user_id);

create policy "Auth user can update own"
  on writings for update
  using (auth.uid() = user_id);

create policy "Auth user can delete own"
  on writings for delete
  using (auth.uid() = user_id);
