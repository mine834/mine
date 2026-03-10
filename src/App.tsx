/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Flame, 
  Play, 
  Eye, 
  Home, 
  BookOpen, 
  PlayCircle, 
  User,
  SlidersHorizontal,
  Plus,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  X,
  Edit2,
  Trash2,
  Save,
  FileText,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface VideoCard {
  id: string;
  image: string;
  title: string;
  views: string;
  category: string;
  duration: string;
}

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface Deck {
  id: string;
  name: string;
  cards: Flashcard[];
}

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  image: string;
}

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link';
  url: string;
}

// --- Components ---

const Header = ({ language }: { language: string }) => {
  const greetings: Record<string, string> = {
    korean: '안녕하세요',
    mongolian: 'Сайн байна уу',
    english: 'Hello'
  };

  return (
    <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/10">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
            alt="User profile"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">Learn with Minea</p>
          <h1 className="text-sm font-medium text-slate-500">{greetings[language] || greetings.korean}</h1>
          <p className="text-lg font-bold leading-tight">Sarah Wilson</p>
        </div>
      </div>
      <button className="size-10 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
        <Bell className="size-5 text-slate-600" />
      </button>
    </header>
  );
};

const DailyGoal = () => (
  <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mx-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-slate-800">Daily Goal</h2>
      <span className="text-sm font-bold text-primary">85%</span>
    </div>
    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '85%' }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-primary h-full rounded-full" 
      />
    </div>
    <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
      <Flame className="size-4 text-orange-500 fill-orange-500" />
      12 day streak! Keep it up.
    </p>
  </section>
);

