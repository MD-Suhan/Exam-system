// Example of loading classes from Firebase or static data
function loadClasses() {
  const classList = document.getElementById("class-list");
  
  // Example static data for classes
  classList.innerHTML = `
    <div class="class-card" onclick="selectClass(1)">
      <h3>Class 1</h3>
      <p>Details about Class 1</p>
    </div>
    <div class="class-card" onclick="selectClass(2)">
      <h3>Class 2</h3>
      <p>Details about Class 2</p>
    </div>
  `;
}

// Handle class selection
function selectClass(classId) {
  window.location.href = `subject.html?classId=${classId}`;
}

window.onload = loadClasses;  // Load classes when the page is loaded

// Admin Function: Manage Exams and Add Correct Answers
function manageClasses() {
  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = `
    <h3>Manage Classes</h3>
    <div id="class-list"></div>
    <button onclick="addClass()">Add New Class</button>
  `;
  // Render Classes from Firestore or Static Data
  loadClasses();
}

function addClass() {
  // Code to show a form for adding a new class (name, description, etc.)
  alert('Function to add class will be here.');
}

// Admin: Manage Exams
function manageExams(classId, subjectId) {
  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = `
    <h3>Manage Exam</h3>
    <div id="exam-list"></div>
    <button onclick="addExam(classId, subjectId)">Add New Exam</button>
  `;
  loadExams(classId, subjectId);
}

function addExam(classId, subjectId) {
  // Admin form to create new exam with questions and answers
  alert('Function to add exam will be here.');
}

// Admin: Load Classes (Static example)
function loadClasses() {
  const classList = document.getElementById("class-list");
  
  classList.innerHTML = `
    <div class="class-card" onclick="selectClass(1)">
      <h3>Class 1</h3>
      <p>Details about Class 1</p>
    </div>
    <div class="class-card" onclick="selectClass(2)">
      <h3>Class 2</h3>
      <p>Details about Class 2</p>
    </div>
  `;
}

function selectClass(classId) {
  // Redirect to Subject page with classId
  window.location.href = `subject.html?classId=${classId}`;
}
function addExam(classId, subjectId) {
  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = `
    <h3>Create Exam</h3>
    <form id="exam-form">
      <label for="exam-name">Exam Name</label>
      <input type="text" id="exam-name" required>

      <label for="question-1">Question 1</label>
      <input type="text" id="question-1" required>

      <label for="option-a">Option A</label>
      <input type="text" id="option-a" required>

      <label for="option-b">Option B</label>
      <input type="text" id="option-b" required>

      <label for="option-c">Option C</label>
      <input type="text" id="option-c" required>

      <label for="correct-answer">Correct Answer</label>
      <select id="correct-answer">
        <option value="A">Option A</option>
        <option value="B">Option B</option>
        <option value="C">Option C</option>
      </select>

      <button type="submit">Save Exam</button>
    </form>
  `;

  // Submit exam form
  document.getElementById('exam-form').onsubmit = function(e) {
    e.preventDefault();
    saveExam();
  };
}

function saveExam() {
  // Save exam data to Firebase or database
  const examName = document.getElementById('exam-name').value;
  const question1 = document.getElementById('question-1').value;
  const optionA = document.getElementById('option-a').value;
  const optionB = document.getElementById('option-b').value;
  const optionC = document.getElementById('option-c').value;
  const correctAnswer = document.getElementById('correct-answer').value;

  // Push this data to Firestore or Firebase Realtime Database
  console.log('Exam Saved:', { examName, question1, optionA, optionB, optionC, correctAnswer });

  alert('Exam saved successfully!');
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGKvZwlq_uCW_ZNdx_47prwPjEreHDRis",
  authDomain: "exam-63682.firebaseapp.com",
  projectId: "exam-63682",
  storageBucket: "exam-63682.firebasestorage.app",
  messagingSenderId: "1032951064522",
  appId: "1:1032951064522:web:fa49117b64b12870d51133",
  measurementId: "G-PR4ET8K0TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Now you can use Firebase features
const db = firebase.firestore();
const auth = firebase.auth();
// Fetch Classes
db.collection("Classes").get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const classData = doc.data();
    const classCard = `
      <div class="card">
        <img src="${classData.image}" alt="${classData.name}">
        <h3>${classData.name}</h3>
        <p>${classData.description}</p>
        <button onclick="goToSubjects('${doc.id}')">View Subjects</button>
      </div>
    `;
    document.getElementById('class-container').innerHTML += classCard;
  });
});

