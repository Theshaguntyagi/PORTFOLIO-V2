import leadgenAi from '../assets/projects/LEADGEN.webp';
import codebook from '../assets/projects/CODEBOOK.webp';
import icd10 from '../assets/projects/ICD-10.webp';
import catchmaster from '../assets/projects/CATCHMASTER.webp';
import chatbot from '../assets/projects/CHATBOT.webp';
import faceguard from '../assets/projects/FACEGUARD.webp';
import health from '../assets/projects/HEALTH.webp';
import mario from '../assets/projects/MARIO.webp';
import PITCHIQ from '../assets/projects/PITCHIQ.webp';
import Snake from '../assets/projects/SNAKE.webp';
import Portfolio from '../assets/projects/PORTFOLIO.webp';

export const projectsData = [
  {
    id: "pitchiq",
    title: "PitchIQ — AI Website Auditing & Lead Intelligence",
    title_hi: "PitchIQ — एआई वेबसाइट ऑडिटिंग और लीड इंटेलिजेंस",
    title_es: "PitchIQ — Auditoría de Sitios Web con IA e Inteligencia de Leads",
    description:
      "Full-stack AI platform that crawls any website, runs automated SEO, Core Web Vitals, accessibility, and content audits, then emails personalized reports — a self-running lead generation engine.",
    description_hi: "फुल-स्टैक एआई प्लेटफॉर्म जो किसी भी वेबसाइट को क्रॉल करता है, स्वचालित एसईओ, कोर वेब विटल्स, एक्सेसिबिलिटी और कंटेंट ऑडिट चलाता है, फिर व्यक्तिगत रिपोर्ट ईमेल करता है — एक स्व-चालित लीड जनरेशन इंजन।",
    description_es: "Plataforma de IA de stack completo que rastrea cualquier sitio web, realiza auditorías automatizadas de SEO, Core Web Vitals, accesibilidad y contenido, y envía informes personalizados por correo electrónico: un motor de generación de leads autónomo.",
    category: "ai",
    technologies: ["Python", "OpenAI", "Playwright", "MongoDB", "Email Automation"],
    image: PITCHIQ,
    liveUrl: null,
    githubUrl: "",
    problem: "Manual website audits take hours and can't scale for cold outreach to hundreds of prospects.",
    problem_hi: "मैन्युअल वेबसाइट ऑडिट में घंटों लगते हैं और सैकड़ों संभावनाओं तक पहुंचने के लिए इसका विस्तार नहीं किया जा सकता है।",
    problem_es: "Las auditorías web manuales toman horas y no escalan para el acercamiento en frío a cientos de clientes potenciales.",
    solution: "Automated the full pipeline: crawl → AI audit → GPT synthesis → personalized email delivery with zero manual steps.",
    solution_hi: "पूरी पाइपलाइन को स्वचालित किया: क्रॉल → एआई ऑडिट → जीपीटी संश्लेषण → शून्य मैन्युअल चरणों के साथ व्यक्तिगत ईमेल वितरण।",
    solution_es: "Automatización de todo el proceso: rastreo → auditoría de IA → síntesis GPT → envío de correos electrónicos personalizados con cero pasos manuales.",
    overview: "PitchIQ ingests any URL, runs structured audits, uses GPT to generate plain-English action items, stores results in MongoDB for trend tracking, and auto-sends reports to business owners.",
    overview_hi: "PitchIQ किसी भी URL को इनजेस्ट करता है, संरचित ऑडिट चलाता है, सरल अंग्रेजी में एक्शन आइटम उत्पन्न करने के लिए GPT का उपयोग करता है, प्रवृत्ति ट्रैकिंग के लिए परिणाम MongoDB में संग्रहीत करता है, और व्यावसायिक मालिकों को रिपोर्ट स्वतः भेजता है।",
    overview_es: "PitchIQ recibe cualquier URL, realiza auditorías estructuradas, utiliza GPT para generar tareas en un lenguaje sencillo, almacena resultados en MongoDB para el seguimiento de tendencias y envía automáticamente informes a los dueños de negocios.",
    results: [
      "Audit turnaround reduced from hours to minutes",
      "Personalized outreach at scale — zero manual effort per lead",
      "MongoDB persistence enables multi-run trend comparison per client"
    ],
    results_hi: [
      "ऑडिट का समय घंटों से घटकर मिनटों में हो गया",
      "बड़े पैमाने पर व्यक्तिगत आउटरीच — प्रति लीड शून्य मैन्युअल प्रयास",
      "MongoDB दृढ़ता प्रति ग्राहक बहु-रन प्रवृत्ति तुलना सक्षम बनाती है"
    ],
    results_es: [
      "El tiempo de entrega de la auditoría se redujo de horas a minutos",
      "Alcance personalizado a escala: cero esfuerzo manual por lead",
      "La persistencia en MongoDB permite la comparación de tendencias de múltiples ejecuciones por cliente"
    ]
  },
  {
    id: "leadgen-ai",
    title: "LeadGen AI — Google Maps Lead Generation Engine ",
    title_hi: "LeadGen AI — Google Maps लीड जनरेशन इंजन",
    title_es: "LeadGen AI — Motor de Generación de Leads de Google Maps",
    description:
      "End-to-end system that scrapes Google Maps for targeted businesses, enriches each lead with AI-generated personalized outreach emails, scores prospects by quality, and sends campaigns autonomously.",
    description_hi: "एंड-टू-एंड सिस्टम जो लक्षित व्यवसायों के लिए Google मानचित्र को स्क्रैप करता है, प्रत्येक लीड को एआई-जनित व्यक्तिगत आउटरीच ईमेल के साथ समृद्ध करता है, गुणवत्ता के आधार पर संभावनाओं को स्कोर करता है, और अभियान स्वायत्त रूप से भेजता है।",
    description_es: "Sistema de extremo a extremo que extrae negocios objetivos de Google Maps, enriquece cada lead con correos electrónicos de alcance personalizados generados por IA, califica prospectos por calidad y envía campañas de forma autónoma.",
    category: "ai",
    technologies: ["Python", "OpenAI", "Playwright", "MongoDB", "SMTP Automation"],
    image: leadgenAi,
    liveUrl: null,
    githubUrl: "",
    problem: "Cold email campaigns use generic templates that get ignored. Manual lead research doesn't scale.",
    problem_hi: "कोल्ड ईमेल अभियानों में सामान्य टेम्पलेट्स का उपयोग किया जाता है जिन्हें नजरअंदाज कर दिया जाता है। मैन्युअल लीड अनुसंधान का विस्तार नहीं किया जा सकता है।",
    problem_es: "Las campañas de correo electrónico en frío utilizan plantillas genéricas que se ignoran. La investigación manual de leads no escala.",
    solution: "GPT analyzes each lead's website and writes contextual outreach referencing their specific pain points; a scoring module prioritizes high-value targets.",
    solution_hi: "जीपीटी प्रत्येक लीड की वेबसाइट का विश्लेषण करता है और उनके विशिष्ट दर्द बिंदुओं के संदर्भ में आउटरीच लिखता है; एक स्कोरिंग मॉड्यूल उच्च-मूल्य वाले लक्ष्यों को प्राथमिकता देता है।",
    solution_es: "GPT analiza el sitio web de cada cliente potencial y escribe un correo de acercamiento contextual que hace referencia a sus puntos críticos específicos; un módulo de calificación prioriza los objetivos de alto valor.",
    overview: "Playwright scrapes Google Maps by niche + location, extracts contact details, GPT writes personalized emails per lead, leads are scored and stored in MongoDB with CSV export.",
    overview_hi: "प्लेराइट आला + स्थान के आधार पर Google मानचित्र को स्क्रैप करता है, संपर्क विवरण निकालता है, जीपीटी प्रति लीड व्यक्तिगत ईमेल लिखता है, लीड स्कोर किए जाते हैं और सीएसवी निर्यात के साथ MongoDB में संग्रहीत किए जाते हैं।",
    overview_es: "Playwright extrae Google Maps por nicho + ubicación, extrae detalles de contacto, GPT escribe correos electrónicos personalizados por cliente potencial, los leads se califican y almacenan en MongoDB con exportación a CSV.",
    results: [
      "Replaced generic blasts with context-specific messaging per lead",
      "Lead scoring layer prioritizes highest-value prospects",
      "Full search-to-sent pipeline with zero manual steps"
    ],
    results_hi: [
      "प्रति लीड संदर्भ-विशिष्ट संदेशों के साथ सामान्य विज्ञापनों को प्रतिस्थापित किया",
      "लीड स्कोरिंग परत उच्चतम मूल्य की संभावनाओं को प्राथमिकता देती है",
      "शून्य मैन्युअल चरणों के साथ पूर्ण खोज-से-भेजी गई पाइपलाइन"
    ],
    results_es: [
      "Se reemplazaron los envíos masivos genéricos con mensajes específicos del contexto por lead",
      "La capa de calificación de prospectos prioriza a los clientes potenciales de mayor valor",
      "Pipeline completo de búsqueda a envío con cero pasos manuales"
    ]
  },
  {
    id: "enterprise-rag",
    title: "Enterprise RAG Chatbot — Multi-Document AI Knowledge System ",
    title_hi: "एंटरप्राइज़ आरएजी चैटबॉट — बहु-दस्तावेज़ एआई नॉलेज सिस्टम",
    title_es: "Chatbot RAG Empresarial — Sistema de Conocimiento de IA Multidocumento",
    description:
      "Production-grade RAG system that ingests PDFs, Word docs, and SOPs into a FAISS/ChromaDB vector store for millisecond semantic retrieval with citation-backed, hallucination-free answers.",
    description_hi: "उत्पादन-ग्रेड आरएजी प्रणाली जो उद्धरण-समर्थित, मतिभ्रम-मुक्त उत्तरों के साथ मिलीसेकंड सिमेंटिक पुनर्प्राप्ति के लिए पीडीएफ, वर्ड डॉक्स और एसओपी को एक एफएआईएसएस/क्रोमाडीबी वेक्टर स्टोर में इनजेस्ट करती है।",
    description_es: "Sistema RAG de grado de producción que ingresa archivos PDF, documentos de Word y SOPs en un almacén vectorial FAISS/ChromaDB para una recuperación semántica de milisegundos con respuestas respaldadas por citas y libres de alucinaciones.",
    category: "ai",
    technologies: ["Python", "OpenAI", "LangChain", "FAISS", "ChromaDB", "MongoDB"],
    image: chatbot,
    liveUrl: null,
    githubUrl: "",
    problem: "Enterprise teams waste hours searching internal docs. Generic chatbots hallucinate and can't cite sources.",
    problem_hi: "एंटरप्राइज़ टीमें आंतरिक दस्तावेज़ों को खोजने में घंटों बर्बाद करती हैं। सामान्य चैटबॉट मतिभ्रम करते हैं और स्रोतों को उद्धृत नहीं कर सकते।",
    problem_es: "Los equipos empresariales pierden horas buscando documentos internos. Los chatbots genéricos alucinan y no pueden citar fuentes.",
    solution: "LangChain QA pipeline with FAISS/ChromaDB retrieval returns answers with exact source + page references. ConversationBufferWindowMemory preserves multi-turn context.",
    solution_hi: "FAISS/ChromaDB पुनर्प्राप्ति के साथ लँगचेन क्यूए पाइपलाइन सटीक स्रोत + पृष्ठ संदर्भों के साथ उत्तर लौटाती है। कन्वर्सेशनबफरविंडोमेमोरी बहु-मोड़ संदर्भ को सुरक्षित रखती है।",
    solution_es: "Pipeline de preguntas y respuestas de LangChain con recuperación de FAISS/ChromaDB devuelve respuestas con referencias exactas de origen + página. ConversationBufferWindowMemory preserva el contexto de múltiples turnos.",
    overview: "Upload PDFs, Word docs, SOPs — the system chunks, embeds, and indexes them. Non-technical users get a queryable AI assistant operational in under 60 seconds.",
    overview_hi: "पीडीएफ, वर्ड डॉक्स, एसओपी अपलोड करें — सिस्टम उन्हें चंक, एम्बेड और इंडेक्स करता है। गैर-तकनीकी उपयोगकर्ताओं को 60 सेकंड से कम समय में परिचालन करने योग्य एआई सहायक मिलता है।",
    overview_es: "Suba PDFs, documentos de Word, SOPs: el sistema los fragmenta, inserta y organiza. Los usuarios no técnicos obtienen un asistente de IA operativo en menos de 60 segundos.",
    results: [
      "Millisecond semantic retrieval across large internal document libraries",
      "Citation-backed answers eliminate hallucinations",
      "Knowledge base queryable in under 60 seconds after upload"
    ],
    results_hi: [
      "बड़े आंतरिक दस्तावेज़ पुस्तकालयों में मिलीसेकंड अर्थपूर्ण पुनर्प्राप्ति",
      "उद्धरण-समर्थित उत्तर मतिभ्रम को समाप्त करते हैं",
      "अपलोड करने के बाद 60 सेकंड से भी कम समय में ज्ञानकोश पूछताछ योग्य"
    ],
    results_es: [
      "Recuperación semántica en milisegundos en grandes bibliotecas de documentos internos",
      "Las respuestas respaldadas por citas eliminan las alucinaciones",
      "Base de conocimientos consultable en menos de 60 segundos después de la carga"
    ]
  },
  {
    id: "faceguard",
    title: "FaceGuard — Real-Time Facial Recognition Attendance",
    title_hi: "FaceGuard — वास्तविक समय चेहरा पहचान उपस्थिति प्रणाली",
    title_es: "FaceGuard — Asistencia por Reconocimiento Facial en Tiempo Real",
    description:
      "Real-time facial recognition attendance system using ArcFace embeddings with sub-second identification, multi-threaded OpenCV video, auto Present/Late/Absent classification, and an admin desktop dashboard.",
    description_hi: "उप-सेकंड पहचान, बहु-थ्रेडेड ओपनसीवी वीडियो, ऑटो उपस्थित/देर/अनुपस्थित वर्गीकरण और एक एडमिन डेस्कटॉप डैशबोर्ड के साथ वास्तविक समय चेहरा पहचान उपस्थिति प्रणाली।",
    description_es: "Sistema de asistencia mediante reconocimiento facial en tiempo real que utiliza incrustaciones de ArcFace con identificación en menos de un segundo, video OpenCV multiproceso, clasificación automática de Presente/Tarde/Ausente y un panel de administración para escritorio.",
    category: "ai",
    technologies: ["Python", "OpenCV", "DeepFace", "ArcFace", "SQLite", "Tkinter"],
    image: faceguard,
    liveUrl: null,
    githubUrl: "https://github.com/FaceGuard-Attendance",
    problem: "Manual attendance is slow, error-prone, and gameable. Most OSS solutions fail under real-world lighting and occlusions.",
    problem_hi: "मैन्युअल उपस्थिति धीमी, त्रुटि-प्रवण और हेरफेर करने योग्य है। अधिकांश ओएसएस समाधान वास्तविक दुनिया की रोशनी में विफल हो जाते हैं।",
    problem_es: "La asistencia manual es lenta, propensa a errores y manipulable. La mayoría de las soluciones de código abierto fallan bajo iluminación del mundo real y oclusiones.",
    solution: "ArcFace embeddings + multi-threaded OpenCV ensure smooth real-time performance. Configurable thresholds auto-classify attendance status.",
    solution_hi: "ArcFace एम्बेडिंग + मल्टी-थ्रेडेड OpenCV सुचारू वास्तविक समय प्रदर्शन सुनिश्चित करते हैं। कॉन्फ़िगर करने योग्य थ्रेसहोल्ड उपस्थिति स्थिति को स्वतः वर्गीकृत करते हैं।",
    solution_es: "Las incrustaciones de ArcFace + OpenCV multiproceso aseguran un rendimiento fluido en tiempo real. Los umbrales configurables clasifican automáticamente el estado de asistencia.",
    overview: "Live camera feed → ArcFace recognition → auto classification → SQLite persistence → exportable reports. Admin dashboard for face registration and log management.",
    overview_hi: "लाइव कैमरा फीड → चेहरा पहचान → स्वतः वर्गीकरण → SQLite दृढ़ता → निर्यात योग्य रिपोर्ट। चेहरा पंजीकरण के लिए एडमिन डैशबोर्ड।",
    overview_es: "Transmisión de cámara en vivo → reconocimiento de ArcFace → clasificación automática → persistencia de SQLite → informes exportables. Panel de administración para el registro de rostros y gestión de registros.",
    results: [
      "Sub-second identification across varied lighting and partial occlusions",
      "Recognition and UI on separate threads — no frame drops",
      "No command-line knowledge required for administrators"
    ],
    results_hi: [
      "विभिन्न प्रकाश व्यवस्था और आंशिक अवरोधों में उप-सेकंड पहचान",
      "अलग थ्रेड्स पर पहचान और यूआई — कोई फ्रेम ड्रॉप नहीं",
      "प्रशासकों के लिए कमांड-लाइन ज्ञान की कोई आवश्यकता नहीं"
    ],
    results_es: [
      "Identificación en menos de un segundo bajo iluminación variada y oclusión parcial",
      "Reconocimiento e interfaz de usuario en hilos separados: sin caída de cuadros (frames)",
      "No se requiere conocimiento de línea de comandos para los administradores"
    ]
  },
  {
    id: "mario-in-python",
    title: "Mario in Python — WebAssembly Pygame Port",
    title_hi: "पायथन में मारियो — वेब असेंबली Pygame पोर्ट",
    title_es: "Mario en Python — Adaptación a WebAssembly con Pygame",
    description:
      "Pygame platformer ported to WebAssembly via Pygbag and deployed on GitHub Pages, with mobile touch D-pad, SharedArrayBuffer COOP/COEP fix, async game loop rewrite, and a Windows EXE build.",
    description_hi: "Pygbag के माध्यम से WebAssembly में पोर्ट किया गया Pygame गेम, मोबाइल टच डी-पैड, Windows EXE बिल्ड के साथ GitHub Pages पर तैनात।",
    description_es: "Juego de Pygame adaptado a WebAssembly a través de Pygbag y desplegado en GitHub Pages, con panel táctil móvil, solución SharedArrayBuffer COOP/COEP, reescritura de bucle de juego asíncrono y una compilación de Windows EXE.",
    category: "web",
    technologies: ["Python", "Pygame", "Pygbag", "WebAssembly", "GitHub Pages"],
    image: mario,
    liveUrl: "",
    githubUrl: "https://github.com/Theshaguntyagi/Mario-in-Python",
    problem: "Pygame games run locally only — no way to share a playable demo without asking people to install Python.",
    problem_hi: "Pygame गेम केवल स्थानीय रूप से चलते हैं — पायथन स्थापित करने के लिए कहे बिना बजाने योग्य डेमो साझा करने का कोई तरीका नहीं है।",
    problem_es: "Los juegos de Pygame solo se ejecutan localmente: no hay forma de compartir una demostración jugable sin pedir a la gente que instale Python.",
    solution: "Rewrote the blocking game loop to async/await for Pygbag WASM, fixed COOP/COEP headers with coi-serviceworker.js, added mobile touch D-pad overlay with keyboard event bridge.",
    solution_hi: "Pygbag WASM के लिए गेम लूप को async/await में फिर से लिखा, coi-serviceworker.js के साथ COOP/COEP हेडर को ठीक किया, मोबाइल टच डी-पैड जोड़ा।",
    solution_es: "Se reescribió el bucle del juego de bloqueo a asíncrono/espera para Pygbag WASM, se corrigieron los encabezados COOP/COEP con coi-serviceworker.js, se agregó una superposición D-pad táctil móvil.",
    overview: "Full Mario-style platformer playable in browser via WebAssembly. Also ships as a Windows EXE via PyInstaller. Mobile touch controls overlay runs on any device.",
    overview_hi: "वेब असेंबली के माध्यम से ब्राउज़र में खेलने योग्य मारियो गेम। PyInstaller के माध्यम से विंडोज EXE के रूप में भी उपलब्ध।",
    overview_es: "Juego completo estilo Mario jugable en navegador a través de WebAssembly. También se distribuye como EXE de Windows mediante PyInstaller. Funciona en cualquier dispositivo.",
    results: [
      "Zero-install play in browser — shareable via URL",
      "Mobile touch D-pad with keyboard event bridge",
      "Windows EXE packaged for offline distribution"
    ],
    results_hi: [
      "ब्राउज़र में खेलने योग्य — URL के माध्यम से साझा करने योग्य",
      "कीबोर्ड इवेंट ब्रिज के साथ मोबाइल टच डी-पैड",
      "ऑफ़लाइन वितरण के लिए विंडोज़ EXE पैकेज्ड"
    ],
    results_es: [
      "Juego sin instalación en el navegador: compartible a través de URL",
      "D-pad táctil móvil con puente de eventos de teclado",
      "Archivo Windows EXE empaquetado para distribución sin conexión"
    ]
  },
  {
    id: "catch-master",
    title: "CATCH-MASTER — Adaptive AI Arcade Game",
    title_hi: "CATCH-MASTER — अनुकूली एआई आर्केड गेम",
    title_es: "CATCH-MASTER — Juego de Arcade con IA Adaptativa",
    description:
      "Adaptive AI arcade game where difficulty scales in real time based on player performance — an opponent that learns your reflexes and gets harder as you improve.",
    description_hi: "अनुकूली एआई आर्केड गेम जहां खिलाड़ी के प्रदर्शन के आधार पर कठिनाई वास्तविक समय में बढ़ती है — एक प्रतिद्वंद्वी जो आपकी प्रतिक्रियाओं को सीखता है।",
    description_es: "Juego de arcade con IA adaptativa donde la dificultad se escala en tiempo real según el rendimiento del jugador: un oponente que aprende tus reflejos y se vuelve más difícil a medida que mejoras.",
    category: "web",
    technologies: ["Python", "Pygame", "AI", "Adaptive Difficulty"],
    image: catchmaster,
    liveUrl: "https://theshaguntyagi.github.io/CATCH-MASTER/",
    githubUrl: "https://github.com/Theshaguntyagi/CATCH-MASTER",
    overview: "Arcade-style catch game with an AI system that tracks player reaction time and accuracy to dynamically scale speed, spawn rate, and pattern complexity.",
    overview_hi: "आर्केड-शैली का खेल जिसमें एक एआई सिस्टम है जो गति, स्पॉन दर और पैटर्न जटिलता को स्केल करने के लिए खिलाड़ी की प्रतिक्रिया और सटीकता को ट्रैक करता है।",
    overview_es: "Juego de atrapar estilo arcade con un sistema de IA que rastrea el tiempo de reacción y la precisión del jugador para escalar dinámicamente la velocidad, la tasa de aparición y la complejidad del patrón.",
    results: [
      "Adaptive difficulty keeps experienced players engaged",
      "AI tracks player reaction time and accuracy in real time",
      "Scales from beginner to expert without manual level selection"
    ],
    results_hi: [
      "अनुकूली कठिनाई अनुभवी खिलाड़ियों को व्यस्त रखती है",
      "एआई वास्तविक समय में खिलाड़ी की प्रतिक्रिया और सटीकता को ट्रैक करता है",
      "मैन्युअल स्तर चयन के बिना शुरुआती से विशेषज्ञ तक स्केल होता है"
    ],
    results_es: [
      "La dificultad adaptativa mantiene comprometidos a los jugadores experimentados",
      "La IA rastrea el tiempo de reacción y la precisión del jugador en tiempo real",
      "Escala de principiante a experto sin selección manual de nivel"
    ]
  },
  {
    id: "icd10-ai-coder",
    title: "ICD-10 AI Coder — Medical Coding Automation",
    title_hi: "ICD-10 एआई कोडर — चिकित्सा कोडिंग स्वचालन",
    title_es: "ICD-10 AI Coder — Automatización de Codificación Médica",
    description:
      "AI-powered medical coding assistant using Claude and GPT-4o to automate ICD-10 code assignment from clinical notes, reducing manual coding time for HCC risk adjustment workflows.",
    description_hi: "नैदानिक नोट्स से ICD-10 कोड असाइनमेंट को स्वचालित करने के लिए क्लाउड और GPT-4o का उपयोग करने वाला एआई-संचालित चिकित्सा कोडिंग सहायक।",
    description_es: "Asistente de codificación médica impulsado por IA que utiliza Claude y GPT-4o para automatizar la asignación de códigos ICD-10 a partir de notas clínicas, reduciendo el tiempo de codificación manual.",
    category: "ai",
    technologies: ["Python", "Claude API", "GPT-4o", "ICD-10", "NLP"],
    image: icd10,
    liveUrl: "https://theshaguntyagi.github.io/ICD-10/",
    githubUrl: "https://github.com/Theshaguntyagi/ICD-10",
    overview: "Parses clinical notes and maps diagnoses to accurate ICD-10 codes using LLM reasoning, designed for HCC risk adjustment and medical billing workflows.",
    overview_hi: "नैदानिक नोट्स को पार्स करता है और एलएलएम तर्क का उपयोग करके सटीक आईसीडी-10 कोड मैप करता है, जो चिकित्सा बिलिंग वर्कफ़्लो के लिए डिज़ाइन किया गया है।",
    overview_es: "Analiza notas clínicas y asigna diagnósticos a códigos ICD-10 precisos utilizando el razonamiento de LLM, diseñado para flujos de trabajo de facturación médica.",
    results: [
      "Automates high-effort manual coding from unstructured clinical text",
      "Dual-model validation using Claude + GPT-4o for accuracy",
      "Designed for HCC risk adjustment and revenue cycle workflows"
    ],
    results_hi: [
      "असंरचित पाठ से उच्च-प्रयास मैन्युअल कोडिंग को स्वचालित करता है",
      "सटीकता के लिए क्लाउड + GPT-4o का उपयोग करके दोहरा सत्यापन",
      "चिकित्सा कोडिंग और राजस्व चक्र वर्कफ़्लो के लिए डिज़ाइन किया गया"
    ],
    results_es: [
      "Automatiza la codificación manual de alto esfuerzo a partir de texto clínico no estructurado",
      "Validación de modelo dual utilizando Claude + GPT-4o para mayor precisión",
      "Diseñado para ajuste de riesgo HCC y flujos de trabajo de ciclo de ingresos"
    ]
  },
  {
    id: "iot-health-monitor",
    title: "IoT Health Monitoring System — Published Research",
    title_hi: "IoT Health Monitoring System — प्रकाशित शोध",
    title_es: "Sistema de Monitoreo de Salud IoT — Investigación Publicada",
    description:
      "Wearable-grade Raspberry Pi health monitor capturing real-time heart rate and SpO2 via PPG sensors, with ML anomaly detection, Firebase alerts, and a React Native mobile app. Published IJSRA 2024.",
    description_hi: "पहनने योग्य-ग्रेड रास्पबेरी पाई स्वास्थ्य मॉनिटर, एमएल विसंगति पहचान, फायरबेस अलर्ट और रिएक्ट नेटिव मोबाइल ऐप के साथ। प्रकाशित IJSRA 2024।",
    description_es: "Monitor de salud Raspberry Pi de grado de dispositivo médico que captura el ritmo cardíaco y SpO2 a través de sensores PPG, con detección de anomalías de ML, alertas de Firebase y una aplicación móvil React Native. Publicado en IJSRA 2024.",
    category: "iot",
    technologies: ["Python", "Raspberry Pi", "Scikit-Learn", "Firebase", "React Native"],
    image: health,
    liveUrl: null,
    githubUrl: "https://github.com/Theshaguntyagi/HEALTH-MONITORING-SYSTEM",
    problem: "Continuous cardiac and SpO2 monitoring at home is expensive and lacks proactive alerting.",
    problem_hi: "घर पर निरंतर हृदय और SpO2 निगरानी महंगी है और सक्रिय चेतावनी की कमी है।",
    problem_es: "El monitoreo continuo cardíaco y de SpO2 en el hogar es costoso y carece de alertas proactivas.",
    solution: "Raspberry Pi processes PPG signals in real time; Scikit-Learn models detect early cardiac stress and desaturation; Firebase pushes emergency alerts to caregivers instantly.",
    solution_hi: "रास्पबेरी पाई वास्तविक समय में पीपीजी संकेतों को संसाधित करता है; स्किट्स-लर्न मॉडल हृदय तनाव का पता लगाते हैं; फायरबेस अलर्ट भेजता है।",
    solution_es: "Raspberry Pi procesa señales PPG en tiempo real; los modelos de Scikit-Learn detectan el estrés cardíaco; Firebase envía alertas a los cuidadores al instante.",
    overview: "IoT device → real-time PPG signal processing → ML anomaly classification → Firebase alert → React Native caregiver app. Research published IJSRA Vol. 12, No. 1, 2024.",
    overview_hi: "आईओटी डिवाइस → वास्तविक समय पीपीजी सिग्नल प्रोसेसिंग → विसंगति वर्गीकरण → फायरबेस अलर्ट → रिएक्ट नेटिव ऐप। शोध प्रकाशित IJSRA 2024।",
    overview_es: "Dispositivo IoT → procesamiento de señales PPG → clasificación de anomalías de ML → alerta de Firebase → aplicación React Native. Publicación de investigación IJSRA Vol. 12, No. 1, 2024.",
    results: [
      "Proactive alerts before conditions become critical",
      "Real-time SpO2 and heart rate with ML classification",
      "Emergency notifications to caregivers via React Native"
    ],
    results_hi: [
      "गंभीर स्थिति होने से पहले सक्रिय चेतावनी",
      "एमएल वर्गीकरण के साथ वास्तविक समय SpO2 और हृदय गति",
      "रिएक्ट नेटिव के माध्यम से देखभाल करने वालों को आपातकालीन सूचनाएं"
    ],
    results_es: [
      "Alertas proactivas antes de que las condiciones se vuelvan críticas",
      "SpO2 y frecuencia cardíaca en tiempo real con clasificación de ML",
      "Notificaciones de emergencia a cuidadores a través de React Native"
    ],
    achievements: [
      "Peer-reviewed: IJSRA 2024 (DOI: 10.30574/ijsra.2024.12.1.0781)",
      "End-to-end from raw physiological signal to mobile alert"
    ],
    achievements_hi: [
      "सहकर्मी-समीक्षित: IJSRA 2024 (DOI: 10.30574/ijsra.2024.12.1.0781)",
      "कच्चे शारीरिक संकेत से मोबाइल अलर्ट तक एंड-टू-एंड"
    ],
    achievements_es: [
      "Revisado por pares: IJSRA 2024 (DOI: 10.30574/ijsra.2024.12.1.0781)",
      "De extremo a extremo, desde la señal fisiológica bruta hasta la alerta móvil"
    ]
  },
  {
    id: "portfolio-v2",
    title: "Portfolio V2 — Full-Stack Personal Brand Platform",
    title_hi: "पोर्टफोलियो V2 — फुल-स्टैक पर्सनल ब्रांड प्लेटफॉर्म",
    title_es: "Portafolio V2 — Plataforma de Marca Personal Full-Stack",
    description:
      "Production portfolio with a Three.js 3D environment, Gemini AI conversational assistant trained on a custom context prompt, per-route SEO, and Firebase Cloud Functions — deployed on GitHub Pages via CI/CD.",
    description_hi: "एक Three.js 3D वातावरण, जेमिनी एआई संवादात्मक सहायक, प्रति-रूट एसईओ और फायरबेस क्लाउड फ़ंक्शंस के साथ पोर्टफोलियो।",
    description_es: "Portafolio de producción con un entorno 3D Three.js, asistente conversacional Gemini AI entrenado con un prompt personalizado, SEO por ruta y Firebase Cloud Functions.",
    category: "web",
    technologies: ["React 19", "Three.js", "Vite", "Firebase", "Gemini AI", "Framer Motion"],
    image: Portfolio,
    liveUrl: "https://shaguntyagi.tech/",
    githubUrl: "https://github.com/theshaguntyagi/PORTFOLIO-V2",
    problem: "Most developer portfolios look identical. Recruiters skim and bounce — no way to explore deeper without navigating away.",
    problem_hi: "अधिकांश डेवलपर पोर्टफोलियो समान दिखते हैं। भर्तीकर्ता स्क्रॉल करते हैं और चले जाते हैं — आगे तलाशने का कोई तरीका नहीं है।",
    problem_es: "La mayoría de los portafolios de desarrolladores se ven idénticos. Los reclutadores leen por encima y se van; no hay forma de explorar más sin navegar hacia afuera.",
    solution: "Interactive Three.js 3D hero differentiates on first load; Gemini AI assistant lets visitors ask about experience and projects and get real answers.",
    solution_hi: "इंटरैक्टिव Three.js 3D हीरो पहले लोड पर अलग दिखता है; जेमिनी एआई सहायक आगंतुकों को सवाल पूछने और जवाब पाने की अनुमति देता है।",
    solution_es: "El héroe interactivo 3D de Three.js se diferencia en la primera carga; el asistente de Gemini AI permite a los visitantes preguntar sobre la experiencia y obtener respuestas reales.",
    overview: "React 19 + Vite SPA with custom WebGL shaders, Framer Motion animations, AI chat on SHAGUN_CONTEXT, JSON-LD SEO, and Firebase Functions + Firestore backend.",
    overview_hi: "कस्टम शेडर्स, एआई चैट, JSON-LD SEO, और फायरबेस फंक्शन्स बैकएंड के साथ रिएक्ट 19 + वीट एसपीए।",
    overview_es: "React 19 + Vite SPA con sombreadores WebGL personalizados, animaciones de Framer Motion, chat de IA sobre SHAGUN_CONTEXT, SEO JSON-LD y backend de Firebase Functions + Firestore.",
    results: [
      "AI assistant handles recruiter questions about projects in real time",
      "Structured JSON-LD + Open Graph for search and social indexing",
      "CI/CD on every push to main via GitHub Actions"
    ],
    results_hi: [
      "एआई सहायक वास्तविक समय में परियोजनाओं के बारे में भर्तीकर्ताओं के सवालों को संभालता है",
      "खोज और सामाजिक अनुक्रमण के लिए संरचित JSON-LD + ओपन ग्राफ",
      "GitHub Actions के माध्यम से हर पुश पर CI/CD"
    ],
    results_es: [
      "El asistente de IA maneja las preguntas de los reclutadores sobre proyectos en tiempo real",
      "JSON-LD estructurado + Open Graph para indexación en búsquedas y redes sociales",
      "CI/CD en cada envío a la rama principal a través de GitHub Actions"
    ],
    futureWork: "Add prerendering for richer link previews, newsletter, and analytics-driven A/B tests on hero CTAs.",
    futureWork_hi: "अमीर लिंक पूर्वावलोकन, समाचार पत्र, और नायक CTA पर विश्लेषण-संचालित A/B परीक्षण के लिए प्रीरेन्डरिंग जोड़ें।",
    futureWork_es: "Agregar renderizado previo para vistas previas de enlaces más ricas, boletín informativo y pruebas A/B basadas en análisis en las llamadas a la acción (CTA) del héroe."
  },
  {
    id: "resumebook",
    title: "RESUMEBOOK — CSS 3D Page-Flip Portfolio Book",
    title_hi: "RESUMEBOOK — सीएसएस 3डी पेज-फ्लिप पोर्टफोलियो बुक",
    title_es: "RESUMEBOOK — Libro Portafolio con CSS 3D de Hojas Giratorias",
    description:
      "Interactive portfolio presented as a CSS 3D page-flip book with dark/light mode, skills radar chart, project thumbnails, live demo links, and smooth page transitions — deployed on GitHub Pages.",
    description_hi: "डार्क/लाइट मोड, स्किल्स रडार चार्ट, प्रोजेक्ट थंबनेल और पेज ट्रांज़िशन के साथ सीएसएस 3डी पेज-फ्लिप बुक के रूप में प्रस्तुत पोर्टफोलियो।",
    description_es: "Portafolio interactivo presentado como un libro plegable en 3D con CSS, modo oscuro/claro, gráfico de radar de habilidades, miniaturas de proyectos, enlaces de demostración en vivo y transiciones de página suaves.",
    category: "web",
    technologies: ["HTML", "CSS3", "JavaScript", "GitHub Pages"],
    image: codebook,
    liveUrl: "https://theshaguntyagi.github.io/RESUMEBOOK/",
    githubUrl: "https://github.com/theshaguntyagi/RESUMEBOOK",
    overview: "A resume presented as a realistic 3D flip-book in the browser. Features dark/light mode toggle, animated page turns, skills radar chart, and project cards with live demo and GitHub links.",
    overview_hi: "ब्राउज़र में एक यथार्थवादी 3D फ्लिप-बुक के रूप में प्रस्तुत एक बायोडाटा। इसमें डार्क/लाइट मोड, पेज टर्न, स्किल्स रडार चार्ट और प्रोजेक्ट कार्ड शामिल हैं।",
    overview_es: "Un currículum presentado como un libro animado en 3D realista en el navegador. Cuenta con modo oscuro/claro, giros de página, gráfico de radar de habilidades y tarjetas de proyectos con enlaces.",
    results: [
      "Distinctive recruiter experience — resume as interactive 3D book",
      "Dark/light mode toggle with smooth theme transitions",
      "Skills radar chart and project thumbnails with live links"
    ],
    results_hi: [
      "विशिष्ट भर्ती अनुभव — इंटरैक्टिव 3डी पुस्तक के रूप में फिर से शुरू करें",
      "चिकनी थीम संक्रमण के साथ डार्क/लाइट मोड टॉगल",
      "कौशल रडार चार्ट और लाइव लिंक के साथ प्रोजेक्ट थंबनेल"
    ],
    results_es: [
      "Experiencia distintiva para reclutadores: currículum como libro interactivo en 3D",
      "Alternancia de modo oscuro/claro con transiciones de tema suaves",
      "Gráfico de radar de habilidades y miniaturas de proyectos con enlaces en vivo"
    ]
  },
  {
    id: "snakegame",
    title: "Snake Game",
    title_hi: "सांप का खेल",
    title_es: "Juego de la Serpiente",
    description:
      "Classic Snake game built with vanilla HTML, CSS, and JavaScript — playable in browser with arrow key controls, score tracking, and responsive design.",
    description_hi: "वेनिला HTML, CSS और जावास्क्रिप्ट के साथ निर्मित क्लासिक स्नेक गेम — कीबोर्ड नियंत्रण के साथ ब्राउज़र में खेलने योग्य।",
    description_es: "Clásico juego de la serpiente construido con HTML, CSS y JavaScript vainilla: jugable en navegador con controles de teclas de flecha, seguimiento de puntuación y diseño responsivo.",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: Snake,
    liveUrl: "https://theshaguntyagi.github.io/Snakegame",
    githubUrl: "https://github.com/Theshaguntyagi/Snakegame",
    overview: "A browser-based Snake game with arrow key controls, real-time score tracking, and responsive layout. Built entirely with vanilla JS — no frameworks, no dependencies beyond Font Awesome.",
    overview_hi: "वेनिला जेएस के साथ पूरी तरह से निर्मित ब्राउज़र-आधारित स्नेक गेम — कोई फ्रेमवर्क नहीं, कोई निर्भरता नहीं।",
    overview_es: "Un juego de serpiente basado en navegador con controles de flechas, seguimiento de puntuación en tiempo real y diseño responsivo. Construido completamente con JS vainilla.",
    results: [
      "Zero-dependency implementation in vanilla HTML/CSS/JS",
      "Responsive design works across screen sizes",
      "Live playable demo on GitHub Pages"
    ],
    results_hi: [
      "वेनिला HTML/CSS/JS में शून्य-निर्भरता कार्यान्वयन",
      "उत्तरदायी डिजाइन स्क्रीन आकारों में काम करता है",
      "गिटहब पेजों पर लाइव खेलने योग्य डेमो"
    ],
    results_es: [
      "Implementación sin dependencias en HTML/CSS/JS vainilla",
      "El diseño responsivo funciona en todos los tamaños de pantalla",
      "Demostración jugable en vivo en GitHub Pages"
    ]
  }
];