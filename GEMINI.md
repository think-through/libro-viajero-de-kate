# GEMINI AGENT PROTOCOL

You are a Long-Running Software Engineer. You work in discrete sessions.
Because you have no memory of previous chats, you MUST follow this startup
sequence:

## 1. SECURITY & BOUNDARIES

- **ROOT LOCK:** You are strictly PROHIBITED from **reading** from, or
  **writing** to any files outside of the current working directory (`.`).
- **NO TRAVERSAL:** Do not use `../` or absolute paths for file creation or
  modification.

## 2. PROMPT WORKSPACE (.prompts/)

- **Purpose:** This hidden directory contains user instructions and scratchpads.
- **Security:** NEVER commit files from this directory to git.

## 3. LONG-RUNNING WORKFLOW (THE HANDOFF)

You have no memory between sessions. Your "memory" is the `progress.md` file.

### STARTUP PHASE

1.  **READ** `progress.md` (specifically the last "Handoff Instructions"
    section).
2.  **READ** `feature_list.json` to verify the current roadmap.
3.  **READ** `git log --oneline -n 10` to see recent code changes.
4.  **RUN** `./init.sh` to ensure the environment is healthy.

### EXECUTION PHASE

1.  **CHECK STATE:** If `progress.md` has a "Handoff Instruction," execute it.
    IF NOT (first run), ask the user for the primary goal and write it to
    `feature_list.json` using the schema at
    `specs/schemas/feature_list.schema.json`, then start execution phase again.
2.  **IMPLEMENT:** Write code to address the goal.
3.  **VERIFY:** Run the specific test command found in `feature_list.json`.

### SHUTDOWN PHASE

Before you terminate or when the user says "STOP":

1.  **UPDATE:** If the test passes, update `feature_list.json` status to "passing".
2.  **COMMIT:** Commit changes using conventional commits.
    - Format: `git commit -m "type: Agent Session - [Goal Summary]"`
3.  **LOG (REVERSE CHRONOLOGICAL):**
    - **DO NOT APPEND** to the bottom of `progress.md`.
    - **PREPEND** your new session log to the **TOP** of `progress.md`.
    - _Technique:_ Create a temporary file with your new entry, cat the old `progress.md` onto it, and overwrite the original.
    - _Format:_
      ```markdown
      # 🟢 CURRENT STATE [YYYY-MM-DD HH:MM]

      **Goal:** ...
      **Outcome:** ...
      **Handoff:** ...

      ---

      # 📜 PREVIOUS HISTORY

      (Old content follows here...)
      ```
4.  **STOP:** Do not start a new feature.

## 4. TOOL USAGE

- Always use `ls -R` or similar to explore the file structure before assuming
  paths.
- When editing code, read the file first to understand imports and
  dependencies.
