import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import * as Icons from "lucide-react";
import {
  TIMELINE_EVENTS,
  THINGS_I_LOVE,
  DREAMS,
  STICKY_NOTES,
  PLAYLIST,
  PROMISES,
  WHEEL_REASONS,
  DEEP_QUESTIONS,
  JAR_NOTES
} from "./data/romanticData";

// Helper to resolve Lucide icons dynamically
const SafeIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Heart className={className} />;
  return <IconComponent className={className} />;
};

export default function App() {
  // Global States
  const [loading, setLoading] = useState(true);
  const [heartOpened, setHeartOpened] = useState(false);
  const isDarkMode = true;
  const [isPlaying, setIsPlaying] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [showSecretLetter, setShowSecretLetter] = useState(false);
  const [shootingStarMsg, setShootingStarMsg] = useState<string | null>(null);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Canvas particle state references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Countdown target date: January 1, 2027 (Jan starting)
  const [countdownTime, setCountdownTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Try to play audio initially on load
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay blocked initially. Play will trigger on user action.", err);
        setIsPlaying(false);
      });
    }
  }, []);

  // Update countdown live targeting January 1st, 2027
  useEffect(() => {
    const targetDate = new Date("2027-01-01T00:00:00");
    const updateCountdown = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference <= 0) {
        setCountdownTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setCountdownTime({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track Custom Cursor
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Canvas Particles (Sakura petals & Hearts)
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle Classes
    class SakuraPetal {
      x = Math.random() * width;
      y = Math.random() * -height;
      size = Math.random() * 8 + 4;
      speedX = Math.random() * 1.5 - 0.5;
      speedY = Math.random() * 1.5 + 1;
      rotation = Math.random() * 360;
      rotationSpeed = Math.random() * 2 - 1;

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        if (this.y > height) {
          this.y = -20;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = "rgba(255, 182, 193, 0.65)";
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    }

    class FloatingHeart {
      x = Math.random() * width;
      y = height + Math.random() * 100;
      size = Math.random() * 6 + 4;
      speedY = Math.random() * 1 + 0.5;
      opacity = Math.random() * 0.5 + 0.3;
      angle = Math.random() * 360;

      update() {
        this.y -= this.speedY;
        this.angle += 0.02;
        this.x += Math.sin(this.angle) * 0.3;
        if (this.y < -20) {
          this.y = height + 20;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
        ctx.beginPath();
        // Draw path heart
        const size = this.size;
        ctx.moveTo(0, -size / 4);
        ctx.bezierCurveTo(size / 2, -size, size * 1.5, -size / 3, 0, size);
        ctx.bezierCurveTo(-size * 1.5, -size / 3, -size / 2, -size, 0, -size / 4);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: (SakuraPetal | FloatingHeart)[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push(new SakuraPetal());
    }
    for (let i = 0; i < 30; i++) {
      particles.push(new FloatingHeart());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [heartOpened]);

  // Audio helper
  const handleOpenHeart = () => {
    setHeartOpened(true);
    // Play audio
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Audio auto-play blocked or error: ", err));
    }
    // Launch flower petal confetti rain
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FFB6C1", "#FFC0CB", "#FF69B4", "#FFF0F5"]
    });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 17 Section specific states
  // Wheel State
  const [wheelAngle, setWheelAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [chosenReason, setChosenReason] = useState<string | null>(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const degrees = 1800 + Math.random() * 360; // 5 full spins minimum
    setWheelAngle(prev => prev + degrees);

    setTimeout(() => {
      const idx = Math.floor(Math.random() * WHEEL_REASONS.length);
      setChosenReason(WHEEL_REASONS[idx]);
      setSpinning(false);
      // Confetti burst
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFB6C1", "#CDB4DB"]
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFB6C1", "#CDB4DB"]
      });
    }, 3000);
  };

  // Distance Section floating messages
  const [distanceMessages, setDistanceMessages] = useState<Array<{ id: number; text: string; side: "left" | "right"; progress: number }>>([
    { id: 1, text: "I miss you.", side: "left", progress: 0 },
    { id: 2, text: "I love you.", side: "right", progress: 0 },
    { id: 3, text: "Call me?", side: "left", progress: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Advance progress
      setDistanceMessages(prev => {
        const updated = prev.map(m => ({ ...m, progress: m.progress + 1.5 }));
        // Filter out completed ones and add random new ones
        const filtered = updated.filter(m => m.progress < 100);
        if (filtered.length < 4 && Math.random() > 0.4) {
          const texts = ["I miss you.", "Call me?", "I love you.", "I'm proud of you.", "Goodnight.", "Thinking of you.", "My home."];
          const newText = texts[Math.floor(Math.random() * texts.length)];
          const side = Math.random() > 0.5 ? "left" : "right";
          filtered.push({
            id: Date.now() + Math.random(),
            text: newText,
            side,
            progress: 0
          });
        }
        return filtered;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Little Things Section
  const [littleMsg, setLittleMsg] = useState<string | null>(null);
  const showLittleMsg = (item: string) => {
    const msgs: Record<string, string> = {
      "🍫": "Chocolate makes everything sweeter, but not as sweet as your smile.",
      "🧸": "If I were beside you right now, I'd hug you until all your worries disappeared.",
      "🌹": "A single rose to represent the only flower that bloomed inside my heart.",
      "❤️": "My heart is permanently in your care. Treat it gently!",
      "🌙": "Under the same moon, miles apart, but always dreaming of you.",
      "⭐": "Every shooting star I see, I wish for another tomorrow with you.",
      "☕": "Here's a warm virtual coffee for your busy morning. You got this, Jaanu!",
      "🍦": "Ice cream dates where we share flavors is my dream weekend activity.",
      "💌": "A little envelope carrying all the unspoken love I feel for you.",
      "💍": "A quiet promise that one day, I'll put a real one on your finger."
    };
    setLittleMsg(msgs[item] || "I love you!");
  };

  // Deep Questions Generator
  const [currentQuestion, setCurrentQuestion] = useState(DEEP_QUESTIONS[0]);
  const newQuestion = () => {
    const filtered = DEEP_QUESTIONS.filter(q => q !== currentQuestion);
    setCurrentQuestion(filtered[Math.floor(Math.random() * filtered.length)]);
  };

  // Love Meter percentage climb
  const [lovePercentage, setLovePercentage] = useState(0);
  const [meterTriggered, setMeterTriggered] = useState(false);

  const startLoveMeter = () => {
    if (meterTriggered) return;
    setMeterTriggered(true);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.max(1, Math.floor((1000 - current) / 15));
      if (current >= 1000) {
        setLovePercentage(1000);
        clearInterval(interval);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FF69B4", "#FF1493", "#CDB4DB"]
        });
      } else {
        setLovePercentage(current);
      }
    }, 40);
  };

  // Love notes peel state
  const [peeledNotes, setPeeledNotes] = useState<Record<number, boolean>>({});
  const togglePeelNote = (id: number) => {
    setPeeledNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Jar of Happiness list of popped notes
  const [jarMessages, setJarMessages] = useState<string[]>([]);
  const popJarNote = () => {
    const randomNote = JAR_NOTES[Math.floor(Math.random() * JAR_NOTES.length)];
    setJarMessages(prev => [randomNote, ...prev].slice(0, 5)); // Keep last 5 notes
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#FFB6C1", "#FFF"]
    });
  };

  // Memory Gallery full screen Lightbox
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string; rotate?: boolean } | null>(null);

  // Gallery Photos
  const galleryPhotos = [
    { src: "/my favourite smile.jpeg", caption: "My favourite smile.", rotate: true },
    { src: "/Cute poses you make.png", caption: "Cute poses you make.", rotate: false },
    { src: "/Ghayal hai tera deewana.png", caption: "Ghayal hai tera deewana.", rotate: false },
    { src: "/Imagining how our daughter will look like.png", caption: "Imagining how our daughter will look like.", rotate: false },
    { src: "/Lost in your eyes.png", caption: "Lost in your eyes.", rotate: true },
    { src: "/That shadi biha reel.png", caption: "That shadi biha reel.", rotate: false }
  ];

  // Hidden Easter egg click counts
  const [easterEggCount, setEasterEggCount] = useState(0);
  const clickEasterEgg = () => {
    setEasterEggCount(prev => prev + 1);
    if (easterEggCount + 1 >= 5) {
      setShootingStarMsg("🌟 Easter Egg Unlocked: 'You are the most precious star in my sky. I will love you forever, Jaanu!'");
      setEasterEggCount(0);
    }
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-700 ${isDarkMode ? "bg-[#090214] text-pink-100" : "bg-[#FFFBF7] text-[#5A4F46]"}`}>
      
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/something about you.mp3"
        loop
        autoPlay
        preload="auto"
      />

      {/* Dynamic Sakura/Heart Canvas Overlay */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* Custom Cursor */}
      <div
        className="custom-cursor hidden lg:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorHovered ? 1.5 : 1})`,
          transition: "transform 0.15s ease-out"
        }}
      />

      {/* Floating Control Buttons */}
      <div className="fixed top-6 right-6 flex items-center gap-3 z-50">

        {/* Music Player */}
        <button
          onClick={toggleMusic}
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border transition-all duration-300 ${
            isDarkMode ? "bg-purple-950/80 border-purple-800 text-pink-200 hover:bg-purple-900" : "bg-white/80 border-rose-200 text-rose-600 hover:bg-rose-50"
          }`}
        >
          <div className={`${isPlaying ? "animate-spin" : ""}`}>
            <Icons.Music size={18} />
          </div>
          <span className="text-xs font-semibold hidden md:inline">
            {isPlaying ? "Music Playing" : "Muted"}
          </span>
          {isPlaying ? <Icons.Volume2 size={16} /> : <Icons.VolumeX size={16} />}
        </button>
      </div>

      {/* Secret Letter Icon (Floating Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowSecretLetter(true)}
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className={`flex items-center gap-2 p-3.5 rounded-full shadow-2xl border float-slow duration-300 ${
            isDarkMode ? "bg-purple-950/95 border-pink-700/50 text-pink-300" : "bg-rose-50/95 border-rose-200 text-rose-500"
          }`}
        >
          <Icons.MailOpen size={22} className="animate-pulse" />
          <span className="text-xs font-semibold pr-1">Secret Note</span>
        </button>
      </div>

      {/* Heart-Shaped Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#FFFBF7] dark:bg-[#090214] flex flex-col items-center justify-center z-9999"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <Icons.Heart
                  size={90}
                  className="text-rose-400 dark:text-pink-500 fill-rose-300 dark:fill-pink-700 heart-beat"
                />
                <Icons.Sparkles className="absolute -top-3 -right-3 text-yellow-400 animate-bounce" size={24} />
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-lg font-serif tracking-wider font-semibold text-rose-500 dark:text-pink-400 text-center px-4"
              >
                Preparing something special for Jaanu...
              </motion.h2>
              <div className="w-48 h-1 bg-rose-200/40 dark:bg-pink-900/40 rounded-full mt-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  className="h-full bg-rose-400 dark:bg-pink-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Dialogs / Lightboxes */}
      <AnimatePresence>
        {/* Fullscreen Photo Lightbox */}
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-black/90 z-9999 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-full hover:bg-black/60"
              >
                <Icons.X size={24} />
              </button>
              <img
                src={lightboxImg.src}
                alt="Lightbox View"
                className={`max-h-[70vh] w-auto object-contain rounded-lg border border-white/10 shadow-2xl transition-transform ${lightboxImg.rotate ? 'rotate-270 scale-75 md:scale-90 my-12' : ''}`}
              />
              <p className="mt-4 font-handwriting text-white text-3xl text-center glow-text-pink">
                {lightboxImg.caption}
              </p>
            </div>
          </motion.div>
        )}

        {/* Secret Love Letter Envelope Modal */}
        {showSecretLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-9999 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className={`max-w-md w-full rounded-2xl p-8 border shadow-2xl relative ${
                isDarkMode ? "bg-purple-950 border-purple-800 text-pink-100" : "bg-white border-rose-100 text-[#5A4F46]"
              }`}
            >
              <button
                onClick={() => setShowSecretLetter(false)}
                className="absolute top-4 right-4 hover:opacity-80"
              >
                <Icons.X size={20} />
              </button>
              <div className="flex justify-center mb-4">
                <Icons.Heart className="text-rose-500 fill-rose-300 animate-pulse" size={48} />
              </div>
              <h3 className="text-2xl font-serif text-center font-bold text-rose-500 dark:text-pink-400 mb-4">
                A Secret Note Just For You
              </h3>
              <p className="font-handwriting text-xl leading-relaxed text-center mb-6">
                &quot;To my beautiful Jaanu, whenever you feel tired or doubt yourself, remember that there is someone who thinks you are absolute perfection. You make my world complete. I am so lucky to love you.&quot;
                <br /><br />
                <span className="italic block text-rose-400 dark:text-pink-300">
                  My favorite line: &quot;Mai tumhari jaanu hu kya? Haan Jaanu.&quot;
                </span>
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowSecretLetter(false);
                    confetti({ particleCount: 30 });
                  }}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold text-sm shadow-md hover:from-pink-500 hover:to-rose-500"
                >
                  Close with Love
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Surprise Shooting Star popup message */}
        {shootingStarMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9999 flex items-center justify-center p-4"
          >
            <div className="bg-purple-950/95 border border-purple-800 p-8 rounded-2xl max-w-sm text-center shadow-2xl">
              <Icons.Sparkles className="text-yellow-400 mx-auto animate-spin mb-4" size={40} />
              <h4 className="text-xl font-serif font-bold text-pink-300 mb-3">A Wish Came True!</h4>
              <p className="text-sm text-pink-100/90 leading-relaxed mb-6 font-handwriting text-xl">
                {shootingStarMsg}
              </p>
              <button
                onClick={() => setShootingStarMsg(null)}
                className="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold"
              >
                Catch another star
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIRST SCREEN: HERO / OPEN MY HEART LANDING */}
      {!heartOpened ? (
        <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4">
          {/* Parallax moving background layers */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 via-purple-50 to-pink-100 dark:from-[#11052C] dark:via-[#090214] dark:to-[#3D085A] opacity-80" />
          
          {/* Animated stars and clouds */}
          <div className="absolute top-20 left-1/4 w-12 h-12 bg-white/20 dark:bg-white/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-rose-200/30 dark:bg-purple-900/10 rounded-full blur-3xl animate-pulse" />

          {/* Interactive Surprise Stars */}
          <button
            onClick={() => setShootingStarMsg("🌟 'I wish I could hold your hand right now and whisper how much I love you.'")}
            className="absolute top-12 right-20 text-yellow-200 hover:text-yellow-400 hover:scale-125 transition-transform animate-bounce"
            title="Click to catch this star"
          >
            <Icons.Sparkles size={20} />
          </button>

          {/* Core Content */}
          <div className="max-w-2xl text-center z-20 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative mb-6"
            >
              <Icons.Heart className="text-rose-400 dark:text-pink-500 fill-rose-200/50 dark:fill-pink-900/30 float-slow" size={100} />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-rose-500 dark:text-pink-400 glow-text-pink leading-tight"
            >
              Happy Girlfriend&apos;s Day ❤️
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-lg md:text-xl text-[#7A6E67] dark:text-pink-200 max-w-lg leading-relaxed font-serif italic"
            >
              &quot;To the girl who unknowingly became my safest place, my peace, my happiness and my favorite part of every day.&quot;
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10"
            >
              <button
                onClick={handleOpenHeart}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Open My Heart</span>
                <Icons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      ) : (
        /* SECOND SCREEN: FULL INTERACTIVE STORY PAGE */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pb-24"
        >
          {/* HERO HEADER */}
          <header className="py-20 text-center px-4 relative flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-rose-400 dark:text-pink-400 font-bold mb-3">Welcome to my heart</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-rose-500 dark:text-pink-400 mb-4">For My Jaanu ❤️</h1>
            <p className="text-sm md:text-base max-w-md text-stone-500 dark:text-pink-200/70 font-serif italic leading-relaxed">
              Every detail here was designed to remind you of how deeply you are loved, how much you are cherished, and why you will always be my choice.
            </p>
          </header>

          {/* SECTION 2: WHY YOU? */}
          <section className="py-16 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Why You?</h2>
              <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { text: "Your smile makes ordinary days unforgettable. ❤️", icon: "Smile" },
                { text: "Your voice calms every storm inside me. 🌸", icon: "Volume2" },
                { text: "Your laugh is my favorite sound. ✨", icon: "Sparkles" },
                { text: "You make distance feel smaller. 🌙", icon: "Compass" },
                { text: "You made me believe love can feel safe. 🫶", icon: "ShieldCheck" },
                { text: "Somehow you became my home. ☁️", icon: "Home" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, rotate: Math.random() * 2 - 1 }}
                  className={`p-8 rounded-2xl glass-panel ${
                    isDarkMode ? "glass-panel-dark" : "bg-white/40 border-rose-100"
                  } flex flex-col items-start gap-4 transition-shadow hover:shadow-xl duration-300`}
                >
                  <div className="p-3.5 rounded-full bg-pink-100 dark:bg-purple-900/50 text-rose-500 dark:text-pink-300">
                    <SafeIcon name={item.icon} className="w-6 h-6" />
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-medium">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SECTION 3: TIMELINE (OUR STORY) */}
          <section className="py-16 bg-rose-50/30 dark:bg-purple-950/10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Our Story</h2>
                <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
              </div>

              {/* Horizontal Scroll wrapper */}
              <div className="relative py-8 overflow-x-auto flex gap-6 scrollbar-hide px-4">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 timeline-line -translate-y-1/2" />
                
                {TIMELINE_EVENTS.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="min-w-[280px] md:min-w-[340px] max-w-[340px] relative z-20 flex-shrink-0"
                  >
                    <div className={`p-6 rounded-2xl glass-panel ${
                      isDarkMode ? "glass-panel-dark" : "bg-white"
                    } border border-rose-100/50 shadow-lg hover:shadow-xl transition-shadow`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-100 dark:bg-purple-900 text-rose-500 dark:text-pink-300">
                          {event.date}
                        </span>
                        <div className="text-rose-400 dark:text-pink-300">
                          <SafeIcon name={event.iconName} className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-lg font-serif font-bold mb-2">{event.title}</h4>
                      <p className="text-xs md:text-sm text-stone-500 dark:text-pink-200/70 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4: THINGS I LOVE ABOUT YOU */}
          <section className="py-16 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Things I Love About You</h2>
              <p className="text-xs md:text-sm text-stone-500 dark:text-pink-200/70 mt-2 font-serif italic">
                (A little gallery of 25 details that make you, you)
              </p>
              <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {THINGS_I_LOVE.map((thing) => (
                <motion.div
                  key={thing.id}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`p-4 rounded-xl text-center glass-panel ${
                    isDarkMode ? "glass-panel-dark hover:border-pink-500/50" : "bg-white/50 hover:border-rose-300"
                  } border transition-all duration-300 flex flex-col items-center gap-2`}
                >
                  <div className="text-rose-500 dark:text-pink-300 mb-1">
                    <SafeIcon name={thing.iconName} className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">{thing.title}</span>
                  <p className="text-[10px] md:text-xs text-stone-500 dark:text-pink-200/70 leading-normal">
                    {thing.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SECTION 5: MEMORY GALLERY */}
          <section className="py-16 bg-rose-50/20 dark:bg-purple-950/5">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Memory Gallery</h2>
                <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
              </div>

              {/* Masonry / grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryPhotos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightboxImg(photo)}
                    className={`break-inside-avoid p-4 rounded-2xl shadow-md border cursor-zoom-in ${
                      isDarkMode ? "bg-purple-950/80 border-purple-800" : "bg-white border-rose-100"
                    } flex flex-col items-center`}
                  >
                    <div className="w-full aspect-square overflow-hidden rounded-lg mb-4 bg-rose-50/50 dark:bg-purple-900/10 flex items-center justify-center relative">
                      <img
                        src={photo.src}
                        alt="Memory Photo"
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500 ${photo.rotate ? 'rotate-270 scale-135' : ''}`}
                      />
                    </div>
                    <span className="font-handwriting text-2xl text-stone-600 dark:text-pink-200 tracking-wide text-center">
                      &quot;{photo.caption}&quot;
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: VOICE FROM MY HEART (LETTER ENVELOPE) */}
          <section className="py-16 max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Voice From My Heart</h2>
              <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-8 md:p-12 rounded-3xl border shadow-xl relative ${
                isDarkMode ? "bg-purple-950/60 border-purple-800" : "bg-amber-50/50 border-[#E8DFD8]"
              }`}
            >
              {/* Decorative top stamp icon */}
              <div className="absolute top-6 right-6 p-2 border border-dashed border-rose-300 dark:border-pink-800 rounded">
                <Icons.Heart className="text-rose-400 dark:text-pink-500 fill-rose-100 dark:fill-purple-950" size={32} />
              </div>

              <div className="space-y-6 text-[#5A4F46] dark:text-pink-100 max-w-xl font-handwriting text-2xl md:text-3xl leading-relaxed">
                <p>Dear Jaanu,</p>
                <p className="pl-4">
                  Every day with you makes my world softer. Even on difficult days, knowing you exist somehow makes everything lighter. You have become the first person I want to tell everything to.
                </p>
                <p className="pl-4">
                  Thank you for choosing me. Thank you for staying. Thank you for simply being you. Happy Girlfriend&apos;s Day, Jaanu. I love you endlessly.
                </p>
                <p className="text-right pt-4 font-elegant text-4xl text-rose-500 dark:text-pink-400">
                  Forever Yours,
                </p>
              </div>
            </motion.div>
          </section>

          {/* SECTION 7: REASONS I'LL ALWAYS CHOOSE YOU (SPINNING WHEEL) */}
          <section className="py-16 bg-rose-50/30 dark:bg-purple-950/10">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Reasons I&apos;ll Always Choose You</h2>
                <p className="text-xs md:text-sm text-stone-500 dark:text-pink-200/70 mt-2 font-serif italic">
                  (Spin the wheel to unlock one of 50 reasons)
                </p>
                <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
              </div>

              {/* Wheel Graphic container */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center mb-8">
                {/* Pointer arrow */}
                <div className="absolute -top-3 z-30 text-rose-500">
                  <Icons.ChevronDownSquare size={40} className="fill-rose-100" />
                </div>

                <motion.div
                  animate={{ rotate: wheelAngle }}
                  transition={spinning ? { duration: 3, ease: [0.25, 0.1, 0.25, 1] } : { duration: 0.5 }}
                  className="w-full h-full rounded-full border-4 border-rose-300 dark:border-pink-600 shadow-2xl relative overflow-hidden bg-gradient-to-tr from-pink-100 to-rose-200 dark:from-purple-950 dark:to-pink-900"
                >
                  {/* Wheel inner decoration/spokes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-pink-500 z-10 shadow border border-rose-300" />
                  </div>
                  {/* Outer circle slices indicators */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      style={{ transform: `rotate(${i * 30}deg)` }}
                      className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-rose-300/40 dark:bg-pink-500/20"
                    />
                  ))}
                </motion.div>
                
                {/* Spin Button */}
                <button
                  onClick={spinWheel}
                  disabled={spinning}
                  className="absolute p-6 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-sm shadow-md hover:scale-105 disabled:opacity-50 z-20"
                >
                  {spinning ? "Spinning..." : "SPIN"}
                </button>
              </div>

              {/* Reveal Chosen Reason */}
              <AnimatePresence mode="wait">
                {chosenReason && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-6 rounded-2xl glass-panel ${
                      isDarkMode ? "glass-panel-dark" : "bg-white"
                    } border border-rose-100 text-center max-w-md shadow-lg`}
                  >
                    <Icons.Heart className="text-rose-500 mx-auto mb-2 animate-bounce" size={24} />
                    <p className="text-base md:text-lg font-medium italic">
                      &quot;{chosenReason}&quot;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* SECTION 8: IF DISTANCE COULD TALK */}
          <section className="py-16 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">If Distance Could Talk</h2>
              <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative border border-rose-100/30 rounded-3xl p-8 bg-rose-50/10 dark:bg-purple-950/5">
              {/* Left Side (You) */}
              <div className="flex flex-col items-center p-6 text-center border-b md:border-b-0 md:border-r border-rose-100/30">
                <div className="w-20 h-20 rounded-full bg-pink-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <Icons.User size={36} className="text-rose-500 dark:text-pink-300" />
                </div>
                <h4 className="text-lg font-bold">Me</h4>
                <p className="text-xs text-stone-500 dark:text-pink-200/70 mt-1">Holding onto every promise</p>
              </div>

              {/* Right Side (Her) */}
              <div className="flex flex-col items-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-rose-100 dark:bg-pink-900 flex items-center justify-center mb-4 relative">
                  <Icons.UserCheck size={36} className="text-rose-500 dark:text-pink-300" />
                  <Icons.Heart className="absolute -top-1 -right-1 text-rose-500 fill-rose-300 animate-pulse" size={20} />
                </div>
                <h4 className="text-lg font-bold">Jaanu</h4>
                <p className="text-xs text-stone-500 dark:text-pink-200/70 mt-1">My safest, favorite place</p>
              </div>

              {/* Traveling messages line overlay */}
              <div className="absolute left-[30%] right-[30%] top-[40%] -translate-y-1/2 h-12 overflow-visible pointer-events-none hidden md:block z-20">
                <div className="absolute inset-x-0 top-1/2 h-0.5 border-t-2 border-dashed border-rose-300/40 dark:border-pink-500/30" />
                {distanceMessages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      left: msg.side === "left" ? `${msg.progress}%` : `${100 - msg.progress}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                    className="absolute bg-rose-400 dark:bg-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md transition-all duration-100 whitespace-nowrap"
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: LITTLE THINGS (CUTE FLOATING OBJECTS) */}
          <section className="py-16 bg-rose-50/20 dark:bg-purple-950/5">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Little Things</h2>
                <p className="text-xs md:text-sm text-stone-500 dark:text-pink-200/70 mt-2 font-serif italic">
                  (Click on any item to receive a message)
                </p>
                <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
              </div>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {["🍫", "🧸", "🌹", "❤️", "🌙", "⭐", "☕", "🍦", "💌", "💍"].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      showLittleMsg(item);
                      confetti({ particleCount: 15 });
                    }}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    className="text-4xl p-5 rounded-2xl glass-panel hover:scale-125 hover:rotate-6 transition-all duration-300 float-slow shadow-md hover:shadow-lg"
                    style={{ animationDelay: `${idx * 0.3}s` }}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {littleMsg && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-6 rounded-2xl border text-center max-w-md shadow-lg ${
                      isDarkMode ? "bg-purple-950/80 border-purple-800" : "bg-white border-rose-100"
                    }`}
                  >
                    <p className="text-base font-medium font-serif italic">
                      {littleMsg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* SECTION 10: DEEP QUESTIONS */}
          <section className="py-16 max-w-4xl mx-auto px-4 flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Deep Questions</h2>
              <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
            </div>

            <motion.div
              key={currentQuestion}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`w-full max-w-md p-8 md:p-12 rounded-3xl border shadow-xl text-center relative ${
                isDarkMode ? "bg-purple-950/60 border-purple-800" : "bg-white border-rose-100"
              }`}
            >
              <div className="text-rose-500 mb-4 flex justify-center">
                <Icons.HelpCircle size={40} className="animate-pulse" />
              </div>
              <p className="text-lg md:text-xl font-medium leading-relaxed font-serif mb-6">
                &quot;{currentQuestion}&quot;
              </p>
              <button
                onClick={newQuestion}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold text-xs shadow hover:from-pink-500 hover:to-rose-500"
              >
                Draw Another Question
              </button>
            </motion.div>
          </section>

          {/* SECTION 11: LOVE METER */}
          <section className="py-16 bg-rose-50/30 dark:bg-purple-950/10">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Love Meter</h2>
                <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
              </div>

              <div className="relative flex flex-col items-center">
                <button
                  onClick={startLoveMeter}
                  className="relative p-8 rounded-full hover:scale-105 transition-transform flex items-center justify-center"
                >
                  <Icons.Heart
                    size={110}
                    className={`text-rose-500 fill-rose-300 cursor-pointer ${meterTriggered ? "heart-beat" : ""}`}
                  />
                  <div className="absolute text-center text-white font-bold select-none">
                    <span className="text-xl block">
                      {lovePercentage === 1000 ? "∞" : `${lovePercentage}%`}
                    </span>
                    <span className="text-[10px] uppercase tracking-tighter">
                      {lovePercentage === 0 ? "Click Me" : "Loving..."}
                    </span>
                  </div>
                </button>
                
                {lovePercentage === 1000 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-xl font-serif font-bold text-rose-500 dark:text-pink-400">
                      Love cannot be measured.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 12: FUTURE DREAMS */}
          <section className="py-16 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Future Dreams</h2>
              <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DREAMS.map((dream) => (
                <motion.div
                  key={dream.id}
                  whileHover={{ scale: 1.03 }}
                  className={`p-6 rounded-2xl glass-panel ${
                    isDarkMode ? "glass-panel-dark" : "bg-white/40 border-rose-100"
                  } border shadow hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-pink-100 dark:bg-purple-900 text-rose-500 dark:text-pink-300">
                      <SafeIcon name={dream.iconName} className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base">{dream.title}</h4>
                  </div>
                  <p className="text-xs md:text-sm text-stone-500 dark:text-pink-200/70 leading-relaxed">
                    {dream.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SECTION 13: LOVE NOTES (STICKY NOTES) */}
          <section className="py-16 bg-rose-50/20 dark:bg-purple-950/5">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Love Notes</h2>
                <p className="text-xs md:text-sm text-stone-500 dark:text-pink-200/70 mt-2 font-serif italic">
                  (Peel open these little reminders)
                </p>
                <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {STICKY_NOTES.map((note) => (
                  <motion.div
                    key={note.id}
                    onClick={() => togglePeelNote(note.id)}
                    whileHover={{ scale: 1.05, rotate: note.id % 2 === 0 ? 3 : -3 }}
                    className={`p-6 rounded-xl shadow-md border cursor-pointer bg-gradient-to-br ${note.color} ${
                      peeledNotes[note.id] ? "opacity-40 line-through" : ""
                    } h-36 flex items-center justify-center text-center`}
                  >
                    <span className="font-handwriting text-2xl text-stone-800 font-semibold leading-snug">
                      {note.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 14: PLAYLIST */}
          <section className="py-16 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Our Playlist</h2>
              <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PLAYLIST.map((song) => (
                <div
                  key={song.id}
                  className={`p-6 rounded-2xl glass-panel ${
                    isDarkMode ? "glass-panel-dark" : "bg-white/40 border-rose-100"
                  } flex flex-col sm:flex-row gap-6 items-center`}
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-24 h-24 rounded-lg object-cover shadow-md"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-bold text-lg mb-2">{song.title}</h4>
                    <p className="text-xs italic text-stone-500 dark:text-pink-200/70 mb-3">
                      {song.lyric}
                    </p>
                    <div className="text-[11px] font-semibold text-stone-400 dark:text-pink-300">
                      Reason: <span className="font-normal">{song.reason}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 15: JAR OF HAPPINESS */}
          <section className="py-16 bg-rose-50/30 dark:bg-purple-950/10">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Jar of Happiness</h2>
                <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
              </div>

              {/* Jar Graphic */}
              <div className="relative w-48 h-64 border-4 border-rose-300 dark:border-pink-500 rounded-t-3xl rounded-b-2xl flex flex-col items-center justify-end p-4 bg-white/20 dark:bg-purple-950/40 shadow-2xl mb-8">
                {/* Lid */}
                <div className="absolute -top-4 w-32 h-6 bg-rose-400 dark:bg-pink-600 rounded-lg border border-white/10" />
                <div className="absolute inset-0 flex flex-wrap items-center justify-center p-6 gap-2 pointer-events-none opacity-45">
                  <div className="w-4 h-4 bg-pink-300 rotate-12 rounded" />
                  <div className="w-3 h-5 bg-purple-300 -rotate-12 rounded" />
                  <div className="w-5 h-3 bg-rose-300 rotate-45 rounded" />
                  <div className="w-4 h-4 bg-yellow-200 -rotate-45 rounded" />
                </div>
                
                <button
                  onClick={popJarNote}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-xs shadow-md hover:scale-105"
                >
                  Open Jar
                </button>
              </div>

              {/* Jar Notes Display */}
              <div className="w-full max-w-md space-y-3">
                <AnimatePresence>
                  {jarMessages.map((msg, idx) => (
                    <motion.div
                      key={msg}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -15 }}
                      className={`p-4 rounded-xl border text-center font-handwriting text-xl ${
                        idx === 0
                          ? "bg-gradient-to-r from-rose-50 to-pink-50 dark:from-purple-900 dark:to-purple-950 border-rose-300 scale-105 shadow-md font-semibold"
                          : "bg-white/40 dark:bg-purple-950/20 border-rose-100 opacity-60"
                      }`}
                    >
                      &quot;{msg}&quot;
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* SECTION 16: COUNTDOWN */}
          <section className="py-16 max-w-4xl mx-auto px-4 flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">Until We Meet Again</h2>
              <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-4 gap-4 md:gap-6 text-center">
              {[
                { label: "Days", value: countdownTime.days },
                { label: "Hours", value: countdownTime.hours },
                { label: "Minutes", value: countdownTime.minutes },
                { label: "Seconds", value: countdownTime.seconds }
              ].map((time, idx) => (
                <div
                  key={idx}
                  className={`p-4 md:p-6 rounded-2xl glass-panel ${
                    isDarkMode ? "glass-panel-dark" : "bg-white"
                  } border border-rose-100/50 shadow-md min-w-[70px] md:min-w-[100px]`}
                >
                  <span className="text-2xl md:text-4xl font-bold font-serif text-rose-500 dark:text-pink-400 block mb-1">
                    {time.value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-stone-400 dark:text-pink-300">
                    {time.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 17: PROMISE CARDS */}
          <section className="py-16 bg-rose-50/20 dark:bg-purple-950/5">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-500 dark:text-pink-400">My Promises To You</h2>
                <div className="w-16 h-0.5 bg-rose-200 dark:bg-pink-800 mx-auto mt-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROMISES.map((promise, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    className={`p-6 rounded-2xl glass-panel ${
                      isDarkMode ? "glass-panel-dark" : "bg-white/40 border-rose-100"
                    } border shadow-md flex flex-col gap-3`}
                  >
                    <div className="flex items-center gap-2 text-rose-500 dark:text-pink-300">
                      <Icons.HeartHandshake size={20} />
                      <h4 className="font-bold text-base">{promise.title}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-stone-500 dark:text-pink-200/70 leading-relaxed">
                      {promise.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL SECTION */}
          <section className="py-24 text-center px-4 relative flex flex-col items-center justify-center overflow-hidden">
            {/* Dark starry background for final section */}
            <div className="absolute inset-0 bg-[#0E061E] dark:bg-[#070112] z-0" />
            
            {/* Glowing moon */}
            <div className="absolute top-12 right-12 w-20 h-20 rounded-full bg-yellow-100/10 blur-xl z-0" />
            <div className="absolute top-12 right-12 w-16 h-16 rounded-full bg-yellow-50 z-0 opacity-70" />

            {/* Surprise shooting stars click triggers */}
            <button
              onClick={() => setShootingStarMsg("🌟 'My greatest dream is growing old together with you, Jaanu.'")}
              className="absolute top-24 left-1/4 text-white/40 hover:text-white hover:scale-125 z-10 transition-transform"
            >
              <Icons.Sparkles size={16} />
            </button>

            <div className="max-w-2xl mx-auto z-10 text-white flex flex-col items-center">
              <motion.div
                onClick={clickEasterEgg}
                className="relative mb-8 cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                <Icons.Heart
                  size={120}
                  className="text-pink-500 fill-pink-600/55 heart-beat shadow-pink-500/50 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]"
                />
                <span className="absolute inset-0 flex items-center justify-center font-elegant text-4xl text-white select-none">
                  Love
                </span>
              </motion.div>

              <p className="font-serif italic text-lg md:text-xl text-pink-100 max-w-xl leading-relaxed mb-10">
                &quot;No matter where life takes us, no matter how many kilometers separate us, you&apos;ll always be my favorite person, my safest place, my biggest blessing, and the best part of every single day. I love you today. Tomorrow. And every tomorrow after that. Forever. ❤️&quot;
              </p>

              <button
                onClick={() => {
                  setHeartOpened(false);
                  setLovePercentage(0);
                  setMeterTriggered(false);
                  setJarMessages([]);
                  confetti({ particleCount: 80 });
                }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:from-pink-600 hover:to-purple-700 hover:scale-105 active:scale-95 transition-all"
              >
                Replay Our Story
              </button>
            </div>
          </section>

        </motion.div>
      )}
    </div>
  );
}
