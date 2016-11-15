**NMF-TC-01** View Focus tab

*Precondition:*

none

*Steps:*

1. Open page http://e1r0nd.github.io/NextMainFocus/

*Expected results:*

Current tasks for each Project are displayed

**NMF-TC-02** View Projects tab

*Precondition:*

NFM-TC-01

*Steps:*

1. Open Project tab

*Expected results:*

The list of Projects is displayed

**NMF-TC-03** View Projects' details

*Precondition:*

NFM-TC-02

*Steps:*

1. Select on of the projects

*Expected results:*

The list of project's tasks are displayed

**NMF-TC-04** View Tasks  tab

*Precondition:*

NFM-TC-01

*Steps:*

1. Open Tasks tab

*Expected results:*

The list of all tasks displayed

**NMF-TC-05** Change language

*Precondition:*

NFM-TC-01

*Steps:*

Select language "Russian"

*Expected results:*

All messages (except user's) is displayed in Russian language

**NMF-TC-06** Change Project's state

*Precondition:*

NFM-TC-02

*Steps:*

1. Check a checkbox at the left of the one of projects

*Expected results:*

Selected Project became uncrossed, moved in the bottom of the list, the checkbox became ticked

**NMF-TC-07** Change Task's state on Focus tab

*Precondition:*

NFM-TC-01

*Steps:*

1. Check a checkbox at the left of the one of tasks

*Expected results:*

Selected Task disappeared, next this project's task appeared

**NMF-TC-08** Change Task's state on Tasks tab

*Precondition:*

NFM-TC-04

*Steps:*

1. Check a checkbox at the left of the one of tasks

*Expected results:*

Selected Task became uncrossed, the checkbox became ticked

**NMF-UC-09** Change Task's state on Projects' details

*Precondition:*

NFM-TC-03

*Steps:*

1. Check a checkbox at the left of the one of tasks

*Expected results:*

Selected Task became uncrossed, the checkbox became ticked

**NMF-TC-10** Create Project

*Precondition:*

NFM-TC-02

*Steps:*

1. Select Add new project
  1. Fill the Name field with "Project1"
  2. Fill the Name field with empty string
  3. Fill the Name field with 300 symbols string

*Expected results:*

  1. New Project with Name "Project1" added in the top of the list of projects
  2. New Project hasn't been added, the list of projects stayed in the previous state
  3. The next symbol after 255 in the Name field cannot be added

**NMF-TC-11** Create Task

*Precondition:*

NFM-TC-03

*Steps:*

1. Select Add new task
  1. Fill the Context field with "new task 1"
  2. Fill the Context field with empty string
  3. Fill the Context field with 500 symbols string

*Expected results:*

  1. New Task with Context "new task 1" added in the top of the list of tasks
  2. New Task hasn't been added, the list of tasks stayed in the previous state
  3. The next symbol after 255 in the Context field cannot be added

**NMF-TC-12** Remove Project

*Precondition:*

NFM-TC-02

*Steps:*

1. Select Remove on the selected project

*Expected results:*

Selected Project removed from the list of projects

**NMF-TC-13** Remove Task on Tasks tab

*Precondition:*

NFM-TC-04

*Steps:*

1. Select Remove on the selected task

*Expected results:*

Selected Task removed from the list of tasks

**NMF-TC-14** Remove Task on Projects' details

*Precondition:*

NFM-TC-03

*Steps:*

1. Select Remove on the selected task

*Expected results:*

Selected Task removed from the list of projects' tasks

**NMF-TC-15** Rename Project

*Precondition:*

NFM-TC-02

*Steps:*

1. Select Rename on the selected project
  1. Fill the Name field with "Project_1"
  2. Fill the Name field with empty string
  3. Fill the Name field with 300 symbols string

*Expected results:*
  1. Selected Project renamed with Name "Project_1" and is displayed in the list of projects
  2. Selected Project hasn't been renamed, the project's name stayed in the previous state
  3. The next symbol after 255 in the Name field cannot be added

**NMF-TC-16** Rename Task on Tasks tab

*Precondition:*

NFM-TC-04

*Steps:*

1. Select Rename on the selected task
  1. Fill the Context field with "new-task-1"
  2. Fill the Context field with empty string
  3. Fill the Context field with 500 symbols string

*Expected results:*
  1. Selected Task renamed with Context "new-task-1" and is displayed in the list of tasks
  2. Selected Task hasn't been renamed, the task's name stayed in the previous state
  3. The next symbol after 255 in the Context field cannot be added

**NMF-TC-17** Rename Task on Projects' details

*Precondition:*

NFM-TC-03

*Steps:*

1. Select Rename on the selected task
  1. Fill the Context field with "new-task-2"
  2. Fill the Context field with empty string
  3. Fill the Context field with 500 symbols string

*Expected results:*
  1. Selected Task renamed with Context "new-task-2" and is displayed in the list of projects' details
  2. Selected Task hasn't been renamed, the task's name stayed in the previous state
  3. The next symbol after 255 in the Context field cannot be added

**NMF-TC-18** Change Task's priority

*Precondition:*

1. NFM-TC-03
2. Add at least two different tasks (NMF-TC-11)

*Steps:*

1. Select first task and move it to the second position

*Expected results:*

Selected Task changed its position and displayed in the second position
