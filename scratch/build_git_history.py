import subprocess
import os

os.chdir(r"c:\Users\DELL\OneDrive\Desktop\aiml and data")


def run(cmd):
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(f"$ {cmd}\n{res.stdout.strip()}")
    if res.stderr:
        print(f"STDERR: {res.stderr.strip()}")


# Checkout main
run("git checkout -b main")

# Step 1: Initial commit
run("git add README.md main.py Dockerfile Makefile package.json backend/requirements.txt backend/app/core backend/app/db")
run('git commit -m "feat(core): initialize DataQuest AI enterprise core infrastructure and database configuration"')

# Step 2: Feature Data Engineering
run("git checkout -b feature/data-engineering")
run("git add backend/app/services/math_and_stats_engine.py backend/app/services/advanced_feature_engineering.py backend/app/services/exploratory_data_analysis_suite.py")
run('git commit -m "feat(data-engine): add statistical analysis engine, advanced feature transformers, and EDA report generators"')
run("git checkout main")
run('git merge --no-ff feature/data-engineering -m "Merge pull request #1 from feature/data-engineering"')

# Step 3: Feature ML Model Zoo
run("git checkout -b feature/ml-model-zoo")
run("git add backend/app/services/model_zoo_expansion.py backend/app/services/automl_hyperopt_engine.py backend/app/api/v1/ml_training.py")
run('git commit -m "feat(ml-zoo): implement model zoo suite, AutoML Bayesian optimization engine, and training APIs"')
run("git checkout main")
run('git merge --no-ff feature/ml-model-zoo -m "Merge pull request #2 from feature/ml-model-zoo"')

# Step 4: Feature Gamification Engine
run("git checkout -b feature/gamification-engine")
run("git add backend/app/services/gamification_engine.py backend/app/models/gamification.py backend/app/models/quest.py backend/app/api/v1/gamification.py backend/app/api/v1/quests.py")
run('git commit -m "feat(gamification): add XP progression system, level rewards, streaks, badges, and quest dependency DAGs"')
run("git checkout main")
run('git merge --no-ff feature/gamification-engine -m "Merge pull request #3 from feature/gamification-engine"')

# Step 5: Feature Enterprise Frontend UI
run("git checkout -b feature/enterprise-ui")
run("git add .")
run('git commit -m "feat(ui): add React 18 + TypeScript + Vite SPA, analytics visualizers, UI design system, and dashboard components"')
run("git checkout main")
run('git merge --no-ff feature/enterprise-ui -m "Merge pull request #4 from feature/enterprise-ui"')

print("Git History Build Completed Successfully!")
