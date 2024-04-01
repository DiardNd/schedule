# Schedule

CRON Schedule Editor UI
This project aims to simplify the management of CRON schedules for tasks within a service. The CRON schedule is typically configured within a configuration file without any user interface. This project introduces a user-friendly interface for typical types of schedules while maintaining the underlying CRON syntax.

# Installation

```bash
git clone https://github.com/DiardNd/schedule.git
npm run start
```

# Features

Ease of Use: Users can easily select common scheduling patterns without needing to know the CRON syntax.
Error Prevention: The UI prevents users from making syntax errors when editing schedules.
Save and Load Functionality: Users can save and load schedules in CRON format.
Flexibility: While typical scheduling patterns are provided, users can still input custom CRON expressions.

# Typical Scheduling Patterns

Run Every X Minutes: Allows setting a task to run every specified number of minutes.
Run on Selected Days of the Week at a Specified Time: Users can choose specific days of the week and set a time for the task to run.
Run Every Day at One or Two Specified Times: Provides options to run the task once or twice daily at specified times.
Run Every Day of the Month: Allows setting the task to run daily and specifying the time.

# Usage

Select the desired scheduling pattern from the dropdown menus.
Set the parameters according to the selected pattern (e.g., time intervals, days of the week).
The CRON expression corresponding to the selected pattern will be displayed in the input field.
Click the Save button to save the schedule in CRON format.
To edit an existing schedule, paste the CRON expression into the input field and click Load.
