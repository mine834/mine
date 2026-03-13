import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data.json");

// Initial data
const initialData = {
  lesson: {
    id: 'l1',
    title: 'Intermediate Korean II',
    subtitle: 'Unit 4: Formal & Honorific Expressions',
    level: 'Intermediate II',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
  },
  videos: [
    {
      id: 'v1',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600',
      title: 'Documentary: Life in Seoul',
      views: '1.2k',
      category: 'Cultural',
      duration: '12:45',
      url: 'https://www.youtube.com/watch?v=2e9S2z3vJ8I'
    },
    {
      id: 'v2',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=600',
      title: 'Street Food Vocabulary',
      views: '3.5k',
      category: 'Vocabulary',
      duration: '08:20',
      url: 'https://www.youtube.com/watch?v=0_W2V2S0W38'
    },
    {
      id: 'v3',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=600',
      title: 'Social Etiquette 101',
      views: '920',
      category: 'Manners',
      duration: '15:10',
      url: 'https://www.youtube.com/watch?v=n7_Y2X2X2X2'
    }
  ],
  materials: [
    { id: 'm1', title: 'Korean Grammar Guide', type: 'pdf', url: 'https://example.com/grammar.pdf' },
    { id: 'm2', title: 'Top 100 Verbs List', type: 'pdf', url: 'https://example.com/verbs.pdf' },
    { id: 'm3', title: 'Honorifics Worksheet', type: 'doc', url: 'https://example.com/worksheet.doc' }
  ],
  featuredRecommendation: {
    id: 'featured',
    title: 'Mastering Korean Particles',
    description: 'Learn the subtle differences between 은/는 and 이/가 with our visual guide. This comprehensive lesson covers context, emphasis, and common mistakes made by beginners.',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=600',
    views: '10k',
    category: 'Grammar',
    duration: '20:00',
    url: 'https://www.youtube.com/watch?v=pW1vXp9vXp8'
  },
  discussions: [
    { id: 'd1', user: 'Min-ji Kim', content: 'What is the best way to practice pronunciation?', likes: 12, replies: 5, date: '2h ago' },
    { id: 'd2', user: 'Alex Chen', content: 'I just finished Level 1! Any tips for Level 2?', likes: 8, replies: 2, date: '5h ago' }
  ],
  courses: [
    { id: 'b1', title: 'Beginner Korean I', level: 'Level 1', progress: 100 },
    { id: 'b2', title: 'Beginner Korean II', level: 'Level 2', progress: 45 },
    { id: 'i1', title: 'Intermediate Korean I', level: 'Level 3', progress: 0 },
  ],
  decks: [
    {
      id: '1',
      name: 'Basic Greetings',
      cards: [
        { id: 'g1', front: '안녕하세요', back: 'Hello (Formal)' },
        { id: 'g2', front: '반갑습니다', back: 'Nice to meet you' },
        { id: 'g3', front: '감사합니다', back: 'Thank you' },
      ]
    },
    {
      id: '2',
      name: 'Food & Drinks',
      cards: [
        { id: 'f1', front: '물', back: 'Water' },
        { id: 'f2', front: '밥', back: 'Rice/Meal' },
        { id: 'f3', front: '김치', back: 'Kimchi' },
      ]
    }
  ],
  profile: {
    name: 'am5441728',
    username: 'am5441728',
    email: 'am5441728@gmail.com',
    level: 'Intermediate',
    language: 'korean',
    role: 'customer'
  }
};

// Load data from file or use initial data
function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch (e) {
      console.error("Error loading data:", e);
      return initialData;
    }
  }
  return initialData;
}

// Save data to file
function saveData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error saving data:", e);
  }
}

let appData = loadData();
if (!fs.existsSync(DATA_FILE)) {
  saveData(appData);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/data", (req, res) => {
    res.json(appData);
  });

  app.post("/api/data", (req, res) => {
    appData = { ...appData, ...req.body };
    saveData(appData);
    res.json({ status: "ok", data: appData });
  });

  app.post("/api/videos", (req, res) => {
    appData.videos = req.body;
    saveData(appData);
    res.json({ status: "ok", videos: appData.videos });
  });

  app.post("/api/materials", (req, res) => {
    appData.materials = req.body;
    saveData(appData);
    res.json({ status: "ok", materials: appData.materials });
  });

  app.post("/api/courses", (req, res) => {
    appData.courses = req.body;
    saveData(appData);
    res.json({ status: "ok", courses: appData.courses });
  });

  app.post("/api/decks", (req, res) => {
    appData.decks = req.body;
    saveData(appData);
    res.json({ status: "ok", decks: appData.decks });
  });

  app.post("/api/profile", (req, res) => {
    appData.profile = req.body;
    saveData(appData);
    res.json({ status: "ok", profile: appData.profile });
  });

  app.post("/api/featured", (req, res) => {
    appData.featuredRecommendation = req.body;
    saveData(appData);
    res.json({ status: "ok", featured: appData.featuredRecommendation });
  });

  app.post("/api/lesson", (req, res) => {
    appData.lesson = req.body;
    saveData(appData);
    res.json({ status: "ok", lesson: appData.lesson });
  });

  app.get("/api/discussions", (req, res) => {
    res.json(appData.discussions || []);
  });

  app.post("/api/discussions", (req, res) => {
    const newDiscussion = {
      id: Date.now().toString(),
      user: req.body.user || 'Anonymous',
      content: req.body.content,
      likes: 0,
      replies: 0,
      date: 'Just now'
    };
    appData.discussions = [newDiscussion, ...(appData.discussions || [])];
    saveData(appData);
    res.json({ status: "ok", discussion: newDiscussion });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
