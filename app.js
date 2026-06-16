const lectures = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Lecture ${index + 1}`,
  canvas: [],
  ai: []
}));

lectures[0].title = "Lecture 1: AI-Assisted Security and Android Basics";
lectures[0].canvas = [
  {
    id: "l1-canvas-1",
    type: "MCQ",
    prompt: "Which statement best matches the slides' description of GPT or LLM behavior?",
    options: [
      "It is a next-token prediction system that predicts patterns",
      "It first determines ground truth, then writes the answer in natural language",
      "It only copies exact sentences from its training data",
      "It performs formal verification before answering"
    ],
    correct: [0],
    feedback: "GPTs are next-token or pattern-prediction systems rather than truth engines."
  },
  {
    id: "l1-canvas-2",
    type: "MCQ",
    prompt: "Why is decompilation from machine code back to high-level code difficult for an LLM?",
    options: [
      "Because Android devices refuse to execute bytecode unless the source code is bundled with it",
      "Because machine code already includes the programmer's comments, which confuses the model",
      "Because decompilation only fails when the original source code was written in Kotlin",
      "Machine code provides less natural-language signal, is low-level and ambiguous, and requires reasoning about semantics rather than just syntax"
    ],
    correct: [3],
    feedback: "Decompilation is difficult because machine code has less natural-language signal, is low-level and ambiguous, and requires reasoning about semantics rather than just surface syntax."
  },
  {
    id: "l1-canvas-3",
    type: "MCQ",
    prompt: "Which statement about Android app sandboxing is correct?",
    options: [
      "Apps normally read other apps' private data unless the user enables extra sandbox settings",
      "Every app normally runs as a separate Linux user, which helps isolate its process and files",
      "Apps talk directly to hardware without mediation by the framework or kernel",
      "Sandboxing mainly comes from app-store review rather than OS isolation"
    ],
    correct: [1],
    feedback: "Each Android app normally runs as a separate Linux user, providing process isolation, memory isolation, and file-permission separation."
  },
  {
    id: "l1-canvas-4",
    type: "MCQ",
    prompt: "Which statement about APKs is correct?",
    options: [
      "Android runs the original Java or Kotlin source code directly from the APK",
      "APK files cannot be unpacked because they are not archive-based",
      "\"classes.dex\" stores compiled Android bytecode",
      "Decompilation always reconstructs the exact original source code"
    ],
    correct: [2],
    feedback: "\"classes.dex\" contains compiled Android bytecode. APKs are basically zip archives, and decompilers are not perfect."
  },
  {
    id: "l1-canvas-5",
    type: "MCQ",
    prompt: "Why does the runtime UI tree matter for mobile agents?",
    options: [
      "It guarantees every visible element is safe to interact with",
      "It removes the need to observe again after taking an action",
      "It hides package and interface information from the agent",
      "It turns the visible screen into machine-readable structure such as text, bounds, and clickability"
    ],
    correct: [3],
    feedback: "It turns the visible screen into machine-readable structure such as text, bounds, and clickability."
  },
  {
    id: "l1-canvas-6",
    type: "MAQ",
    prompt: "Which actions help reduce hallucinated vulnerability reports?",
    options: [
      "Ask for concrete proof, a minimal reproducible example, or an exact execution trace",
      "Ask the model to generate a PoC",
      "Avoid validation so the model does not get constrained",
      "Trust the first plausible-looking finding as report-ready"
    ],
    correct: [0, 1],
    feedback: "Asking for proof, a minimal reproducible example, or an exact execution trace helps test whether the claim is real. Asking the model to generate a PoC is another way to demand evidence."
  },
  {
    id: "l1-canvas-7",
    type: "MAQ",
    prompt: "Which actions help reduce missed vulnerabilities during AI-assisted analysis?",
    options: [
      "Always stop once the first obvious issue is found",
      "One long run already covers all relevant attack paths",
      "Change phrasing, model, or temperature",
      "Run multiple analyses"
    ],
    correct: [2, 3],
    feedback: "Changing phrasing, models, pre-trained data, or temperature can expose different findings. Running multiple analyses helps because models can miss issues."
  },
  {
    id: "l1-canvas-8",
    type: "MAQ",
    prompt: "Which statements about Android component exposure are correct?",
    options: [
      "A launcher entry activity is commonly exported so it can be started as the app entry-point",
      "If a component is launched via an intent, that alone means it is insecure",
      "Sensitive activities can rely only on who launched them and skip auth or session checks",
      "\"android:exported=\\\"false\\\"\" is safer by default for internal-only screens"
    ],
    correct: [0, 3],
    feedback: "The launcher activity is commonly exported so it can serve as the app's entry point. \"android:exported=\\\"false\\\"\" is safer by default for internal-only screens."
  },
  {
    id: "l1-canvas-9",
    type: "MAQ",
    prompt: "Which statements about deep links are correct?",
    options: [
      "Deep links are harmless because they cannot set up a dangerous state",
      "Android matches incoming URIs using \"intent-filter\" rules in the manifest",
      "If incoming parameters are not validated, attacker-chosen values can influence app behavior",
      "\"android.intent.category.BROWSABLE\" means only the app vendor's own website can open the activity"
    ],
    correct: [1, 2],
    feedback: "Android matches deep links using manifest \"intent-filter\" rules. Unvalidated link parameters can manipulate app behavior."
  },
  {
    id: "l1-canvas-10",
    type: "MAQ",
    prompt: "Which disclosure practices are appropriate when a real vulnerability is discovered during research or coursework?",
    options: [
      "Publish the full technical details publicly before contacting the vendor",
      "Make sure you are talking to the right person and ask for the procedure or channel first",
      "Report the vulnerability privately",
      "Exploit the same system to measure impact more accurately"
    ],
    correct: [1, 2],
    feedback: "Use the right disclosure contact or procedure first, and report the vulnerability privately."
  }
];

window.COMP6007_MCQ_BUILD = {
  version: "20260613-l1-canvas",
  lectureOneCanvasCount: lectures[0].canvas.length
};

const state = {
  lectureId: 1,
  source: "canvas",
  answers: JSON.parse(localStorage.getItem("comp6007-mcq-answers") || "{}")
};

const sourceLabels = {
  canvas: "Canvas MCQ",
  ai: "AI Generated MCQs"
};

const lectureList = document.querySelector("#lecture-list");
const questionPanel = document.querySelector("#question-panel");
const lectureTitle = document.querySelector("#lecture-title");
const courseLabel = document.querySelector("#course-label");
const sectionCount = document.querySelector("#section-count");
const sectionScore = document.querySelector("#section-score");
const sectionMode = document.querySelector("#section-mode");
const overallCount = document.querySelector("#overall-count");
const overallMeter = document.querySelector("#overall-meter");
const canvasCount = document.querySelector("#canvas-count");
const aiCount = document.querySelector("#ai-count");
const placeholderTemplate = document.querySelector("#placeholder-template");

function getCurrentLecture() {
  return lectures.find((lecture) => lecture.id === state.lectureId);
}

function getCurrentQuestions() {
  return getCurrentLecture()[state.source];
}

function keyFor(questionId) {
  return `${state.source}:${questionId}`;
}

function arraysMatch(a, b) {
  return a.length === b.length && a.every((value) => b.includes(value));
}

function saveAnswers() {
  localStorage.setItem("comp6007-mcq-answers", JSON.stringify(state.answers));
}

function renderLectureList() {
  lectureList.innerHTML = "";

  lectures.forEach((lecture) => {
    const answered = ["canvas", "ai"].flatMap((source) => lecture[source])
      .filter((question) => state.answers[`${source}:${question.id}`]?.checked).length;
    const total = lecture.canvas.length + lecture.ai.length;

    const button = document.createElement("button");
    button.type = "button";
    button.className = `lecture-button${lecture.id === state.lectureId ? " active" : ""}`;
    button.innerHTML = `
      <span class="lecture-number">${lecture.id}</span>
      <span class="lecture-name">${lecture.title}</span>
      <span class="lecture-progress">${answered}/${total}</span>
    `;
    button.addEventListener("click", () => {
      state.lectureId = lecture.id;
      render();
    });
    lectureList.appendChild(button);
  });
}

function renderQuestion(question, index) {
  const answerKey = keyFor(question.id);
  const stored = state.answers[answerKey] || { selected: [], checked: false };
  const isMultiple = question.type === "MAQ";
  const card = document.createElement("article");
  card.className = "question-card";

  const options = question.options.map((option, optionIndex) => {
    const selected = stored.selected.includes(optionIndex);
    const checkedClass = stored.checked
      ? question.correct.includes(optionIndex)
        ? " correct"
        : selected
          ? " incorrect"
          : ""
      : "";

    return `
      <label class="option${checkedClass}">
        <input
          type="${isMultiple ? "checkbox" : "radio"}"
          name="${question.id}"
          value="${optionIndex}"
          ${selected ? "checked" : ""}
          aria-label="${option}"
        />
        <span>${option}</span>
      </label>
    `;
  }).join("");

  const isCorrect = stored.checked && arraysMatch(stored.selected, question.correct);
  const feedbackClass = stored.checked ? ` visible${isCorrect ? " correct-answer" : ""}` : "";
  const feedbackText = stored.checked
    ? `${isCorrect ? "Correct." : "Not quite."} ${question.feedback}`
    : question.type === "MAQ"
      ? "Choose every correct option, then check your answer."
      : "Choose one option, then check your answer.";

  card.innerHTML = `
    <div class="question-header">
      <h3>Question ${index + 1}</h3>
      <span class="question-type">${question.type === "MAQ" ? "Multiple answers" : "Single answer"}</span>
    </div>
    <div class="question-body">
      <p class="prompt">${question.prompt}</p>
      <div class="options">${options}</div>
      <div class="actions">
        <button class="check-button" type="button">Check answer</button>
        <button class="reset-button" type="button">Clear</button>
      </div>
      <div class="feedback${feedbackClass}">${feedbackText}</div>
    </div>
  `;

  card.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      const selected = Array.from(card.querySelectorAll("input:checked"))
        .map((checkedInput) => Number(checkedInput.value));
      state.answers[answerKey] = { selected, checked: false };
      saveAnswers();
      render();
    });
  });

  card.querySelector(".check-button").addEventListener("click", () => {
    const selected = Array.from(card.querySelectorAll("input:checked"))
      .map((checkedInput) => Number(checkedInput.value));
    state.answers[answerKey] = { selected, checked: true };
    saveAnswers();
    render();
  });

  card.querySelector(".reset-button").addEventListener("click", () => {
    delete state.answers[answerKey];
    saveAnswers();
    render();
  });

  return card;
}

function renderQuestions() {
  const questions = getCurrentQuestions();
  questionPanel.innerHTML = "";

  if (questions.length === 0) {
    if (state.lectureId === 1 && state.source === "canvas") {
      const error = document.createElement("article");
      error.className = "empty-state data-error";
      error.innerHTML = `
        <span class="empty-icon">!</span>
        <h3>Lecture 1 Canvas data did not load</h3>
        <p>The current script reports zero Canvas questions. Refresh this page with Ctrl+F5, or open the root index file so the cache-busted script is loaded.</p>
      `;
      questionPanel.appendChild(error);
      return;
    }
    questionPanel.appendChild(placeholderTemplate.content.cloneNode(true));
    return;
  }

  questions.forEach((question, index) => {
    questionPanel.appendChild(renderQuestion(question, index));
  });
}

function renderStats() {
  const lecture = getCurrentLecture();
  const questions = getCurrentQuestions();
  const correct = questions.filter((question) => {
    const stored = state.answers[keyFor(question.id)];
    return stored?.checked && arraysMatch(stored.selected, question.correct);
  }).length;

  const allQuestions = lectures.flatMap((lecture) => [
    ...lecture.canvas.map((question) => ({ source: "canvas", question })),
    ...lecture.ai.map((question) => ({ source: "ai", question }))
  ]);
  const answered = allQuestions.filter(({ source, question }) => (
    state.answers[`${source}:${question.id}`]?.checked
  )).length;
  const total = allQuestions.length;

  sectionCount.textContent = questions.length;
  sectionScore.textContent = correct;
  sectionMode.textContent = sourceLabels[state.source];
  canvasCount.textContent = lecture.canvas.length;
  aiCount.textContent = lecture.ai.length;
  overallCount.textContent = `${answered} / ${total}`;
  overallMeter.style.width = total ? `${(answered / total) * 100}%` : "0%";
}

function render() {
  const lecture = getCurrentLecture();
  lectureTitle.textContent = lecture.title;
  courseLabel.textContent = `Lecture ${lecture.id}`;

  document.querySelectorAll(".source-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.source === state.source);
  });

  renderLectureList();
  renderQuestions();
  renderStats();
}

document.querySelectorAll(".source-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    state.source = tab.dataset.source;
    render();
  });
});

render();