const ContinueLearning = ({ lesson, onEdit }: { lesson: Lesson, onEdit?: () => void }) => (
  <section className="px-4">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-bold">Continue Learning</h2>
      <div className="flex items-center gap-2">
        {onEdit && (
          <button onClick={onEdit} className="p-1 hover:bg-slate-100 rounded text-slate-400">
            <Edit2 className="size-4" />
          </button>
        )}
        <button className="text-primary text-sm font-semibold hover:underline">View All</button>
      </div>
    </div>
    <motion.div 
      whileHover={{ y: -4 }}
      className="flex flex-col items-stretch justify-start rounded-2xl shadow-sm bg-white border border-slate-100 overflow-hidden"
    >
      <div 
        className="w-full aspect-video bg-cover bg-center relative" 
        style={{ backgroundImage: `url("${lesson.image}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{lesson.level}</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-slate-900 text-lg font-bold leading-tight">{lesson.title}</p>
          <p className="text-slate-500 text-sm mt-1">{lesson.subtitle}</p>
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="size-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img 
                  src={`https://i.pravatar.cc/100?u=${i}`} 
                  alt="Student" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            <div className="flex items-center justify-center size-6 rounded-full border-2 border-white bg-primary/10 text-[8px] font-bold text-primary">
              +12
            </div>
          </div>
          <button className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
            Resume Lesson
          </button>
        </div>
      </div>
    </motion.div>
  </section>
);

const VideoCardComp: React.FC<{ video: VideoCard }> = ({ video }) => (
  <div className="min-w-[280px] group cursor-pointer">
    <div className="relative aspect-video rounded-2xl overflow-hidden mb-2 bg-slate-200">
      <img 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        src={video.image} 
        alt={video.title}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <PlayCircle className="size-12 text-white fill-white/20" />
      </div>
      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
        {video.duration}
      </div>
    </div>
    <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">{video.title}</h3>
    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
      <Eye className="size-3" /> {video.views} views • {video.category}
    </p>
  </div>
);

const RecommendedSection = ({ videos, onEdit }: { videos: VideoCard[], onEdit?: () => void }) => (
  <section className="px-4">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-bold">Recommended for You</h2>
      <div className="flex items-center gap-2">
        {onEdit && (
          <button onClick={onEdit} className="p-1 hover:bg-slate-100 rounded text-slate-400">
            <Edit2 className="size-4" />
          </button>
        )}
        <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
          <SlidersHorizontal className="size-5 text-slate-400" />
        </button>
      </div>
    </div>
    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
      {videos.map(video => (
        <VideoCardComp key={video.id} video={video} />
      ))}
    </div>
  </section>
);

// --- Flashcard Feature Components ---

const FlashcardStudy = ({ deck, onBack }: { deck: Deck, onBack: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = deck.cards[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + deck.cards.length) % deck.cards.length);
    }, 150);
  };

  if (!currentCard) return null;

  return (
    <div className="flex flex-col h-full space-y-6 px-4 py-2">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="size-6" />
        </button>
        <h2 className="font-bold text-lg">{deck.name}</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-sm font-medium text-slate-400">
          Card {currentIndex + 1} of {deck.cards.length}
        </div>

        <div 
          className="relative w-full aspect-[3/4] max-w-[300px] perspective-1000 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="w-full h-full relative preserve-3d transition-transform duration-500"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center p-8 text-center">
              <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Front</span>
              <p className="text-4xl font-bold text-slate-800">{currentCard.front}</p>
              <div className="absolute bottom-8 text-slate-300 flex items-center gap-2">
                <RotateCw className="size-4" />
                <span className="text-xs">Tap to flip</span>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden bg-primary rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center rotate-y-180">
              <span className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Back</span>
              <p className="text-3xl font-bold text-white">{currentCard.back}</p>
              <div className="absolute bottom-8 text-white/40 flex items-center gap-2">
                <RotateCw className="size-4" />
                <span className="text-xs">Tap to flip</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={prevCard}
            className="size-14 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button 
            onClick={nextCard}
            className="size-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const DeckEditor = ({ deck, onSave, onCancel }: { deck: Deck, onSave: (deck: Deck) => void, onCancel: () => void }) => {
  const [editedDeck, setEditedDeck] = useState<Deck>({ ...deck, cards: [...deck.cards] });

  const handleRename = (name: string) => {
    setEditedDeck({ ...editedDeck, name });
  };

  const handleUpdateCard = (id: string, field: 'front' | 'back', value: string) => {
    setEditedDeck({
      ...editedDeck,
      cards: editedDeck.cards.map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  const handleAddCard = () => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      front: '',
      back: ''
    };
    setEditedDeck({ ...editedDeck, cards: [...editedDeck.cards, newCard] });
  };

  const handleRemoveCard = (id: string) => {
    setEditedDeck({ ...editedDeck, cards: editedDeck.cards.filter(c => c.id !== id) });
  };

  return (
    <div className="flex flex-col h-full bg-white px-4 py-2">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronLeft className="size-6" />
        </button>
        <h2 className="font-bold text-lg">Edit Deck</h2>
        <button onClick={() => onSave(editedDeck)} className="p-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20">
          <Save className="size-5" />
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto pb-20 hide-scrollbar">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Deck Name</label>
          <input 
            type="text" 
            value={editedDeck.name}
            onChange={(e) => handleRename(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cards</label>
            <button onClick={handleAddCard} className="text-primary text-xs font-bold flex items-center gap-1">
              <Plus className="size-4" /> Add Card
            </button>
          </div>

          {editedDeck.cards.map((card, index) => (
            <div key={card.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative">
              <button 
                onClick={() => handleRemoveCard(card.id)}
                className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
              <div className="text-[10px] font-bold text-slate-400">#{index + 1}</div>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Front"
                  value={card.front}
                  onChange={(e) => handleUpdateCard(card.id, 'front', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-primary text-sm"
                />
                <input 
                  type="text" 
                  placeholder="Back"
                  value={card.back}
                  onChange={(e) => handleUpdateCard(card.id, 'back', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FlashcardManager = ({ decks, setDecks }: { decks: Deck[], setDecks: (decks: Deck[]) => void }) => {
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');

  const handleCreateDeck = () => {
    if (!newDeckName.trim()) return;
    const newDeck: Deck = {
      id: Date.now().toString(),
      name: newDeckName,
      cards: [{ id: '1', front: 'Hello', back: '안녕하세요' }]
    };
    setDecks([...decks, newDeck]);
    setNewDeckName('');
    setIsCreating(false);
  };

  const handleSaveDeck = (updatedDeck: Deck) => {
    setDecks(decks.map(d => d.id === updatedDeck.id ? updatedDeck : d));
    setEditingDeck(null);
  };

  if (activeDeck) {
    return <FlashcardStudy deck={activeDeck} onBack={() => setActiveDeck(null)} />;
  }

  if (editingDeck) {
    return <DeckEditor deck={editingDeck} onSave={handleSaveDeck} onCancel={() => setEditingDeck(null)} />;
  }

  return (
    <div className="px-4 space-y-6 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Flashcards</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <Plus className="size-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group"
          >
            <div className="flex-1 cursor-pointer" onClick={() => setActiveDeck(deck)}>
              <h3 className="font-bold text-slate-800">{deck.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{deck.cards.length} cards</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setEditingDeck(deck)}
                className="p-2 text-slate-300 hover:text-primary transition-colors"
              >
                <Edit2 className="size-5" />
              </button>
              <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                <BookOpen className="size-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreating(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">New Deck</h3>
                <button onClick={() => setIsCreating(false)} className="text-slate-400">
                  <X className="size-5" />
                </button>
              </div>
              <input 
                type="text" 
                placeholder="Deck name (e.g. Travel)"
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors mb-6"
                autoFocus
              />
              <button 
                onClick={handleCreateDeck}
                className="w-full py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20"
              >
                Create Deck
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View Components ---

const HomeView = ({ 
  lesson, 
  videos, 
  onEditLesson, 
  onEditVideos 
}: { 
  lesson: Lesson, 
  videos: VideoCard[], 
  onEditLesson: () => void,
  onEditVideos: () => void
}) => (
  <main className="space-y-8 py-2">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DailyGoal />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <ContinueLearning lesson={lesson} onEdit={onEditLesson} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <RecommendedSection videos={videos} onEdit={onEditVideos} />
    </motion.div>
  </main>
);

const CoursesView = () => (
  <div className="px-4 py-2 space-y-6">
    <h2 className="text-2xl font-bold">Courses</h2>
    <div className="grid grid-cols-1 gap-4">
      {[
        { title: 'Beginner Korean I', level: 'Level 1', progress: 100 },
        { title: 'Beginner Korean II', level: 'Level 2', progress: 45 },
        { title: 'Intermediate Korean I', level: 'Level 3', progress: 0 },
      ].map((course, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-slate-800">{course.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{course.level}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${course.progress === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
              {course.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MyLessonsView = ({ 
  decks, 
  setDecks, 
  materials, 
  setMaterials,
  onAddMaterial
}: { 
  decks: Deck[], 
  setDecks: (decks: Deck[]) => void,
  materials: Material[],
  setMaterials: (mats: Material[]) => void,
  onAddMaterial: () => void
}) => {
  const [view, setView] = useState<'flashcards' | 'materials'>('flashcards');

  return (
    <div className="space-y-6">
      <div className="px-4 flex gap-2">
        <button 
          onClick={() => setView('flashcards')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${view === 'flashcards' ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-slate-100'}`}
        >
          Flashcards
        </button>
        <button 
          onClick={() => setView('materials')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${view === 'materials' ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-slate-100'}`}
        >
          Materials
        </button>
      </div>

      {view === 'flashcards' ? (
        <FlashcardManager decks={decks} setDecks={setDecks} />
      ) : (
        <div className="px-4 space-y-6 py-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Materials</h2>
            <button 
              onClick={onAddMaterial}
              className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Plus className="size-6" />
            </button>
          </div>
          <div className="space-y-4">
            {materials.map(mat => (
              <div key={mat.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                  <FileText className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{mat.title}</h3>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-1">{mat.type}</p>
                </div>
                <button className="text-primary text-sm font-bold">Open</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileView = ({ language, setLanguage }: { language: string, setLanguage: (l: string) => void }) => (
  <div className="px-4 py-2 space-y-8">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="size-24 rounded-full border-4 border-white shadow-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300" 
          alt="Profile"
          referrerPolicy="no-referrer"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold">Sarah Wilson</h2>
        <p className="text-slate-400">Intermediate Learner</p>
      </div>
    </div>

    <div className="space-y-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Language</label>
      <div className="grid grid-cols-3 gap-2">
        {['korean', 'mongolian', 'english'].map(lang => (
          <button 
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-3 rounded-xl border text-xs font-bold capitalize transition-colors flex flex-col items-center gap-2 ${language === lang ? 'bg-primary border-primary text-white' : 'bg-white border-slate-100 text-slate-400'}`}
          >
            <Globe className="size-4" />
            {lang}
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
        <p className="text-2xl font-bold text-primary">1,240</p>
        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-1">Exp</p>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
        <p className="text-2xl font-bold text-orange-500">12</p>
        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-1">Streak</p>
      </div>
    </div>

    <div className="space-y-3 pb-20">
      {['Account Settings', 'Learning Reminders', 'Help & Support', 'Logout'].map((item, i) => (
        <button key={i} className="w-full p-4 bg-white rounded-2xl border border-slate-100 text-left font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          {item}
        </button>
      ))}
    </div>
  </div>
);

const BottomNav = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-6 pb-8 pt-3 z-50">
    <div className="flex justify-between items-center max-w-md mx-auto">
      <NavItem icon={<Home className="size-6" />} label="Home" active={activeTab === 'home'} onClick={() => onTabChange('home')} />
      <NavItem icon={<BookOpen className="size-6" />} label="Courses" active={activeTab === 'courses'} onClick={() => onTabChange('courses')} />
      <NavItem icon={<Play className="size-6" />} label="My Lessons" active={activeTab === 'lessons'} onClick={() => onTabChange('lessons')} />
      <NavItem icon={<User className="size-6" />} label="Profile" active={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
    </div>
  </nav>
);

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={active ? 'fill-primary' : ''}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
  </button>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('korean');

  // Global Data States
  const [decks, setDecks] = useState<Deck[]>([
    {
      id: '1',
      name: 'Essential Verbs',
      cards: [
        { id: 'v1', front: '먹다', back: 'To eat' },
        { id: 'v2', front: '가да', back: 'To go' },
        { id: 'v3', front: '자다', back: 'To sleep' },
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
  ]);

  const [lesson, setLesson] = useState<Lesson>({
    id: 'l1',
    title: 'Intermediate Korean II',
    subtitle: 'Unit 4: Formal & Honorific Expressions',
    level: 'Intermediate II',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
  });

  const [videos, setVideos] = useState<VideoCard[]>([
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
  ]);

  const [materials, setMaterials] = useState<Material[]>([
    { id: 'm1', title: 'Korean Grammar Guide', type: 'pdf', url: '#' },
    { id: 'm2', title: 'Top 100 Verbs List', type: 'pdf', url: '#' },
    { id: 'm3', title: 'Honorifics Worksheet', type: 'doc', url: '#' }
  ]);

  const [editingLesson, setEditingLesson] = useState(false);
  const [editingVideos, setEditingVideos] = useState(false);
  const [addingMaterial, setAddingMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: '', type: 'pdf' as const });

  const handleAddMaterial = () => {
    if (!newMaterial.title.trim()) return;
    const mat: Material = {
      id: Date.now().toString(),
      title: newMaterial.title,
      type: newMaterial.type,
      url: '#'
    };
    setMaterials([...materials, mat]);
    setNewMaterial({ title: '', type: 'pdf' });
    setAddingMaterial(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return (
        <HomeView 
          lesson={lesson} 
          videos={videos} 
          onEditLesson={() => setEditingLesson(true)}
          onEditVideos={() => setEditingVideos(true)}
        />
      );
      case 'courses': return <CoursesView />;
      case 'lessons': return (
        <MyLessonsView 
          decks={decks} 
          setDecks={setDecks} 
          materials={materials} 
          setMaterials={setMaterials}
          onAddMaterial={() => setAddingMaterial(true)}
        />
      );
      case 'profile': return <ProfileView language={language} setLanguage={setLanguage} />;
      default: return <HomeView lesson={lesson} videos={videos} onEditLesson={() => setEditingLesson(true)} onEditVideos={() => setEditingVideos(true)} />;
    }
  };

  return (
    <div className="min-h-screen pb-32 max-w-md mx-auto bg-background-light relative shadow-2xl shadow-black/10">
      <Header language={language} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Lesson Editor Modal */}
      <AnimatePresence>
        {editingLesson && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingLesson(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-bold text-lg">Edit Lesson</h3>
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={lesson.title} 
                  onChange={(e) => setLesson({...lesson, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                  placeholder="Title"
                />
                <input 
                  type="text" 
                  value={lesson.subtitle} 
                  onChange={(e) => setLesson({...lesson, subtitle: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                  placeholder="Subtitle"
                />
                <input 
                  type="text" 
                  value={lesson.level} 
                  onChange={(e) => setLesson({...lesson, level: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                  placeholder="Level"
                />
              </div>
              <button onClick={() => setEditingLesson(false)} className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">Save Changes</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Videos Editor Modal */}
      <AnimatePresence>
        {editingVideos && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingVideos(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto hide-scrollbar">
              <h3 className="font-bold text-lg">Edit Recommended</h3>
              {videos.map((vid, idx) => (
                <div key={vid.id} className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400">Video #{idx + 1}</div>
                  <input 
                    type="text" 
                    value={vid.title} 
                    onChange={(e) => setVideos(videos.map(v => v.id === vid.id ? {...v, title: e.target.value} : v))}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                    placeholder="Title"
                  />
                  <input 
                    type="text" 
                    value={vid.views} 
                    onChange={(e) => setVideos(videos.map(v => v.id === vid.id ? {...v, views: e.target.value} : v))}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                    placeholder="Views"
                  />
                </div>
              ))}
              <button onClick={() => setEditingVideos(false)} className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">Save Changes</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Material Modal */}
      <AnimatePresence>
        {addingMaterial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAddingMaterial(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-bold text-lg">Add Material</h3>
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={newMaterial.title} 
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                  placeholder="Material Title"
                />
                <select 
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value as 'pdf' | 'doc' | 'link'})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                >
                  <option value="pdf">PDF</option>
                  <option value="doc">Document</option>
                  <option value="link">Link</option>
                </select>
              </div>
              <button onClick={handleAddMaterial} className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">Add Material</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
