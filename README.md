# Mission IQ — Space Crew Quiz

A Flask quiz website with 20 questions across logic, story decisions, science, engineering, and social intelligence. At the end, you’ll see your knowledge score, the story ending your choices lead to, and explanations for each question.

## Requirements

- Python 3.10 or later
- pip

## Setup and run

From the project folder, create and activate a virtual environment, install Flask, and start the app:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python main.py
```

If PowerShell prevents environment activation, you can run the app with the virtual environment’s Python directly:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe main.py
```

Then open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

## Quiz and scoring

- The quiz has **20 questions**: 16 knowledge questions and 4 story decisions.
- The knowledge questions determine the score. Story decisions do not affect it.
- The score uses `calculate_tp_score(score)`: `score / 16 * 9.45`, limited to the range 0–10. With this formula, a perfect score is **9.45/10**.
- Your story choices determine one of three endings: a careful rescue, a hard-won rescue, or a mission cut short.
- All questions must be answered before the quiz can be submitted.

## Project structure

```text
.
├── main.py
├── requirements.txt
├── static/
│   └── style.css
└── templates/
    ├── index.html
    └── result.html
```

## Routes

- `GET /` — Displays the quiz.
- `POST /submit` — Checks submitted answers and displays the score, story ending, and explanations.
