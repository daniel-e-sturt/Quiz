from flask import Flask, abort, render_template, request


def calculate_tp_score(raw_score):
    return max(0, min((raw_score / 16) * 9.45, 10))


app = Flask(__name__)

QUESTIONS = [
    {"id": "q1", "number": 1, "section": "Common sense & logic", "text": "Six machines make 240 parts in 4 hours. At the same rate, how many parts do three machines make in 5 hours?", "choices": [("a", "100"), ("b", "150"), ("c", "200"), ("d", "300")], "answer": "b", "explanation": "240 ÷ 4 ÷ 6 = 10 per machine per hour. 3 × 5 × 10 = 150."},
    {"id": "q2", "number": 2, "section": "Common sense & logic", "text": "A clock loses 5 minutes every hour. If it is correct at 11:30 am, what is the actual time when the clock shows 5:00 pm?", "choices": [("a", "5:30 pm"), ("b", "5:00 pm"), ("c", "5:55 pm"), ("d", "6:00 pm")], "answer": "a", "explanation": "The clock loses 5 minutes × 6 hours = 30 minutes."},
    {"id": "q3", "number": 3, "section": "Common sense & logic", "text": "There are 20 people in a room. All but 9 leave. How many remain?", "choices": [("a", "11"), ("b", "9"), ("c", "0"), ("d", "20")], "answer": "b", "explanation": '"All but 9" means 9 remain.'},
    {"id": "q4", "number": 4, "section": "Common sense & logic", "text": "Three boxes are labelled APPLES, ORANGES, and MIXED. Every label is wrong. Which box should you draw one fruit from to identify all three boxes?", "choices": [("a", "The box labelled APPLES"), ("b", "The box labelled ORANGES"), ("c", "The box labelled MIXED"), ("d", "Any box; it does not matter")], "answer": "c", "explanation": "The MIXED box's label must be wrong, so it contains only apples or only oranges. One fruit identifies it, allowing the other two boxes to be identified."},
    {"id": "q5", "number": 5, "section": "Make-your-own-story", "text": "Your crew detects an unfamiliar object near the moon. What do you do first?", "choices": [("a", "Investigate it from orbit"), ("b", "Land beside it immediately"), ("c", "Ignore it and continue the mission")], "answer": "a", "story": True, "explanation": "Investigating from orbit reduces risk while gathering information."},
    {"id": "q6", "number": 6, "section": "Make-your-own-story", "text": "You find an abandoned spacecraft. What should the crew do next?", "choices": [("a", "Search its exterior first"), ("b", "Enter it right away"), ("c", "Take a sample and leave")], "answer": "a", "story": True, "explanation": "Searching the exterior first helps assess potential hazards before entering."},
    {"id": "q7", "number": 7, "section": "Make-your-own-story", "text": "The spacecraft appears damaged. What should you prioritize?", "choices": [("a", "Recover useful equipment"), ("b", "Search for signs of the crew"), ("c", "Continue your planned experiments")], "answer": "b", "story": True, "explanation": "The crew's safety should be a priority."},
    {"id": "q8", "number": 8, "section": "Make-your-own-story", "text": "You discover a possible danger that could affect Earth. What do you do?", "choices": [("a", "Send a warning to Earth"), ("b", "Wait for complete certainty"), ("c", "Keep it secret to avoid causing alarm")], "answer": "a", "story": True, "explanation": "A warning communicates a possible danger promptly."},
    {"id": "q9", "number": 9, "section": "Science", "text": "Why does the Moon appear to change shape during the month?", "choices": [("a", "Earth's shadow covers it every night"), ("b", "We see different portions of its sunlit half"), ("c", "The Moon changes its actual shape"), ("d", "Clouds cover different parts")], "answer": "b", "explanation": "We see different portions of the Moon's sunlit half."},
    {"id": "q10", "number": 10, "section": "Science", "text": "What generally happens to particles when a material is heated?", "choices": [("a", "They stop moving"), ("b", "They vibrate or move more"), ("c", "They disappear"), ("d", "They always become heavier")], "answer": "b", "explanation": "Heating generally makes particles vibrate or move more."},
    {"id": "q11", "number": 11, "section": "Science", "text": "Why do astronauts in orbit appear weightless?", "choices": [("a", "There is no gravity in space"), ("b", "They and their spacecraft are continuously falling around Earth together"), ("c", "Their spacecraft cancels Earth's gravity"), ("d", "They are too far away for gravity")], "answer": "b", "explanation": "Astronauts and their spacecraft are continuously falling around Earth together."},
    {"id": "q12", "number": 12, "section": "Science", "text": "What happens during condensation?", "choices": [("a", "Liquid water becomes vapour"), ("b", "Water vapour becomes liquid water"), ("c", "Ice becomes vapour"), ("d", "Liquid water becomes ice")], "answer": "b", "explanation": "Condensation changes water vapour into liquid water."},
    {"id": "q13", "number": 13, "section": "Engineering", "text": "A rover travels 600 metres at 2 metres per second, then scans an area for 3 minutes. How long does the task take?", "choices": [("a", "5 minutes"), ("b", "7 minutes"), ("c", "8 minutes"), ("d", "10 minutes")], "answer": "c", "explanation": "600 ÷ 2 = 300 seconds (5 minutes), plus 3 minutes scanning."},
    {"id": "q14", "number": 14, "section": "Engineering", "text": "Why are triangular supports often used in structures?", "choices": [("a", "They distribute forces and resist deformation"), ("b", "They make structures weightless"), ("c", "They prevent all vibration"), ("d", "They require no materials")], "answer": "a", "explanation": "Triangular supports help distribute forces and resist deformation."},
    {"id": "q15", "number": 15, "section": "Engineering", "text": "A 1,000-credit item is discounted by 8%, then by a further 10% of the reduced price. What is the final price?", "choices": [("a", "820"), ("b", "828"), ("c", "900"), ("d", "920")], "answer": "b", "explanation": "1000 − 80 = 920; 10% of 920 is 92; 920 − 92 = 828."},
    {"id": "q16", "number": 16, "section": "Engineering", "text": "Why should a spacecraft have a second communication system?", "choices": [("a", "To make it travel faster"), ("b", "It provides redundancy if the first system fails"), ("c", "To avoid mission control"), ("d", "To guarantee there is never a signal delay")], "answer": "b", "explanation": "A second communication system provides redundancy if the first fails."},
    {"id": "q17", "number": 17, "section": "Social intelligence", "text": "A teammate is struggling to finish their work on time. What is the most helpful response?", "choices": [("a", "Take over all their work without asking"), ("b", "Help them make a realistic plan"), ("c", "Tell everyone they are unreliable"), ("d", "Ignore the situation")], "answer": "b", "explanation": "Helping someone make a realistic plan supports the whole team."},
    {"id": "q18", "number": 18, "section": "Social intelligence", "text": "A teammate shares something personal and asks you to keep it private. What should you do?", "choices": [("a", "Share it with the team"), ("b", "Post it without their name"), ("c", "Respect their privacy"), ("d", "Use it to persuade them")], "answer": "c", "explanation": "Respecting someone's privacy maintains trust."},
    {"id": "q19", "number": 19, "section": "Social intelligence", "text": "Two teammates disagree about what caused a system fault. What is a fair way to resolve it?", "choices": [("a", "Choose the senior person's explanation"), ("b", "Compare the available evidence"), ("c", "Choose the explanation you heard first"), ("d", "Avoid investigating")], "answer": "b", "explanation": "Comparing evidence helps produce a fair decision."},
    {"id": "q20", "number": 20, "section": "Social intelligence", "text": "You realize you made a mistake that may affect the mission. What should you do?", "choices": [("a", "Hide it and hope it goes unnoticed"), ("b", "Blame a teammate"), ("c", "Be honest so the team can fix it"), ("d", "Delete the records")], "answer": "c", "explanation": "Being honest allows the team to fix the problem."},
]

