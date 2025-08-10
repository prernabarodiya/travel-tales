import User from "@/models/user";

const adjectives = [
  'Happy', 'Cool', 'Smart', 'Brave', 'Quick', 
  'Mighty', 'Charming', 'Playful', 'Clever', 'Bold', 
  'Witty', 'Radiant', 'Silly', 'Daring', 'Swift',
  'Genuine', 'Joyful', 'Curious', 'Inventive', 'Eager',
  'Fearless', 'Spunky', 'Energetic', 'Vibrant', 'Lively'
];

const nouns = [
  'Tiger', 'Penguin', 'Fox', 'Lion', 'Eagle', 
  'Dolphin', 'Panda', 'Dragon', 'Falcon', 'Wolf',
  'Otter', 'Shark', 'Bear', 'Hawk', 'Turtle', 
  'Zebra', 'Monkey', 'Rabbit', 'Whale', 'Giraffe', 
  'Rhino', 'Cheetah', 'Parrot', 'Sloth', 'Koala'
];

export function generateUsername() {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(100 + Math.random() * 900); // 100–999
  
  return `${randomAdjective}${randomNoun}${randomNumber}`;
}

export async function generateUniqueUsername() {
  let username = '';
  let isUnique = false;

  while (!isUnique) {
    username = generateUsername();
    const existingUser = await User.findOne({ username }); 

    if (!existingUser) {
      isUnique = true;
    }
  }

  return username;
}
