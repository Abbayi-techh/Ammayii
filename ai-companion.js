// "Bestie AI" - Intelligent Best Friend Companion & Memory Engine
// Specially crafted for Ammayi by Abbayi

class BestieAI {
  constructor() {
    this.friendshipKnowledge = {
      user: "Ammayi",
      creator: "Abbayi",
      duration: "4 Years (Since 9th standard)",
      schoolBond: {
        grade9: "Journey start ayindhi 9th class lo.",
        grade10: "10th lo close ayyam. Daily night chats chese vaallam. Neetho maatladakapothe aa roju incomplete ga undedhi!",
        classroomSecret: "Classroom lo nuvvu 'Ashwini' ni, Abbayi 'Ashwin' ni anukuni maatladukunna golden last days 🥹."
      },
      tenthBirthdayBash: "10th batch tho outdoor birthday celebration — girls, boys, and Venkatesh Sir tho kalisi evvaru marchipoleni grand celebration!",
      talentShow2025: {
        date: "November 9, 2025",
        mission: "Chelli cheppindhi nuvvu vastunnav ani. Ventane daddy ni oppinchi sudden ga vachadu. Bus/train digina 5 minutes lo school ki cherukunnadu!",
        look: "Ammayi was looking stunning in a Red Dress with leaved/open hair near the stage & Swaroop Sir!",
        moment: "Chala sepu vethiki chusadu. Kaani matladaleka aagipoyadu. Later sister call tho sorry cheppadu."
      },
      whiteDressReunion: {
        day: "Next day talent show tharvatha",
        drama: "Dropping problem valla raanu ante, Abbayi Archishma tho matladi set chesadu!",
        meet: "Backroad lo 5 mins wait chesi intiki vachadu. Ammayi White Dress lo vachindhi. Archishma tho kalisi photos digaru.",
        iconicDialogue: "Ammayi: 'Nen celebrity aa?' -> Abbayi: 'Avnu!' 🌟"
      },
      currentStatus: {
        dasara: "Dasara appudu intiki vellinappudu oka glance chusadu.",
        interSecondYear: "Chats rare ayyayi, but the bond and care never changed.",
        ultimateWish: "Malli mana school days lanti unconditional friendship and talks malli start cheyali plss! 💖"
      }
    };

    this.quizQuestions = [
      {
        question: "1. Mana friendship journey eppudu start ayyindi?",
        options: ["8th Standard", "9th Standard", "Inter 1st Year", "College lo"],
        correct: 1,
        explanation: "Yes! 9th class lo start ayyi 10th lo super close ayyam!"
      },
      {
        question: "2. 10th class last days lo classroom lo manam em names tho piluchukune vaallam?",
        options: ["Bunny & Cherry", "Ashwin & Ashwini", "Tom & Jerry", "Abbayi & Ammayi"],
        correct: 1,
        explanation: "Correct! 'Nuvvu Ashwini, nen Ashwin' anukuntu matladukunna sweet days 🥹"
      },
      {
        question: "3. 10th batch outdoor birthday celebration lo mana tho unna teacher evaru?",
        options: ["Swaroop Sir", "Venkatesh Sir", "Maths Sir", "Principal Sir"],
        correct: 1,
        explanation: "Bingo! Venkatesh Sir, mana 10th batch girls and boys andharu unnam!"
      },
      {
        question: "4. 2025 Talent Show roju (Nov 9) stage deggara Ammayi em dress vesukundhi?",
        options: ["White Dress", "Blue Saree", "Red Dress with open hair", "Black Kurti"],
        correct: 2,
        explanation: "Spot on! Red dress and leaved hair tho Swaroop sir deggara unnav! ✨"
      },
      {
        question: "5. Photos diginappudu Ammayi adigina iconic dialogue emti?",
        options: ["'Tea thagudhaama?'", "'Nen celebrity aa?'", "'Repu kaludhaama?'", "'Selfie bagundha?'"],
        correct: 1,
        explanation: "Exactly! 'Nen celebrity aa' ani nuvvu adagagaane Abbayi 'Avnu!' annadu! 🌟"
      }
    ];

    this.compliments = [
      "Ammayi, your smile has a superpower to make anyone's day instantly brighter! ✨",
      "Best friends like you come once in a lifetime. 4 years and counting forever! 💫",
      "Red dress or White dress, you're always the undisputed celebrity in our friendship story! 👑",
      "Thank you for being the most genuine, caring, and irreplaceable best friend to Abbayi! 💖",
      "May this birthday bring you infinite happiness, boundless success, and endless laughter! 🎂"
    ];

    this.roasts = [
      "Remember when you said 'Nen raanu' for the meetup and Abbayi had to activate full detective mode with Archishma to convince you? 😂",
      "'Nen celebrity aa?' - Celebrity emo kaani, late replies ivvadam lo mathram world champion nuvve! 😜",
      "School days lo daily night chats chesi, ippudu rare ga reply isthunnav... Tax kattalsi vasthundha emti reply ki? 😆",
      "Abbayi bus digina 5 mins lo school ki parigethukuntu vachadu... nuvvemo akkada Swaroop sir tho chill avthunnav! 🤣",
      "Nuvvu enni sarlu busy ga unna, you'll always remain Abbayi's #1 favorite bestie! 💖"
    ];

    this.isSpeaking = false;
  }

