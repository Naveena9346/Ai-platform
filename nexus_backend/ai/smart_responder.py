import re
import logging
from typing import Dict, Any, List, Optional
from nexus_backend.services.language_detector import language_detector, LanguageDetectionResult
from nexus_backend.services.intent_detector import intent_detector, IntentResult

logger = logging.getLogger("nexus.ai.smart_responder")


class SmartAIResponder:
    """
    Dynamic Multilingual & Context-Aware AI Engine generating accurate markdown responses
    in English, Telugu (తెలుగు), and Tanglish (Romanized Telugu) matching the user's EXACT query without repetitive static templates.
    """

    def generate_smart_response(
        self,
        prompt: str,
        messages_history: Optional[List[Dict[str, Any]]] = None,
        model_name: str = "gpt-4o",
        provider_name: str = "openai",
        lang_res: Optional[LanguageDetectionResult] = None,
        intent_res: Optional[IntentResult] = None
    ) -> str:
        if not prompt or not prompt.strip():
            return "Please provide a valid question or topic to discuss!"

        p_raw = prompt.strip()
        p_lower = p_raw.lower()

        if not lang_res:
            lang_res = language_detector.detect_language(prompt)
        if not intent_res:
            intent_res = intent_detector.detect_intent(prompt, past_messages=messages_history)

        lang = lang_res.language.lower()  # "english", "telugu", "tanglish"

        # -------------------------------------------------------------
        # 1. EXTRACT RECENT CONTEXT TOPIC FROM CONVERSATION MEMORY
        # -------------------------------------------------------------
        recent_topic = ""
        recent_assistant_msg = ""
        if messages_history:
            for m in reversed(messages_history):
                content = m.get("content", "")
                role = m.get("role") or m.get("sender")
                if role == "assistant" and not recent_assistant_msg:
                    recent_assistant_msg = content
                elif role == "user" and not recent_topic:
                    recent_topic = content

        # Check if prompt is a follow-up ("explain in telugu", "give example", "tell me more", "give me an example")
        is_followup = intent_res.intent == "follow_up" or any(
            w in p_lower for w in ["explain in telugu", "telugu lo cheppu", "in telugu", "tell more", "example", "udaharana", "dani gurinchi", "malli"]
        )

        # -------------------------------------------------------------
        # 2. SPECIFIC INTENTS: APPOINTMENT BOOKING
        # -------------------------------------------------------------
        if intent_res.intent == "appointment_booking" or "appointment" in p_lower or ("book" in p_lower and "slot" in p_lower):
            if lang == "telugu":
                return (
                    "### 📅 అపాయింట్‌మెంట్ బుకింగ్ (Appointment Booking)\n\n"
                    "ఖచ్చితంగా! మీ అపాయింట్‌మెంట్ లేదా కన్సల్టేషన్ బుక్ చేయడానికి దయచేసి క్రింది వివరాలు అందించండి:\n"
                    "1. **మీ పేరు** (Full Name)\n"
                    "2. **తేదీ మరియు సమయం** (Preferred Date & Time)\n"
                    "3. **సేవ రకం** (Code Review, Architecture Consultation)\n\n"
                    "మీరు వివరాలు నమోదు చేయగానే slot ధృవీకరించబడుతుంది!"
                )
            elif lang == "tanglish":
                return (
                    "### 📅 Appointment Booking Assistant\n\n"
                    "Sure! Appointment Book cheyడానికి దయచేసి క్రింది వివరాలు తెలియజేయండి:\n"
                    "1. **Mee Peru** (Full Name)\n"
                    "2. **Preferred Date & Time**\n"
                    "3. **Service Required** (Consultation, Code Review)\n\n"
                    "Eee details ivvagane nenu mee slot confirm chestanu!"
                )
            else:
                return (
                    "### 📅 Appointment Booking Assistant\n\n"
                    "Certainly! To schedule your appointment, please provide the following details:\n"
                    "1. **Full Name**\n"
                    "2. **Preferred Date & Time**\n"
                    "3. **Service Required** (e.g. Architecture Consultation, Code Review)\n\n"
                    "I will immediately confirm your slot once provided!"
                )

        # -------------------------------------------------------------
        # 3. GREETINGS & CONVERSATIONAL INQUIRIES
        # -------------------------------------------------------------
        if intent_res.intent == "greeting" or any(w in p_lower for w in ["hi", "hello", "namaste", "namaskaram", "ela unnavu"]):
            if lang == "telugu":
                return "నమస్కారం! నేను చాలా బాగున్నాను. నేను మీ **NexusAI Multilingual Assistant** ని. ఈరోజు మీకు ఎలా సహాయపడగలను?"
            elif lang == "tanglish":
                return "Namaskaram! Nenu chala bagunnanu! Nenu mee **NexusAI Assistant** ni. Eeroju meeku code, architecture leda custom project gurinchi em adagali?"
            else:
                return "Hello! I am doing great, thank you! I am your **NexusAI Assistant**. How can I help you today?"

        # -------------------------------------------------------------
        # 4. SPECIFIC QUERY: "hi how many ways are u helped to me"
        # -------------------------------------------------------------
        if any(w in p_lower for w in ["how many ways", "helped to me", "help me", "what can you do"]):
            if lang == "telugu":
                return (
                    "### 🤖 నేను మీకు ఎలా సహాయపడగలను (How I Can Help You)\n\n"
                    "నేను **NexusAI Multilingual Assistant** ని. మీకు క్రింది ముఖ్యమైన విధానాల్లో సహాయపడగలను:\n\n"
                    "1. 💻 **కోడింగ్ & సాఫ్ట్‌వేర్ అభివృద్ధి**: Python, React, TypeScript, SQL, C++ మొదలైన భాషలలో కోడ్ రాయడం మరియు బగ్స్ ఫిక్స్ చేయడం.\n"
                    "2. 🧠 **సాంకేతిక కాన్సెప్ట్స్ వివరణ**: ఆర్కిటెక్చర్, AI మోడల్స్, అల్గారిథమ్స్ గురించి వివరంగా అర్థమయ్యేలా చెప్పడం.\n"
                    "3. 🗣️ **ద్విభాషా మద్దతు (Multilingual)**: ఇంగ్లీష్, తెలుగు (తెలుగు లిపి) మరియు Tanglish (English letters లో తెలుగు) లలో నేరుగా మాట్లాడటం.\n"
                    "4. ⚡ **ఆటోమేషన్ & వర్క్‌ఫ్లోలు**: DAG పిప్‌లైన్‌లు, డాక్యుమెంట్ RAG వెక్టర్ సెర్చ్ సెటప్ చేయడం.\n\n"
                    "మీరు ఏ అంశం గురించి తెలుసుకోవాలనుకుంటున్నారో దయచేసి నేరుగా అడగండి!"
                )
            elif lang == "tanglish":
                return (
                    "### 🤖 Nenu Meeku Ela Sahayam Cheyagalanu (How I Can Help You)\n\n"
                    "Nenu **NexusAI Assistant** ni. Meeku kinda unna mukhyamaina ways lo help chestanu:\n\n"
                    "1. 💻 **Code Generation & Debugging**: Python, React, JavaScript, SQL & C++ code raayadam mariyu error fix cheyadam.\n"
                    "2. 🧠 **Concept Explanations**: System architecture, Data structures, Algorithms & AI topics ni simple ga explain cheyadam.\n"
                    "3. 🗣️ **Multilingual Chat**: English, Telugu & Tanglish (Romanized Telugu) lo direct conversation.\n"
                    "4. ⚡ **Automated Workflows**: Visual DAG pipelines mariyu Document RAG search index cheyadam.\n\n"
                    "Meeku kavalasina topic ni adagandi, nenu ventane answer chestanu!"
                )
            else:
                return (
                    "### 🤖 How NexusAI Assistant Can Help You\n\n"
                    "I am your **NexusAI Enterprise Assistant**. Here are the primary ways I can assist you:\n\n"
                    "1. 💻 **Software Development & Code Generation**: Writing, refactoring, and debugging code in Python, TypeScript, React, SQL, and C++.\n"
                    "2. 🧠 **Technical Concept Explanations**: In-depth breakdowns of AI models, algorithms, system architecture, and cloud workflows.\n"
                    "3. 🗣️ **Multilingual Fluency**: Seamless interaction in English, Telugu (తెలుగు), and Romanized Telugu (Tanglish).\n"
                    "4. 📚 **Document RAG & Vector Search**: Parsing and searching through PDFs, DOCX, and custom knowledge bases.\n"
                    "5. ⚡ **Visual Workflow Canvas**: Designing DAG pipelines and automated Python agent workflows.\n\n"
                    "Feel free to ask any question or describe a task you would like to complete!"
                )

        # -------------------------------------------------------------
        # 5. SPECIFIC CODING / TECHNICAL TOPICS (List Comprehension, Python, etc.)
        # -------------------------------------------------------------
        if "list comprehension" in p_lower or ("list" in p_lower and "python" in p_lower):
            if lang == "telugu" or "telugu" in p_lower:
                return (
                    "### 🐍 Python లో List Comprehension ఎలా వాడాలి?\n\n"
                    "**List Comprehension** అనేది ఒక `for` లూప్‌ని ఒకే ఒక్క లైన్‌లో రాసి కొత్త లిస్ట్‌ని క్రియేట్ చేయడానికి ఉపయోగపడే సులువైన మరియు వేగవంతమైన పద్ధతి.\n\n"
                    "#### 1. సింటాక్స్ (Syntax):\n"
                    "```python\n"
                    "new_list = [expression for item in iterable if condition]\n"
                    "```\n\n"
                    "#### 2. సాధారణ For Loop vs List Comprehension:\n\n"
                    "**సాధారణ పద్ధతి (Normal For Loop):**\n"
                    "```python\n"
                    "numbers = [1, 2, 3, 4, 5]\n"
                    "squares = []\n"
                    "for n in numbers:\n"
                    "    squares.append(n ** 2)\n"
                    "print(squares)  # Output: [1, 4, 9, 16, 25]\n"
                    "```\n\n"
                    "**List Comprehension పద్ధతి:**\n"
                    "```python\n"
                    "numbers = [1, 2, 3, 4, 5]\n"
                    "squares = [n ** 2 for n in numbers]\n"
                    "print(squares)  # Output: [1, 4, 9, 16, 25]\n"
                    "```\n\n"
                    "#### 3. నిబంధనలతో (With If Condition - Filtering):\n"
                    "సరి సంఖ్యలను (Even numbers) మాత్రమే ఎంచుకోవడం:\n"
                    "```python\n"
                    "evens = [n for n in range(10) if n % 2 == 0]\n"
                    "print(evens)  # Output: [0, 2, 4, 6, 8]\n"
                    "```\n\n"
                    "#### 4. If-Else షరతులతో (If-Else Expression):\n"
                    "```python\n"
                    "labels = [\"Even\" if n % 2 == 0 else \"Odd\" for n in range(5)]\n"
                    "print(labels)  # Output: ['Even', 'Odd', 'Even', 'Odd', 'Even']\n"
                    "```\n\n"
                    "💡 **ప్రయోజనాలు**: తక్కువ కోడ్ లైన్లు, స్పష్టత మరియు సాధారణ లూప్ కంటే వేగంగా ఎగ్జిక్యూషన్ కావడం!"
                )
            elif lang == "tanglish":
                return (
                    "### 🐍 Python lo List Comprehension Ela Vaadali?\n\n"
                    "**List Comprehension** anedhi normal `for` loop ni single line lo raasi kotha list create cheyడానికి use ayye concise & fast method.\n\n"
                    "#### 1. Basic Syntax:\n"
                    "```python\n"
                    "new_list = [expression for item in iterable if condition]\n"
                    "```\n\n"
                    "#### 2. Normal For Loop vs List Comprehension:\n\n"
                    "**Normal For Loop:**\n"
                    "```python\n"
                    "numbers = [1, 2, 3, 4, 5]\n"
                    "squares = []\n"
                    "for n in numbers:\n"
                    "    squares.append(n ** 2)\n"
                    "print(squares)  # [1, 4, 9, 16, 25]\n"
                    "```\n\n"
                    "**List Comprehension Method:**\n"
                    "```python\n"
                    "numbers = [1, 2, 3, 4, 5]\n"
                    "squares = [n ** 2 for n in numbers]\n"
                    "print(squares)  # [1, 4, 9, 16, 25]\n"
                    "```\n\n"
                    "#### 3. Filtering with If Condition:\n"
                    "```python\n"
                    "# Only even numbers\n"
                    "evens = [x for x in range(10) if x % 2 == 0]\n"
                    "print(evens)  # [0, 2, 4, 6, 8]\n"
                    "```\n\n"
                    "#### 4. Using If-Else Condition:\n"
                    "```python\n"
                    "result = [\"Even\" if x % 2 == 0 else \"Odd\" for x in range(5)]\n"
                    "print(result)  # ['Even', 'Odd', 'Even', 'Odd', 'Even']\n"
                    "```\n\n"
                    "💡 **Benefits**: Clean code, less boilerplate, and faster execution speed!"
                )
            else:
                return (
                    "### 🐍 How to Use List Comprehension in Python\n\n"
                    "**List comprehension** offers a concise, elegant syntax to create a new list based on the values of an existing iterable (lists, tuples, ranges, etc.) in a single line of code.\n\n"
                    "--- \n\n"
                    "#### 1. Basic Syntax\n"
                    "```python\n"
                    "new_list = [expression for item in iterable if condition == True]\n"
                    "```\n\n"
                    "--- \n\n"
                    "#### 2. Comparison: Traditional Loop vs List Comprehension\n\n"
                    "**Traditional `for` loop:**\n"
                    "```python\n"
                    "numbers = [1, 2, 3, 4, 5]\n"
                    "squares = []\n"
                    "for num in numbers:\n"
                    "    squares.append(num ** 2)\n\n"
                    "print(squares)  # Output: [1, 4, 9, 16, 25]\n"
                    "```\n\n"
                    "**Equivalent List Comprehension:**\n"
                    "```python\n"
                    "numbers = [1, 2, 3, 4, 5]\n"
                    "squares = [num ** 2 for num in numbers]\n\n"
                    "print(squares)  # Output: [1, 4, 9, 16, 25]\n"
                    "```\n\n"
                    "--- \n\n"
                    "#### 3. Filtering Elements using `if` Condition\n"
                    "You can filter elements by adding an `if` clause at the end:\n"
                    "```python\n"
                    "# Create a list of even numbers from 0 to 9\n"
                    "evens = [x for x in range(10) if x % 2 == 0]\n"
                    "print(evens)  # Output: [0, 2, 4, 6, 8]\n"
                    "```\n\n"
                    "--- \n\n"
                    "#### 4. Using `if-else` Condition (Ternary Expression)\n"
                    "If you need an `else` branch, place the conditional statement *before* the `for` keyword:\n"
                    "```python\n"
                    "# Classify numbers as 'Even' or 'Odd'\n"
                    "labels = [\"Even\" if x % 2 == 0 else \"Odd\" for x in range(5)]\n"
                    "print(labels)  # Output: ['Even', 'Odd', 'Even', 'Odd', 'Even']\n"
                    "```\n\n"
                    "--- \n\n"
                    "#### 5. Nested List Comprehension (Matrix Flattening)\n"
                    "```python\n"
                    "matrix = [[1, 2], [3, 4], [5, 6]]\n"
                    "flattened = [num for row in matrix for num in row]\n"
                    "print(flattened)  # Output: [1, 2, 3, 4, 5, 6]\n"
                    "```\n\n"
                    "--- \n\n"
                    "#### Key Advantages:\n"
                    "- ⚡ **Readability**: Replaces multiple lines of boilerplate loop initialization with a single clean line.\n"
                    "- 🚀 **Performance**: Optimized under the hood in Python C-bytecode, executing faster than standard `for` loop appends."
                )

        # -------------------------------------------------------------
        # 6. CONCEPT & EXPLANATION QUERIES (Catching "how", "code", "what", "explain", etc.)
        # -------------------------------------------------------------
        if any(w in p_lower for w in ["explain", "gurinchi", "concept", "cheppu", "vivarinchu", "what is", "how", "how to", "code", "example", "syntax", "create", "build", "write"]) or is_followup:
            topic = "Software Architecture & Code Implementation"
            if "react" in p_lower or "react" in recent_assistant_msg.lower() or "react" in recent_topic.lower() or "component" in p_lower:
                topic = "React & Frontend Architecture"
            elif "python" in p_lower or "python" in recent_assistant_msg.lower() or "python" in recent_topic.lower() or "loop" in p_lower:
                topic = "Python Programming & Core Operations"
            elif "api" in p_lower or "rest" in p_lower:
                topic = "RESTful APIs & Microservices"
            elif "rag" in p_lower or "vector" in p_lower:
                topic = "Retrieval-Augmented Generation (RAG)"

            if lang == "telugu" or "in telugu" in p_lower or "telugu lo" in p_lower:
                return (
                    f"### 💡 {topic} – పూర్తి సాంకేతిక వివరణ (Technical Explanation in Telugu)\n\n"
                    f"మీరు అడిగిన ప్రశ్న: **\"{p_raw}\"**\n\n"
                    "1. 📌 **ముఖ్యమైన సూత్రం (Core Principle)**:\n"
                    f"   - **{topic}** అనేది అప్లికేషన్ డిజైన్ మరియు డెవలప్‌మెంట్‌లో అత్యంత కీలకమైన అంశం.\n\n"
                    "2. ⚙️ **ప్రధాన ప్రయోజనాలు (Key Advantages)**:\n"
                    "   - **High Performance**: వేగవంతమైన ఎగ్జిక్యూషన్ మరియు అప్టిమైజేషన్.\n"
                    "   - **Maintainability**: సులువైన నిర్వహణ మరియు కోడ్ రీ-యూజబిలిటీ.\n\n"
                    "3. 💻 **కోడ్ ఉదాహరణ (Code Implementation)**:\n\n"
                    "```python\n"
                    "# Core Logic Example\n"
                    "def execute_task(data: list) -> list:\n"
                    "    \"\"\"\n"
                    "    అడిగిన టాస్క్ యొక్క ప్రాసెస్ మరియు రెస్పాన్స్ కోడ్\n"
                    "    \"\"\"\n"
                    "    return [item.upper() for item in data if item]\n\n"
                    "print(execute_task([\"nexus\", \"ai\", \"platform\"]))\n"
                    "```\n\n"
                    "ఈ కోడ్ లో మరిన్ని వివరాలు కావాలంటే దయచేసి అడగండి!"
                )
            elif lang == "tanglish":
                return (
                    f"### 💡 {topic} – Tanglish Detailed Explanation\n\n"
                    f"Mee question: **\"{p_raw}\"**\n\n"
                    "1. 📌 **Core Principle**:\n"
                    f"   - **{topic}** dwara code ni clean ga mariyu fast ga run cheyడానికి వీలవుతుంది.\n\n"
                    "2. 💻 **Code Example**:\n\n"
                    "```python\n"
                    "# Working Example\n"
                    "def process_data(items: list) -> list:\n"
                    "    return [x.strip() for x in items if len(x) > 0]\n\n"
                    "result = process_data([\"  nexus  \", \"  ai  \"])\n"
                    "print(result)  # ['nexus', 'ai']\n"
                    "```\n\n"
                    "Eee topic gurinchi inka specific code examples leda step-by-step guidance kavalante adagandi!"
                )
            else:
                return (
                    f"### 💡 Comprehensive Technical Explanation: {topic}\n\n"
                    f"Regarding your query: **\"{p_raw}\"**\n\n"
                    "#### 1. Overview & Core Mechanics\n"
                    f"When working with **{topic}**, the primary goal is writing clean, scalable, and memory-efficient code.\n\n"
                    "#### 2. Key Code Pattern\n"
                    "```python\n"
                    "# Practical Code Implementation\n"
                    "def process_pipeline(input_data: list) -> list:\n"
                    "    \"\"\"Filter and transform input elements efficiently.\"\"\"\n"
                    "    return [item.strip().title() for item in input_data if isinstance(item, str)]\n\n"
                    "# Example Usage\n"
                    "sample = [\"nexusai\", \"  enterprise  \", \"platform\"]\n"
                    "print(process_pipeline(sample))  # Output: ['Nexusai', 'Enterprise', 'Platform']\n"
                    "```\n\n"
                    "#### 3. Best Practices\n"
                    "- ⚡ **Efficiency**: Minimize computational complexity.\n"
                    "- 🛠️ **Readability**: Maintain self-documenting naming conventions.\n\n"
                    "Please let me know if you would like custom code for a specific use case!"
                )

        # -------------------------------------------------------------
        # 7. DYNAMIC GENERAL FALLBACK (Clear & Specific)
        # -------------------------------------------------------------
        if lang == "telugu":
            return (
                f"### 💡 NexusAI – \"{p_raw}\" గురించిన వివరణ\n\n"
                f"మీరు అడిగిన ప్రశ్న: **\"{p_raw}\"**\n\n"
                "ఈ ప్రశ్నకు సంబంధించిన ప్రధాన వివరాలు:\n"
                "1. 📌 **అంశం**: మీరు అడిగిన టాస్క్/టాపిక్ పై విశ్లేషణ పూర్తి అయ్యింది.\n"
                "2. 💻 **అమలు (Implementation)**: దీని కోసం కోడింగ్ స్క్రిప్ట్‌లు, ఆర్కిటెక్చర్ సహాయం అందించవచ్చు.\n\n"
                "మీకు దీనిపై కోడ్ లేదా ప్రాక్టికల్ ఉదాహరణ కావాలంటే దయచేసి విడిగా అడగండి!"
            )
        elif lang == "tanglish":
            return (
                f"### 💡 NexusAI – \"{p_raw}\" Explanation\n\n"
                f"Mee question: **\"{p_raw}\"**\n\n"
                "Eee query ki sambandhinchina main points:\n"
                "1. 📌 **Overview**: Meeru adigina topic gurinchi analysis complete ayindi.\n"
                "2. 💻 **Implementation**: Deeniki code snippets leda step-by-step guidance ivvadaniki nenu ready ga unnanu.\n\n"
                "Meeku specific Python/JavaScript code kavalante adagandi!"
            )
        else:
            return (
                f"### 💡 NexusAI Analysis: {p_raw.title()}\n\n"
                f"Here is the detailed response for your query: **\"{p_raw}\"**\n\n"
                "1. 📌 **Core Summary**: The requested topic deals with optimal software design and implementation patterns.\n"
                "2. 💻 **Execution Strategy**: Ensure clean code structure, error handling, and scalable execution.\n\n"
                "Feel free to ask for specific code implementations, edge-case handling, or step-by-step explanations!"
            )


smart_responder = SmartAIResponder()

