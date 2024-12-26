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

        if (Response.ok){
            alert("Question created successfully");
            fetchAndRenderQuestions();
        } else {
            console.error("faild", Response.statusText);
        }
    } catch (error){
        console.error("error", error);
    }
});