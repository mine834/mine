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
      duration: '12:45'
    },
    {
      id: 'v2',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=600',
      title: 'Street Food Vocabulary',
      views: '3.5k',
      category: 'Vocabulary',
      duration: '08:20'
    },
    {
      id: 'v3',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=600',
      title: 'Social Etiquette 101',
      views: '920',
      category: 'Manners',
      duration: '15:10'
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
    duration: '20:00'
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
