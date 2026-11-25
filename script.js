
const form = document.getElementById("ideaForm");
const result = document.getElementById("result");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("ideaName").value.trim();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value.trim();
    const problem = document.getElementById("problem").value.trim();
    const audience = document.getElementById("audience").value.trim();
    const investment = document.getElementById("investment").value;

    // Calculate preliminary evaluation scores
    const problemScore = Math.min(100, 30 + problem.length);
    const ideaScore = Math.min(100, 30 + description.length);
    const marketScore = Math.min(100, 30 + audience.length * 2);

    const totalScore = Math.round(
        (problemScore + ideaScore + marketScore) / 3
    );

    // Generate suggestions
    const suggestions = [];

    if (problem.length < 50) {
        suggestions.push("Explain the problem in more detail.");
    }

    if (description.length < 100) {
        suggestions.push("Add more details about your product or service.");
    }

    if (audience.length < 15) {
        suggestions.push("Define your target audience more clearly.");
    }

    if (!description.toLowerCase().includes("solution")) {
        suggestions.push("Explain how your idea provides a solution.");
    }

    if (suggestions.length === 0) {
        suggestions.push("Research your competitors and market demand.");
        suggestions.push("Prepare a business model and revenue strategy.");
    }

    suggestions.push("Talk to potential customers to collect feedback.");

    // Display results
    document.getElementById("resultName").textContent = name;

    document.getElementById("score").textContent = totalScore;

    document.getElementById("problemScore").textContent = problemScore;
    document.getElementById("ideaScore").textContent = ideaScore;
    document.getElementById("marketScore").textContent = marketScore;

    let verdict = "";

    if (totalScore >= 75) {
        verdict = "Promising Idea! 🚀";
    } else if (totalScore >= 50) {
        verdict = "Good Start! 💡";
    } else {
        verdict = "Needs More Development 📚";
    }

    document.getElementById("verdict").textContent = verdict;

    document.getElementById("resultDescription").textContent =
        "Your idea in the " + category +
        " category received an initial evaluation score of " +
        totalScore + "/100. Estimated investment: " + investment + ".";

    const suggestionList = document.getElementById("suggestions");
    suggestionList.innerHTML = "";

    suggestions.forEach(function(item) {
        const li = document.createElement("li");
        li.textContent = item;
        suggestionList.appendChild(li);
    });

    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

function resetForm() {
    form.reset();
    result.classList.add("hidden");

    document.getElementById("validator").scrollIntoView({
        behavior: "smooth"
    });
}