  // AI Response generator using semantic matching & memory retrieval
  generateResponse(userPrompt) {
    const p = userPrompt.toLowerCase();

    // 1. Birthday wishes & celebration
    if (p.includes('birthday') || p.includes('bday') || p.includes('wish') || p.includes('party')) {
      return `🎉 **HAPPY BIRTHDAY AMMAYIII!** 🎂✨\n\nAbbayi wanted this website to be a permanent tribute to our 4 incredible years of friendship! May your year ahead be as radiant as you were in the Red & White dresses, filled with joy, laughs, and new memories! 🥳💖`;
    }

    // 2. School days / 9th & 10th / Ashwin-Ashwini
    if (p.includes('school') || p.includes('9th') || p.includes('10th') || p.includes('ashwin') || p.includes('ashwini') || p.includes('class')) {
      return `🥹 **Golden School Memories:**\n9th class lo start ayyi, 10th lo manam entha close ayyamo gurtundha? Daily night chats, and class lo 'Ashwin & Ashwini' anukuntu matladukunna aa last days... Nijamga life lo unforgettable days avi! Abbayi miss avthunnadu aa school days vibe ni.`;
    }

    // 3. 10th Birthday Bash / Venkatesh Sir
    if (p.includes('venkatesh') || p.includes('batch') || p.includes('outside') || p.includes('10th bday')) {
      return `🎈 **The Legendary 10th Birthday Bash!**\nAsalu evvaru anukoleni grand outside birthday celebration adhi! Girls, boys, and even Venkatesh Sir unna aa day mana 10th batch ki one of the greatest highlights ever! 🎊`;
    }

    // 4. Talent Show / Nov 9 / Red Dress / Swaroop Sir
    if (p.includes('talent show') || p.includes('nov 9') || p.includes('red dress') || p.includes('swaroop') || p.includes('chelli') || p.includes('hair')) {
      return `✨ **November 9 - Talent Show Mission:**\nChelli cheppagane, Abbayi daddy tho emedho cheppi sudden ga vacchesadu! Digina 5 min ke school ki vachi vethikithe... Nuvvu red dress & open hair lo Swaroop sir deggara stage pakkana kanapaddav! Aa day Abbayi eppatiki marchipoledu! ❤️`;
    }

    // 5. White dress / Archishma / Meet / Celebrity
    if (p.includes('white dress') || p.includes('archishma') || p.includes('celebrity') || p.includes('backroad') || p.includes('photo')) {
      return `🌟 **The White Dress & Photos Day:**\nNuvvu raanu annappudu Archishma tho matladi all set chesi, backroad lo 5 mins wait chesi meet ayyaru! White dress lo nuvvu vachinappudu photos digaru... and nuvvu 'Nen celebrity aa?' ani adigithe Abbayi 'Avnu!' annadu! You really are the celebrity of this story! 📸`;
    }

    // 6. Dasara / Inter 2nd year / Missing
    if (p.includes('dasara') || p.includes('inter') || p.includes('2nd year') || p.includes('miss') || p.includes('change') || p.includes('busy')) {
      return `💌 **The Promise & Longing:**\nInter 2nd year lo chats rare ayyayi, Dasara ki okasari intiki velletappudu glance chusadu anthe. Kaani Abbayi manasulo eppatiki okate korika: *'Ippati nunchi ayina malli mana school days lekka friends ga undhama plss!'* 🤗`;
    }

    // 7. Compliment
    if (p.includes('compliment') || p.includes('sweet') || p.includes('lovely') || p.includes('praise')) {
      const c = this.compliments[Math.floor(Math.random() * this.compliments.length)];
      return `🌸 **Special Compliment for Ammayi:**\n\n"${c}"\n\n— Forever your best friend, Abbayi 💖`;
    }

    // 8. Roast / Fun
    if (p.includes('roast') || p.includes('joke') || p.includes('funny') || p.includes('tease')) {
      const r = this.roasts[Math.floor(Math.random() * this.roasts.length)];
      return `😜 **Friendly Bestie Roast:**\n\n${r}\n\n(Kaani whatever it is, you're the bestest friend ever! 😄)`;
    }

    // 9. Why this website?
    if (p.includes('why') || p.includes('website') || p.includes('gift') || p.includes('abbayi')) {
      return `💝 **Why Abbayi Made This:**\n'Asalu em cheppalo artham kaledhu, gift iddhamanna edho okati saripodhu anipinchindi.' That's why he built this entire 3D interactive AI universe to celebrate every step of your 4-year journey!`;
    }

    // Default conversational AI answer
    return `💖 **Bestie AI:**\nAmmayi, mana 4-year friendship journey lo 9th grade chats nunchi, 10th birthday bash Venkatesh Sir tho, Nov 9 talent show red dress, white dress photos with Archishma, to this very day — every single memory is special!\n\nAsk me anything about our memories, request a custom letter, or take the memory quiz! ✨`;
  }

