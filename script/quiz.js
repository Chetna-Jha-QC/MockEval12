const apiBaseUrl = "https://florentine-tortoiseshell-condorraptor.glitch.me/users";//deployed link
const questionsContainer = document.getElementById("questionContainer");

//add question form
document.getElementById("addQuestionForm").addEventListener("submit", async (e) =>{
    e.preventDefault();

    const questionData = {
        statement: document.getElementById("question").value,
        options: {
            A : document.getElementById("optionA").value,
            B : document.getElementById("optionB").value,
            C : document.getElementById("optionC").value,
            D : document.getElementById("optionD").value,
        },
        correctOption: document.getElementById("correctOption").value,
        reviewStatus: false,
    };

    try{
        await fetch(`${apiBaseUrl}/questions`,{
            method: "POST",
            headers: {"Content-Type":"application/json"
                },
            body: JSON.stringify(questionData),
        });

        alert("Question Created");
        fetchAndRenderQuestions();
    } catch (error) {
        console.error("Error adding question:", error);
    }
});

// fetch and display the questions
async function fetchAndRenderQuestions() {
    try{
        const response = await fetch(`${apiBaseUrl}/questions`);
        const question = await response.json();

        questionsContainer.innerHTML = ""; //clear the container

        question.forEach((question) => {
            const questionCard = document.createElement("div");
            questionCard.className = "question-card";
            questionCard.style.borderColor = question.reviewStatus ? "voilet" : "blue";

            questionCard.innerHTML =`
            <p><strong>Q:</strong> ${question.statement}</p>
            <ul>
             <li>A: ${question.options.A}</li>
             <li>B: ${question.options.B}</li>
             <li>C: ${question.options.C}</li>
             <li>D: ${question.options.D}</li>
             </ul>
             <button class ="review-btn" data-id="${question.id}">Review</button>
             <button class ="delete-btn" data-id="${question.id}">Delete</button>
             `;

            questionsContainer.appendChild(questionCard);
        });

        addEventListener();
    } catch (error){
        console.error("Error fetching questions:", error);
    }
}

//adding event listner to btns

function addEventListener(){
    document.querySelectorAll(".review-btn").forEach((button) =>
    button.addEventListener("click", async (e) => {
        const questionID = e.target.getAtteibute("data-id");

        if(confirm("Are you sure to review?")) {
            try {
                await fetch(`${apiBaseUrl}/questions/${questionID}`, {
                    method: "PATCH",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({reviewStatus: true}),
                });
                fetchAndRenderQuestions();
            } catch (error) {
                console.error("Error",error);
            }
        }
    })
);

document.querySelectorAll(".delete-btn").forEach((button) =>
    button.addEventListener("click", async (e) => {
        const questionID = e.target.getAtteibute("data-id");

        if(confirm("Are you sure to delete?")) {
            try {
                await fetch(`${apiBaseUrl}/questions/${questionID}`, {
                    method: "DELETE",
                });
                fetchAndRenderQuestions();
            } catch (error) {
                console.error("Error in deleteing",error);
            }
        }
    })
);

}

// initial fetch and render
fetchAndRenderQuestions();