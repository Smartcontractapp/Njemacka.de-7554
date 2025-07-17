import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import QuizCard from '../components/QuizCard';
import SEOHead from '../components/SEOHead';

const { FiBookOpen, FiCheckSquare, FiRotateCw, FiAward, FiHelpCircle, FiFilter } = FiIcons;

// Quiz podaci
const quizData = [
  {
    id: 1,
    question: "Kako kažete 'Dobro jutro' na njemačkom?",
    options: ["Guten Morgen", "Guten Tag", "Gute Nacht", "Auf Wiedersehen"],
    correctAnswer: "Guten Morgen",
    explanation: "'Guten Morgen' je pozdrav koji se koristi ujutro. 'Guten Tag' znači 'Dobar dan', 'Gute Nacht' znači 'Laku noć', a 'Auf Wiedersehen' znači 'Doviđenja'.",
    category: "Pozdravi",
    difficulty: "Početnik"
  },
  {
    id: 2,
    question: "Koja je njemačka riječ za 'hvala'?",
    options: ["Bitte", "Entschuldigung", "Danke", "Tschüss"],
    correctAnswer: "Danke",
    explanation: "'Danke' znači 'hvala'. 'Bitte' ima više značenja, uključujući 'molim' ili 'izvolite', 'Entschuldigung' znači 'oprostite', a 'Tschüss' znači 'zdravo' pri odlasku.",
    category: "Osnovne fraze",
    difficulty: "Početnik"
  },
  {
    id: 3,
    question: "Kako se kaže 'Ja sam student' na njemačkom?",
    options: ["Ich bin Lehrer", "Ich bin Student", "Ich bin Arzt", "Ich bin müde"],
    correctAnswer: "Ich bin Student",
    explanation: "'Ich bin Student' znači 'Ja sam student'. 'Ich bin Lehrer' znači 'Ja sam učitelj', 'Ich bin Arzt' znači 'Ja sam doktor', a 'Ich bin müde' znači 'Ja sam umoran'.",
    category: "Predstavljanje",
    difficulty: "Početnik"
  },
  {
    id: 4,
    question: "Koji je njemački prijevod za 'kuća'?",
    options: ["Auto", "Haus", "Baum", "Straße"],
    correctAnswer: "Haus",
    explanation: "'Haus' znači 'kuća'. 'Auto' znači 'automobil', 'Baum' znači 'drvo', a 'Straße' znači 'ulica'.",
    category: "Svakodnevne riječi",
    difficulty: "Početnik"
  },
  {
    id: 5,
    question: "Kako se kaže 'Koliko je sati?' na njemačkom?",
    options: ["Wie alt bist du?", "Wie heißt du?", "Wie viel kostet das?", "Wie spät ist es?"],
    correctAnswer: "Wie spät ist es?",
    explanation: "'Wie spät ist es?' znači 'Koliko je sati?'. 'Wie alt bist du?' znači 'Koliko imaš godina?', 'Wie heißt du?' znači 'Kako se zoveš?', a 'Wie viel kostet das?' znači 'Koliko to košta?'.",
    category: "Pitanja",
    difficulty: "Početnik"
  },
  {
    id: 6,
    question: "Kako biste rekli 'Gdje je stanica?' na njemačkom?",
    options: ["Wo ist der Bahnhof?", "Wann kommt der Zug?", "Wie komme ich zum Hotel?", "Was kostet ein Ticket?"],
    correctAnswer: "Wo ist der Bahnhof?",
    explanation: "'Wo ist der Bahnhof?' znači 'Gdje je stanica?'. 'Wann kommt der Zug?' znači 'Kada dolazi voz?', 'Wie komme ich zum Hotel?' znači 'Kako da dođem do hotela?', a 'Was kostet ein Ticket?' znači 'Koliko košta karta?'.",
    category: "Putovanje",
    difficulty: "Početnik"
  },
  {
    id: 7,
    question: "Koja je njemačka riječ za 'restoran'?",
    options: ["Geschäft", "Kino", "Restaurant", "Bibliothek"],
    correctAnswer: "Restaurant",
    explanation: "'Restaurant' znači 'restoran'. 'Geschäft' znači 'prodavnica', 'Kino' znači 'bioskop', a 'Bibliothek' znači 'biblioteka'.",
    category: "Mjesta",
    difficulty: "Početnik"
  },
  {
    id: 8,
    question: "Kako se kaže 'Ja govorim malo njemački' na njemačkom?",
    options: ["Ich spreche kein Deutsch", "Ich spreche gut Deutsch", "Ich spreche ein bisschen Deutsch", "Ich lerne Deutsch"],
    correctAnswer: "Ich spreche ein bisschen Deutsch",
    explanation: "'Ich spreche ein bisschen Deutsch' znači 'Ja govorim malo njemački'. 'Ich spreche kein Deutsch' znači 'Ne govorim njemački', 'Ich spreche gut Deutsch' znači 'Dobro govorim njemački', a 'Ich lerne Deutsch' znači 'Učim njemački'.",
    category: "Jezičke vještine",
    difficulty: "Početnik"
  },
  {
    id: 9,
    question: "Kako se na njemačkom kaže 'Želim kafu, molim'?",
    options: ["Ich möchte einen Tee, bitte", "Ich möchte einen Kaffee, bitte", "Ich möchte Wasser, bitte", "Ich möchte ein Bier, bitte"],
    correctAnswer: "Ich möchte einen Kaffee, bitte",
    explanation: "'Ich möchte einen Kaffee, bitte' znači 'Želim kafu, molim'. 'Ich möchte einen Tee, bitte' znači 'Želim čaj, molim', 'Ich möchte Wasser, bitte' znači 'Želim vodu, molim', a 'Ich möchte ein Bier, bitte' znači 'Želim pivo, molim'.",
    category: "U kafiću",
    difficulty: "Početnik"
  },
  {
    id: 10,
    question: "Koja je njemačka riječ za 'prijatelj'?",
    options: ["Familie", "Freund", "Kollege", "Nachbar"],
    correctAnswer: "Freund",
    explanation: "'Freund' znači 'prijatelj'. 'Familie' znači 'porodica', 'Kollege' znači 'kolega', a 'Nachbar' znači 'komšija'.",
    category: "Odnosi",
    difficulty: "Početnik"
  },
  {
    id: 11,
    question: "Kako se kaže 'Trebam pomoć' na njemačkom?",
    options: ["Ich brauche Hilfe", "Ich bin verloren", "Ich verstehe nicht", "Ich habe ein Problem"],
    correctAnswer: "Ich brauche Hilfe",
    explanation: "'Ich brauche Hilfe' znači 'Trebam pomoć'. 'Ich bin verloren' znači 'Izgubljen sam', 'Ich verstehe nicht' znači 'Ne razumijem', a 'Ich habe ein Problem' znači 'Imam problem'.",
    category: "Hitne situacije",
    difficulty: "Srednje"
  },
  {
    id: 12,
    question: "Kako se kaže 'Sretan rođendan' na njemačkom?",
    options: ["Frohe Weihnachten", "Alles Gute", "Herzlichen Glückwunsch zum Geburtstag", "Gute Besserung"],
    correctAnswer: "Herzlichen Glückwunsch zum Geburtstag",
    explanation: "'Herzlichen Glückwunsch zum Geburtstag' znači 'Sretan rođendan'. 'Frohe Weihnachten' znači 'Sretan Božić', 'Alles Gute' znači 'Sve najbolje', a 'Gute Besserung' znači 'Brz oporavak'.",
    category: "Prigode",
    difficulty: "Srednje"
  }
];

