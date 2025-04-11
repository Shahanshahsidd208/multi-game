/*
  # Initial Game Schema Setup

  1. New Tables
    - `rooms`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `mode` (text)
      - `status` (text)
      - `current_round` (int)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `players`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `score` (int)
      - `avatar_color` (text)
      - `avatar_eyes` (text)
      - `power_up` (text)
      - `created_at` (timestamp)
    
    - `flags`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key)
      - `round` (int)
      - `type` (text)
      - `content` (text)
      - `submitted_by` (uuid, foreign key)
      - `guessed_by` (uuid, foreign key)
      - `created_at` (timestamp)
    
    - `achievements`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key)
      - `player_id` (uuid, foreign key)
      - `type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create rooms table
CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  mode text NOT NULL,
  status text NOT NULL DEFAULT 'lobby',
  current_round int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create players table
CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  score int NOT NULL DEFAULT 0,
  avatar_color text NOT NULL,
  avatar_eyes text NOT NULL,
  power_up text,
  created_at timestamptz DEFAULT now()
);

-- Create flags table
CREATE TABLE flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  round int NOT NULL,
  type text NOT NULL,
  content text NOT NULL,
  submitted_by uuid REFERENCES players(id) ON DELETE CASCADE,
  guessed_by uuid REFERENCES players(id),
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view rooms they're in" ON rooms
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM players
      WHERE room_id = rooms.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create rooms" ON rooms
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Players can view other players in their room" ON players
  FOR SELECT USING (
    room_id IN (
      SELECT room_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their player profile" ON players
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Players can view flags in their room" ON flags
  FOR SELECT USING (
    room_id IN (
      SELECT room_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Players can submit flags" ON flags
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM players
      WHERE id = flags.submitted_by AND user_id = auth.uid()
    )
  );

CREATE POLICY "Players can view achievements in their room" ON achievements
  FOR SELECT USING (
    room_id IN (
      SELECT room_id FROM players WHERE user_id = auth.uid()
    )
  );

-- Create function to update room timestamp
CREATE OR REPLACE FUNCTION update_room_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating room timestamp
CREATE TRIGGER update_room_timestamp
  BEFORE UPDATE ON rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_room_timestamp();