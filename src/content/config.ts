/**
 * =======================================================================
 * CENTRAL CONTENT & CONFIGURATION FILE
 * =======================================================================
 * You can customize all text, messages, dates, and photos for Jaanu here!
 * Everything updates automatically across the entire website.
 */

export interface PolaroidItem {
  id: number;
  caption: string;
  date: string;
  location: string;
  imageUrl: string;
  rotation: string;
  tapeColor: 'blush' | 'lavender' | 'cream' | 'dusty';
}

export interface TimelineItem {
  id: number;
  phase: string;
  title: string;
  date: string;
  description: string;
  iconName: string;
}

export interface PromiseItem {
  id: number;
  title: string;
  detail: string;
  commitment: string;
}

export interface RememberCard {
  id: number;
  title: string;
  description: string;
  highlight: string;
}

export const websiteConfig = {
  // General Info
  recipientNickname: "Jaanu",
  senderName: "Your Person",
  relationshipSubtitle: "Two hearts beating to the same rhythm across every mile 🌙",

  // Audio / Music Settings
  // Using the special song 'something about you.mp3' from the public folder.
  // If removed or failing, automatically falls back to the embedded romantic piano synth!
  audio: {
    enabled: true,
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    audioUrl: "./song.m4a",
  },

  // 1. OPENING SCREEN — A LITTLE SURPRISE
  openingScreen: {
    greeting: "Hey, my Jaanu ❤️",
    subGreeting: "Can I have a little moment of your time?",
    buttonText: "Open this, please 🥺",
    envelopeHint: "Tap to unseal this letter",
    footerQuote: "Made with love, honesty, and a heart that misses you.",
  },

  // 2. THE APOLOGY — FROM MY HEART
  apologyLetter: {
    badge: "Straight From My Heart",
    heading: "I’m genuinely sorry, Jaanu.",
    salutation: "Dearest Jaanu,",
    paragraphs: [
      "I want to begin by saying something that should never, ever be in question: you are deeply, truly important to me. When I hurt your feelings or leave you feeling unheard, I fail the person whose peace and happiness matter to me more than anything.",
      "Your feelings are completely valid. Even in the moments when I get stubborn, overwhelmed, or fail to understand right away, you are never asking for too much. I know that simply saying 'I’m sorry' in a rushed text is never enough; real remorse is demonstrated through patience, genuine listening, and consistent care.",
      "It breaks my heart to think that you ever felt you had to repeatedly ask for the love, gentle reassurance, and dedicated attention you naturally deserve. You should always feel cherished without having to prompt me.",
      "I don’t want to offer excuses or defend myself. I want to become a better communicator, a more attentive listener, and a partner who protects your heart rather than causing it distress.",
      "I don’t expect you to instantly forget what happened or forgive me just because I built this website for you. Take all the time and emotional space you need. I just wanted to create a safe little corner of the world where you know without a doubt how much you are treasured.",
    ],
    closing: "Always holding space for you,",
    signature: "Yours, always ❤️",
  },

  // 3. THINGS I NEVER WANT YOU TO FORGET
  neverForgetSection: {
    badge: "Keep These Close",
    heading: "Things I Never Want You To Forget",
    subtitle: "Whenever the distance feels heavy or doubts whisper in your mind, come back to these truths.",
    cards: [
      {
        id: 1,
        title: "You are important to me.",
        description: "Not only when things are easy or convenient. In every quiet moment, you are my priority, my favorite thought, and the sweetest part of my day.",
        highlight: "Always prioritized, never an afterthought.",
      },
      {
        id: 2,
        title: "Your feelings are never too much.",
        description: "You never have to apologize for feeling deeply or having sensitive moments. Every single emotion you experience is worthy of gentle care and respect.",
        highlight: "Your heart is safe with me.",
      },
      {
        id: 3,
        title: "You deserve patience and understanding.",
        description: "You shouldn't ever have to brace for defensive words or rushed answers. You deserve a partner who calms your storm, not one who adds to the wind.",
        highlight: "Patience without conditions.",
      },
      {
        id: 4,
        title: "You deserve to feel loved, not confused.",
        description: "True love brings certainty and warmth, not anxious questions. I want to give you steady, unambiguous clarity that leaves no room for hesitation.",
        highlight: "Clear, steady, unwavering affection.",
      },
      {
        id: 5,
        title: "Distance will never make you less special to me.",
        description: "Miles can keep our hands from touching for now, but they can never weaken what I hold for you. Every mile between us only proves how strong this love is.",
        highlight: "No ocean or timezone can change this.",
      },
      {
        id: 6,
        title: "I want to keep choosing you, every single day.",
        description: "Through busy days, small misunderstandings, quiet evenings, and joyous victories—I choose you. Willingly, happily, and wholeheartedly.",
        highlight: "Today, tomorrow, and forever.",
      },
    ] as RememberCard[],
  },

  // 4. OUR LITTLE WORLD — SCRAPBOOK & TIMELINE
  scrapbookSection: {
    badge: "Our Sacred Space",
    heading: "Our Little World 🌷",
    subtitle: "A collection of the little moments, inside smiles, and memories that make our bond one of a kind.",
    
    // Polaroids with actual memories & photos
    polaroids: [
      {
        id: 1,
        caption: "That smile of yours that cures everything ❤️",
        date: "My Favorite Smile",
        location: "In my heart always",
        imageUrl: "./my favourite smile.jpeg",
        rotation: "-rotate-2",
        tapeColor: "blush",
      },
      {
        id: 2,
        caption: "Lost in your eyes, every single time ✨",
        date: "Our Sweetest Talks",
        location: "Across the miles",
        imageUrl: "./Lost in your eyes.png",
        rotation: "rotate-2",
        tapeColor: "lavender",
      },
      {
        id: 3,
        caption: "All the cute poses only you can make 🌸",
        date: "Pure Happiness",
        location: "Wherever we are",
        imageUrl: "./Cute poses you make.png",
        rotation: "-rotate-1",
        tapeColor: "cream",
      },
      {
        id: 4,
        caption: "Ghayal hai tera deewana... always 🌙",
        date: "Late Night Whispers",
        location: "Under the same sky",
        imageUrl: "./Ghayal hai tera deewana.png",
        rotation: "rotate-3",
        tapeColor: "dusty",
      },
      {
        id: 5,
        caption: "That shadi biha reel we laughed over 💍",
        date: "Our Silly Moments",
        location: "Living in my head rent-free",
        imageUrl: "./That shadi biha reel.png",
        rotation: "-rotate-2",
        tapeColor: "blush",
      },
      {
        id: 6,
        caption: "Dreaming of the future and our little family 🏡",
        date: "Our Tomorrows",
        location: "Together soon",
        imageUrl: "./Imagining how our daughter will look like.png",
        rotation: "rotate-1",
        tapeColor: "lavender",
      },
    ] as PolaroidItem[],

    timeline: [
      {
        id: 1,
        phase: "Chapter One",
        title: "The Moment You Arrived",
        date: "The Beginning",
        description: "You stepped into my life and suddenly the colors became richer, the air became lighter, and everything made a little more sense.",
        iconName: "Sparkles",
      },
      {
        id: 2,
        phase: "Chapter Two",
        title: "Falling in Love Across the Distance",
        date: "Late Night Whispers",
        description: "Sharing our deepest thoughts, laughing at silly jokes until our stomachs hurt, and realizing distance couldn't stop this connection.",
        iconName: "Heart",
      },
      {
        id: 3,
        phase: "Chapter Three",
        title: "Learning and Weathering Storms",
        date: "Growth & Understanding",
        description: "Understanding that love is not just easy days, but holding each other's hands with extra tenderness when things get bumpy.",
        iconName: "Compass",
      },
      {
        id: 4,
        phase: "Chapter Four",
        title: "The Dream We Are Building",
        date: "Our Horizon",
        description: "A cozy morning with tea, no timezones between us, no long goodbyes at airport gates. Just you and me.",
        iconName: "Sunrise",
      },
    ] as TimelineItem[],
  },

  // 5. A PROMISE TO YOU
  promiseSection: {
    badge: "My Real Commitment",
    heading: "I don’t want to just promise. I want to show you.",
    subtitle: "Real growth isn’t in pretty poetry; it’s in steady daily choices. Here are the five anchors I hold myself to:",
    promises: [
      {
        id: 1,
        title: "I will listen instead of getting defensive.",
        detail: "When you tell me something hurt you, my only goal is to hear your heart and comfort you—not defend my ego.",
        commitment: "Active, patient listening without counter-arguments.",
      },
      {
        id: 2,
        title: "I will communicate instead of leaving things unresolved.",
        detail: "I won’t shut down or leave you hanging in silence with anxious thoughts. We will talk things through with gentleness.",
        commitment: "Consistent presence and transparent communication.",
      },
      {
        id: 3,
        title: "I will make more time for us.",
        detail: "No matter how hectic the world gets, you will never feel like an afterthought. Our bond will always have its sacred time.",
        commitment: "Dedicated, undistracted quality moments.",
      },
      {
        id: 4,
        title: "I will never intentionally dismiss your feelings.",
        detail: "What is important to you will always be treated as important to me. Your sensitivity is a gift, never a burden.",
        commitment: "Validation and warmth for every emotion.",
      },
      {
        id: 5,
        title: "I will show you through consistent actions that you matter.",
        detail: "Day after day, in little ways and big ways, I will rebuild the safety and certainty you deserve to feel with me.",
        commitment: "Consistent effort over quick apologies.",
      },
    ] as PromiseItem[],
  },

  // 6. INTERACTIVE LOVE SECTION
  interactiveSection: {
    badge: "Interactive Heartbeat",
    heading: "A Little Moment For You",
    subtitle: "Touch these whenever you need a reminder of what you mean to me.",
    specialQuestion: "Do you know how special you are to me?",
    specialButtonText: "Tell me ❤️",
    specialRevealedMessage: "More than these little words could ever explain. You are my safe harbor, my favorite human, and the light in my life.",
    
    hugButtonText: "Send me a virtual hug 🫂",
    hugTitle: "Holding you tight right now...",
    hugMessage: "Close your eyes for three seconds. Take a deep, gentle breath. Across every mile and every screen, my arms are wrapped around you. You are loved, you are safe, and I am right here.",
    
    // Little love notes jar
    jarTitle: "Little Reminders of Why I Adore You 🌸",
    jarButtonText: "Pick a love note",
    loveNotes: [
      "The way your eyes light up when you talk about things you love.",
      "How gentle and kind your heart is, even when the world is noisy.",
      "Your laugh—it's my favorite sound in the whole universe.",
      "The warmth you bring into my life just by simply being you.",
      "How brave and resilient you are, even on the days you feel small.",
      "The fact that among 8 billion people on Earth, my heart found yours.",
    ],
  },

  // 7. FINAL LETTER
  finalLetterSection: {
    badge: "Written With All My Love",
    heading: "Until We Close The Distance",
    body: `My Jaanu,

Mujhe pata h ki I hurt you a lot and you didn’t expect this coming from me but I really really sorry, atp I just don’t like myself how I behaved and talked to you, I shouldn’t be like this.

I promise this will never repeat again and I’ll change myself and mai apna attitude kabhi nhi launga hamare beech me, Sorry jaanu maine tumhe hurt kiya but I truly loves you with all my heart and I can’t let you go.

You mean everything to me. I swear I’ll never repeat this behaviour again and will always be your andhbhakt and goodboy.

I love you jannu💗 and I’m waiting for your text and lets sort everything out.`,
    signOff: "Forever your person,",
    senderSignature: "With every beat of my heart",
    dateStamp: "Always & Forever",
  },

  // Interactive Message Back (Allows her to leave or copy a message back to him)
  replyBox: {
    title: "How are you feeling right now, Jaanu?",
    subtitle: "Whatever is in your heart—whether you're still upset, soft, or needing time—you can always share it with me without hesitation.",
    options: [
      "I need a little time, but thank you for this.",
      "I’m still hurt, but I’m ready to talk gently.",
      "I miss you too. Let’s call soon.",
      "I love you, Jaanu ❤️",
    ],
    copyPrompt: "Copy to send me on WhatsApp or text 💌",
  }
};
