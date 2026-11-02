
function calculate_tp_score(raw_score) {
    return Math.max(0, Math.min((raw_score / 16) * 9.45, 10));
}

const QUESTIONS = [
    {
        id: "q1", section: "Common sense & logic",
        text: "Six machines make 240 parts in 4 hours. At the same rate, how many parts do three machines make in 5 hours?",
        choices: ["100", "150", "200", "300"],
        answer: 1,
        explanation: "240 ÷ 4 ÷ 6 = 10 per machine per hour. 3 × 5 × 10 = 150."
    },
    {
        id: "q2", section: "Common sense & logic",
        text: "A clock loses 5 minutes every hour. If it is correct at 11:30 am, what is the actual time when the clock shows 5:00 pm?",
        choices: ["5:30 pm", "5:00 pm", "5:55 pm", "6:00 pm"],
        answer: 0,
        explanation: "The clock loses 5 minutes × 6 hours = 30 minutes."
    },
    {
        id: "q3", section: "Common sense & logic",
        text: "There are 20 people in a room. All but 9 leave. How many remain?",
        choices: ["11", "9", "0", "20"],
        answer: 1,
        explanation: '"All but 9" means 9 remain.'
    },
    {
        id: "q4", section: "Common sense & logic",
        text: "Three boxes are labelled APPLES, ORANGES, and MIXED. Every label is wrong. Which box should you draw one fruit from?",
        choices: ["APPLES", "ORANGES", "MIXED", "Any box"],
        answer: 2,
        explanation: "The MIXED box must contain only apples or only oranges. One fruit identifies it."
    },
    {
        id: "q5", section: "Make-your-own-story", story: true,
        text: "Your crew detects an unfamiliar object near the moon. What do you do first?",
        choices: ["Investigate it from orbit", "Land beside it immediately", "Ignore it"],
        answer: 0,
        explanation: "Investigating from orbit reduces risk while gathering information."
    },
    {
        id: "q6", section: "Make-your-own-story", story: true,
        text: "You find an abandoned spacecraft. What should the crew do next?",
        choices: ["Search its exterior first", "Enter it right away", "Take a sample and leave"],
        answer: 0,
        explanation: "Searching the exterior first helps assess potential hazards."
    },
    {
        id: "q7", section: "Make-your-own-story", story: true,
        text: "The spacecraft appears damaged. What should you prioritize?",
        choices: ["Recover useful equipment", "Search for signs of the crew", "Continue experiments"],
        answer: 1,
        explanation: "The crew's safety should be a priority."
    },
    {
        id: "q8", section: "Make-your-own-story", story: true,
        text: "You discover a possible danger that could affect Earth. What do you do?",
        choices: ["Send a warning to Earth", "Wait for complete certainty", "Keep it secret"],
        answer: 0,
        explanation: "A warning communicates a possible danger promptly."
    },
    {
        id: "q9", section: "Science",
        text: "Why does the Moon appear to change shape during the month?",
        choices: ["Earth's shadow covers it", "We see different portions of its sunlit half", "The Moon changes shape", "Clouds cover it"],
        answer: 1,
        explanation: "We see different portions of the Moon's sunlit half."
    },
    {
        id: "q10", section: "Science",
        text: "What generally happens to particles when a material is heated?",
        choices: ["They stop moving", "They vibrate or move more", "They disappear", "They become heavier"],
        answer: 1,
        explanation: "Heating generally makes particles vibrate or move more."
    },
    {
        id: "q11", section: "Science",
        text: "Why do astronauts in orbit appear weightless?",
        choices: ["There is no gravity", "They and their spacecraft continuously fall around Earth together", "Their spacecraft cancels gravity", "They are too far away"],
        answer: 1,
        explanation: "Astronauts and their spacecraft continuously fall around Earth together."
    },
    {
        id: "q12", section: "Science",
        text: "What happens during condensation?",
        choices: ["Liquid becomes vapour", "Water vapour becomes liquid", "Ice becomes vapour", "Liquid becomes ice"],
        answer: 1,
        explanation: "Condensation changes water vapour into liquid water."
    },
    {
        id: "q13", section: "Engineering",
        text: "A rover travels 600 metres at 2 metres per second, then scans an area for 3 minutes. How long does the task take?",
        choices: ["5 minutes", "7 minutes", "8 minutes", "10 minutes"],
        answer: 2,
        explanation: "600 ÷ 2 = 300 seconds (5 minutes), plus 3 minutes scanning."
    },
    {
        id: "q14", section: "Engineering",
        text: "Why are triangular supports often used in structures?",
        choices: ["They distribute forces and resist deformation", "They make structures weightless", "They prevent all vibration", "They require no materials"],
        answer: 0,
        explanation: "Triangular supports help distribute forces and resist deformation."
    },
    {
        id: "q15", section: "Engineering",
        text: "A 1,000-credit item is discounted by 8%, then by a further 10% of the reduced price. What is the final price?",
        choices: ["820", "828", "900", "920"],
        answer: 1,
        explanation: "1000 − 80 = 920; 10% of 920 is 92; 920 − 92 = 828."
    },
    {
        id: "q16", section: "Engineering",
        text: "Why should a spacecraft have a second communication system?",
        choices: ["To travel faster", "It provides redundancy if the first system fails", "To avoid mission control", "To guarantee no signal delay"],
        answer: 1,
        explanation: "A second communication system provides redundancy if the first fails."
    },
    {
        id: "q17", section: "Social intelligence",
        text: "A teammate is struggling to finish their work on time. What is the most helpful response?",
        choices: ["Take over everything", "Help them make a realistic plan", "Tell everyone", "Ignore it"],
        answer: 1,
        explanation: "Helping someone make a realistic plan supports the whole team."
    },
    {
        id: "q18", section: "Social intelligence",
        text: "A teammate shares something personal and asks you to keep it private. What should you do?",
        choices: ["Share it with the team", "Post it anonymously", "Respect their privacy", "Use it to persuade them"],
        answer: 2,
        explanation: "Respecting someone's privacy maintains trust."
    },
    {
        id: "q19", section: "Social intelligence",
        text: "Two teammates disagree about what caused a system fault. What is a fair way to resolve it?",
        choices: ["Choose the senior person's explanation", "Compare the available evidence", "Choose the first explanation", "Avoid investigating"],
        answer: 1,
        explanation: "Comparing evidence helps produce a fair decision."
    },
    {
        id: "q20", section: "Social intelligence",
        text: "You realize you made a mistake that may affect the mission. What should you do?",
        choices: ["Hide it", "Blame a teammate", "Be honest so the team can fix it", "Delete the records"],
        answer: 2,
        explanation: "Being honest allows the team to fix the problem."
    }
];

