// SBA 308 - JavaScript Fundamentals

const CourseInfo = {
  id: 451,
  name: "JavaScript Fundamentals",
};

const AssignmentGroup = {
  id: 12345,
  name: "JavaScript Basics",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Variables Assignment",
      due_at: "2025-01-10",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Conditionals Assignment",
      due_at: "2025-01-15",
      points_possible: 100,
    },
    {
      id: 3,
      name: "Loops Assignment",
      due_at: "2099-12-31", // future assignment
      points_possible: 150,
    },
  ],
};

const LearnerSubmissions = [
  {
    learner_id: 101,
    assignment_id: 1,
    submission: {
      submitted_at: "2025-01-09",
      score: 45,
    },
  },
  {
    learner_id: 101,
    assignment_id: 2,
    submission: {
      submitted_at: "2025-01-16", // late submission
      score: 90,
    },
  },
  {
    learner_id: 102,
    assignment_id: 1,
    submission: {
      submitted_at: "2025-01-10",
      score: 50,
    },
  },
  {
    learner_id: 102,
    assignment_id: 2,
    submission: {
      submitted_at: "2025-01-14",
      score: 80,
    },
  },
];


// ARRAY MANIPULATION DEMO


const demoArray = [1, 2, 3];

demoArray.push(4); // add item
demoArray.pop(); // remove item


// HELPER FUNCTIONS



function isAssignmentDue(dueDate) {
  return new Date(dueDate) <= new Date();
}


function findAssignmentById(assignments, id) {
  return assignments.find((assignment) => assignment.id === id);
}


function applyLatePenalty(score, pointsPossible) {
  return score - pointsPossible * 0.1;
}


// MAIN FUNCTION


function getLearnerData(course, ag, submissions) {
  try {
    
    // VALIDATION
    

    if (course.id !== ag.course_id) {
      throw new Error(
        "Invalid input: AssignmentGroup does not belong to this course."
      );
    } else {
      console.log("Course validation successful.");
    }

    if (!Array.isArray(submissions)) {
      throw new Error("Submissions data must be an array.");
    } else {
      console.log("Submissions validation successful.");
    }

    
    const learners = {};

    
    // PROCESS SUBMISSIONS
   

    for (const submissionData of submissions) {

      
      if (!submissionData.submission) {
        console.log("Invalid submission detected.");
        break;
      }

      const learnerId = submissionData.learner_id;
      const assignmentId = submissionData.assignment_id;

      const assignment = findAssignmentById(
        ag.assignments,
        assignmentId
      );

      
      if (!assignment) {
        console.log(`Assignment ${assignmentId} not found.`);
        continue;
      } else {
        console.log(`Assignment ${assignmentId} found.`);
      }

      
      if (!isAssignmentDue(assignment.due_at)) {
        console.log(
          `Assignment ${assignment.id} is not due yet.`
        );
        continue;
      } else {
        console.log(
          `Assignment ${assignment.id} is due.`
        );
      }

      
      if (
        typeof assignment.points_possible !== "number" ||
        assignment.points_possible <= 0
      ) {
        console.log(
          `Invalid points_possible for assignment ${assignment.id}`
        );
        continue;
      } else {
        console.log(
          `Assignment ${assignment.id} has valid points.`
        );
      }

      let score = submissionData.submission.score;

      
      if (typeof score !== "number") {
        console.log(
          `Invalid score for learner ${learnerId}`
        );
        continue;
      } else {
        console.log(
          `Learner ${learnerId} score is valid.`
        );
      }

      const submittedDate = new Date(
        submissionData.submission.submitted_at
      );

      const dueDate = new Date(assignment.due_at);

      
      // LATE SUBMISSION CHECK
      

      if (submittedDate > dueDate) {
        score = applyLatePenalty(
          score,
          assignment.points_possible
        );

        console.log(
          `Late penalty applied to learner ${learnerId}`
        );
      } else {
        score = score;
      }

   
      // CREATE LEARNER OBJECT
      

      if (!learners[learnerId]) {
        learners[learnerId] = {
          id: learnerId,
          totalScore: 0,
          totalPoints: 0,
        };
      } else {
        learners[learnerId].totalScore += 0;
      }

      
      // CALCULATIONS
     

      const percentage =
        score / assignment.points_possible;

      learners[learnerId][assignmentId] = Number(
        percentage.toFixed(2)
      );

      learners[learnerId].totalScore += score;

      learners[learnerId].totalPoints +=
        assignment.points_possible;
    }

    
    // FINAL RESULTS
    

    const result = [];

    
    for (const learnerId in learners) {
      const learner = learners[learnerId];

      learner.avg = Number(
        (
          learner.totalScore /
          learner.totalPoints
        ).toFixed(2)
      );

      
      delete learner.totalScore;
      delete learner.totalPoints;

      result.push(learner);
    }

    return result;

  } catch (error) {

    console.error("ERROR:", error.message);

    return [];
  }
}



const result = getLearnerData(
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions
);

console.log("Final Result:");
console.log(result);