function goToSubjects(classId) {
  localStorage.setItem("selectedClassId", classId); // Store class ID
  window.location.href = "subject.html"; // Navigate to subject page
}
// Fetch Subjects
const classId = localStorage.getItem("selectedClassId");
db.collection("Subjects").where("classId", "==", classId).get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const subjectData = doc.data();
    const subjectCard = `
      <div class="card">
        <img src="${subjectData.image}" alt="${subjectData.name}">
        <h3>${subjectData.name}</h3>
        <p>${subjectData.description}</p>
        <button onclick="goToExams('${doc.id}')">View Exams</button>
      </div>
    `;
    document.getElementById('subject-container').innerHTML += subjectCard;
  });
});

function goToExams(subjectId) {
  localStorage.setItem("selectedSubjectId", subjectId); // Store subject ID
  window.location.href = "exam.html"; // Navigate to exam page
}
// Fetch Exams
const subjectId = localStorage.getItem("selectedSubjectId");
db.collection("Exams").where("subjectId", "==", subjectId).get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const examData = doc.data();
    const examCard = `
      <div class="card">
        <h3>${examData.name}</h3>
        <p>${examData.description}</p>
        <p>Total Questions: ${examData.questions.length}</p>
        <button onclick="startExam('${doc.id}')">Start Exam</button>
      </div>
    `;
    document.getElementById('exam-container').innerHTML += examCard;
  });
});
const examId = localStorage.getItem("selectedExamId");
db.collection("Exams").doc(examId).get().then((doc) => {
  const examData = doc.data();
  // Render the questions
  examData.questions.forEach((q, index) => {
    const questionHTML = `
      <div>
        <h4>Question ${index + 1}: ${q.question}</h4>
        ${q.options.map((option, i) => `
          <label>
            <input type="radio" name="question${index}" value="${option}">
            ${option}
          </label>
        `).join('')}
      </div>
    `;
    document.getElementById('question-container').innerHTML += questionHTML;
  });
});
document.getElementById("submit-exam").addEventListener("click", () => {
  const examId = localStorage.getItem("selectedExamId");

  db.collection("Exams").doc(examId).get().then((doc) => {
    const examData = doc.data();
    const questions = examData.questions;

    let correctAnswers = 0;
    let totalQuestions = questions.length;

    const studentAnswers = [];
    questions.forEach((q, index) => {
      const selectedOption = document.querySelector(
        `input[name="question${index}"]:checked`
      );
      if (selectedOption) {
        studentAnswers.push({
          question: q.question,
          selectedAnswer: selectedOption.value,
          correctAnswer: q.correctAnswer,
        });
        if (selectedOption.value === q.correctAnswer) {
          correctAnswers++;
        }
      } else {
        studentAnswers.push({
          question: q.question,
          selectedAnswer: null,
          correctAnswer: q.correctAnswer,
        });
      }
    });

    // Save the student's result
    db.collection("Responses").add({
      examId: examId,
      studentName: localStorage.getItem("studentName") || "Anonymous",
      correctAnswers: correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers,
      totalQuestions: totalQuestions,
      answers: studentAnswers,
      timestamp: firebase.firestore.Timestamp.now(),
    }).then(() => {
      // Save the score in localStorage and redirect
      localStorage.setItem("correctAnswers", correctAnswers);
      localStorage.setItem("totalQuestions", totalQuestions);
      window.location.href = "score.html";
    }).catch((error) => {
      console.error("Error saving responses:", error);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const correctAnswers = parseInt(localStorage.getItem("correctAnswers"), 10);
  const totalQuestions = parseInt(localStorage.getItem("totalQuestions"), 10);
  const wrongAnswers = totalQuestions - correctAnswers;

  document.getElementById("total-questions").textContent = totalQuestions;
  document.getElementById("correct-answers").textContent = correctAnswers;
  document.getElementById("wrong-answers").textContent = wrongAnswers;
  document.getElementById("score").textContent = `${correctAnswers}/${totalQuestions}`;
});

function goBack() {
  window.location.href = "index.html"; // Redirect to class page
}
document.getElementById("add-class").addEventListener("click", () => {
  const className = document.getElementById("class-name").value;
  const classImage = document.getElementById("class-image").value;
  const classDescription = document.getElementById("class-description").value;

  db.collection("Classes").add({
    name: className,
    image: classImage,
    description: classDescription,
  }).then(() => {
    alert("Class added successfully!");
    document.getElementById("class-name").value = "";
    document.getElementById("class-image").value = "";
    document.getElementById("class-description").value = "";
  }).catch((error) => {
    console.error("Error adding class:", error);
  });
});