const ENDINGS = {
    careful: {
        title: "A careful rescue",
        description: "Your cautious investigation uncovers the danger before it spreads. The crew is found, Earth is warned, and everyone returns safely."
    },
    mixed: {
        title: "A hard-won rescue",
        description: "Your choices lead to a few close calls, but the team adapts and finds a way to protect the crew and alert Earth."
    },
    rushed: {
        title: "A mission cut short",
        description: "The mission faces serious setbacks. Mission control orders an early return, and the mystery is left for a better-prepared team."
    }
};

const quiz = document.getElementById("quiz");
const results = document.getElementById("results");

function startQuiz() {
    quiz.innerHTML = "";
    results.innerHTML = "";

    let currentSection = "";

    QUESTIONS.forEach((question, index) => {
        if (question.section !== currentSection) {
            currentSection = question.section;

            const heading = document.createElement("h2");
            heading.textContent = currentSection;
            quiz.appendChild(heading);
        }

        const container = document.createElement("section");
        container.className = "question";

        const title = document.createElement("h3");
        title.textContent = `${index + 1}. ${question.text}`;
        container.appendChild(title);

        question.choices.forEach((choice, choiceIndex) => {
            const label = document.createElement("label");
            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = question.id;
            radio.value = choiceIndex;
            radio.required = true;

            label.appendChild(radio);
            label.append(` ${choice}`);
            container.appendChild(label);
            container.appendChild(document.createElement("br"));
        });

        quiz.appendChild(container);
    });

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Submit mission answers";
    quiz.appendChild(submit);
}

quiz.addEventListener("submit", function(event) {
    event.preventDefault();

    const answers = {};
    let score = 0;
    let storyPoints = 0;

    for (const question of QUESTIONS) {
        const selected = document.querySelector(
            `input[name="${question.id}"]:checked`
        );

        if (!selected) {
            alert("Please answer every question!");
            return;
        }

        const answer = Number(selected.value);
        answers[question.id] = answer;

        if (answer === question.answer) {
            if (question.story) {
                storyPoints++;
            } else {
                score++;
            }
        }
    }

    const tpScore = calculate_tp_score(score);

    const endingKey =
        storyPoints === 4 ? "careful" :
        storyPoints >= 2 ? "mixed" :
        "rushed";

    showResults(answers, score, tpScore, ENDINGS[endingKey]);
});

function showResults(answers, score, tpScore, ending) {
    quiz.style.display = "none";
    results.style.display = "block";

    results.innerHTML = `
        <h1>Mission complete!</h1>
        <h2>Knowledge score: ${score}/16</h2>
        <h2>TP score: ${tpScore.toFixed(2)}/10</h2>
        <hr>
        <h2>${ending.title}</h2>
        <p>${ending.description}</p>
        <hr>
        <h2>Answer explanations</h2>
    `;

    QUESTIONS.forEach((question, index) => {
        const correct = answers[question.id] === question.answer;

        const section = document.createElement("section");
        section.className = "answer-result";

        const heading = document.createElement("h3");
        heading.textContent = `${index + 1}. ${question.text}`;

        const result = document.createElement("p");
        result.textContent = correct ? "Correct" : "Incorrect";
        result.style.color = correct ? "green" : "red";

        const explanation = document.createElement("p");
        explanation.textContent = question.explanation;

        section.append(heading, result, explanation);
        results.appendChild(section);
    });

    const restart = document.createElement("button");
    restart.textContent = "Try again";
    restart.addEventListener("click", () => {
        quiz.style.display = "block";
        startQuiz();
    });

    results.appendChild(restart);
}

startQuiz();