ENDINGS = {
    "careful": ("A careful rescue", "Your cautious investigation uncovers the danger before it spreads. The crew is found, Earth is warned, and everyone returns safely."),
    "mixed": ("A hard-won rescue", "Your choices lead to a few close calls, but the team adapts and finds a way to protect the crew and alert Earth."),
    "rushed": ("A mission cut short", "The mission faces serious setbacks. Mission control orders an early return, and the mystery is left for a better-prepared team."),
}


@app.get("/")
def index():
    return render_template("index.html", questions=QUESTIONS)


@app.post("/submit")
def submit():
    answers = {question["id"]: request.form.get(question["id"]) for question in QUESTIONS}
    for question in QUESTIONS:
        allowed = {value for value, _ in question["choices"]}
        if answers[question["id"]] not in allowed:
            abort(400, description="Please answer every question using one of its listed choices.")

    score = sum(
        answers[question["id"]] == question["answer"]
        for question in QUESTIONS
        if not question.get("story")
    )
    tp_score = calculate_tp_score(score)
    story_points = sum(
        answers[question["id"]] == question["answer"]
        for question in QUESTIONS
        if question.get("story")
    )
    ending_key = "careful" if story_points == 4 else "mixed" if story_points >= 2 else "rushed"
    return render_template(
        "result.html",
        questions=QUESTIONS,
        answers=answers,
        score=score,
        tp_score=tp_score,
        ending=ENDINGS[ending_key],
    )


if __name__ == "__main__":
    app.run(debug=True)