// Kategorije i težine za filtere
const categories = ["Sve", ...Array.from(new Set(quizData.map(q => q.category)))];
const difficulties = ["Sve", "Početnik", "Srednje", "Napredni"];

const GermanQuiz = () => {
  const [selectedCategory, setSelectedCategory] = useState("Sve");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Sve");
  const [currentQuestions, setCurrentQuestions] = useState(quizData);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Filtriranje pitanja
  const filterQuestions = () => {
    let filtered = [...quizData];
    
    if (selectedCategory !== "Sve") {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    if (selectedDifficulty !== "Sve") {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    
    setCurrentQuestions(filtered);
    setScore(0);
    setAnsweredCount(0);
    setIsQuizCompleted(false);
  };

  // Praćenje odgovora
  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) setScore(prevScore => prevScore + 1);
    setAnsweredCount(prevCount => prevCount + 1);
    
    if (answeredCount + 1 >= currentQuestions.length) {
      setIsQuizCompleted(true);
    }
  };

  // Resetovanje kviza
  const resetQuiz = () => {
    setScore(0);
    setAnsweredCount(0);
    setIsQuizCompleted(false);
  };

  return (
    <>
      <SEOHead 
        title="Kviz iz njemačkog jezika"
        description="Testiraj svoje znanje njemačkog jezika sa našim besplatnim kvizom. Zabavna pitanja na bosanskom sa odgovorima na njemačkom."
        keywords="njemački jezik, kviz, besplatni kviz, učenje njemačkog, jezički test, njemačke riječi"
        url="/quiz"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SafeIcon icon={FiBookOpen} className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Kviz iz njemačkog jezika
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Testirajte svoje znanje njemačkog jezika s našim besplatnim kvizom. Pitanja na bosanskom, odgovori na njemačkom!
              </p>
            </motion.div>
          </div>
        </div>

        {/* Score Section */}
        {answeredCount > 0 && (
          <div className={`py-6 ${isQuizCompleted ? 'bg-green-50' : 'bg-blue-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center justify-between"
              >
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <SafeIcon 
                    icon={isQuizCompleted ? FiAward : FiCheckSquare} 
                    className={`w-8 h-8 ${isQuizCompleted ? 'text-green-600' : 'text-blue-600'}`} 
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {isQuizCompleted ? 'Kviz završen!' : 'Vaš trenutni rezultat'}
                    </h2>
                    <p className="text-lg">
                      <span className="font-medium">{score}</span> tačnih od <span className="font-medium">{answeredCount}</span> odgovorenih pitanja
                      {isQuizCompleted && (
                        <span className="ml-2 font-medium">
                          ({Math.round((score / currentQuestions.length) * 100)}%)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                {isQuizCompleted && (
                  <button
                    onClick={resetQuiz}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <SafeIcon icon={FiRotateCw} className="w-5 h-5" />
                    <span>Pokušaj ponovo</span>
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Filters */}
        <section className="py-8 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Kategorija:</span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <div className="flex items-center space-x-2 ml-4">
                  <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Težina:</span>
                </div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={filterQuestions}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                <SafeIcon icon={FiFilter} className="w-4 h-4" />
                <span>Primijeni filtere</span>
              </button>
            </div>
          </div>
        </section>

        {/* Quiz Cards */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {currentQuestions.map((quiz, index) => (
                <QuizCard
                  key={quiz.id}
                  question={quiz.question}
                  options={quiz.options}
                  correctAnswer={quiz.correctAnswer}
                  explanation={quiz.explanation}
                  delay={index * 0.1}
                />
              ))}

              {currentQuestions.length === 0 && (
                <div className="text-center py-12">
                  <SafeIcon icon={FiHelpCircle} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    Nema pitanja za odabrane filtere. Pokušajte sa drugim kombinacijama.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Resursi za učenje njemačkog
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Želite naučiti više? Pogledajte naše preporuke za učenje njemačkog jezika.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                <SafeIcon icon={FiBookOpen} className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Online kursevi</h3>
                <p className="text-gray-600 mb-4">
                  Besplatni i plaćeni online kursevi za učenje njemačkog jezika od početnika do naprednih nivoa.
                </p>
                <a href="/category/besplatni-resursi" className="text-primary-600 hover:text-primary-700 font-medium">
                  Saznaj više →
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                <SafeIcon icon={FiCheckSquare} className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aplikacije za učenje</h3>
                <p className="text-gray-600 mb-4">
                  Najbolje mobilne aplikacije za učenje njemačkog jezika, vokabulara i gramatike.
                </p>
                <a href="/category/besplatno" className="text-primary-600 hover:text-primary-700 font-medium">
                  Saznaj više →
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                <SafeIcon icon={FiAward} className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Jezički certifikati</h3>
                <p className="text-gray-600 mb-4">
                  Sve što trebate znati o Goethe, TestDaF i drugim zvaničnim njemačkim certifikatima.
                </p>
                <a href="/category/obrazovanje" className="text-primary-600 hover:text-primary-700 font-medium">
                  Saznaj više →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GermanQuiz;