  // Generate customized friendship letter based on tone
  generateLetter(tone = 'heartwarming') {
    const templates = {
      heartwarming: `Dear Ammayi,\n\nLooking back at these past 4 years, I realize how incredibly lucky I am to have you as my best friend. From our 9th standard beginnings to laughing about 'Ashwin & Ashwini' in 10th class, you've made my world so much brighter. Even when distance and busy schedules happen in Inter, my respect and affection for our bond remains timeless.\n\nHappy Birthday Ammayi! Let's make a promise to laugh together like our school days forever.\n\nWith all love & care,\n— Abbayi 💫`,

      nostalgic: `Ammayi!!\n\nGurtundha? Aa 10th class last days, Venkatesh Sir tho outside birthday celebration, Nov 9 Talent Show roju nuvvu red dress lo unnapudu nenu parigethukuntu vachina kshanalu... Every memory is etched in my heart like gold. White dress roju nuvvu 'Nen celebrity aa?' ani adiginappudu nenu 'Avnu' ani cheppanu — and that's true even today.\n\nHappy Birthday to the most special person! Mana school days vibe malli eppatiki thagakudadhu!\n\n— Yours, Abbayi 🥹`,

      funny: `Hey Ammayi (The Ultimate Celebrity),\n\nHappy Birthday! 🎉\nFirst of all, congratulations on surviving 4 years of my friendship! Nuvvu raanu ani cheppina meetups ni Archishma tho kalisi hack chesi mari meet aina days naaku inka gurthunnayi! Nuvvu enni sarlu late ga reply ichina, naaku mathram nuvve number 1 bestie.\n\nParty eppudu istunnav mari? 🎂🍕\n\n— By Abbayi 😎`
    };

    return templates[tone] || templates.heartwarming;
  }

  // Text to Speech
  speak(text) {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      return;
    }

    // Strip markdown formatting for cleaner speech
    const cleanText = text.replace(/[*_#`]/g, '').replace(/—/g, 'from');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    // Pick warm voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.lang.includes('en'));
    if (englishVoice) utterance.voice = englishVoice;

    this.isSpeaking = true;
    utterance.onend = () => { this.isSpeaking = false; };
    utterance.onerror = () => { this.isSpeaking = false; };

    window.speechSynthesis.speak(utterance);
  }
}

window.bestieAI = new BestieAI();
