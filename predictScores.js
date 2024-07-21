const { poisson } = require('mathjs');

// General function to simulate match outcomes and predict scorelines
function predictScores(team1, team2, lambdaTeam1, lambdaTeam2, numSimulations = 1000) {
    // Function to simulate goals scored by each team
    function simulateGoals(lambda, numSimulations) {
        const goals = [];
        for (let i = 0; i < numSimulations; i++) {
            goals.push(poisson(lambda));
        }
        return goals;
    }

    // Simulate goals scored by each team
    const team1Goals = simulateGoals(lambdaTeam1, numSimulations);
    const team2Goals = simulateGoals(lambdaTeam2, numSimulations);

    // Count the frequency of each scoreline
    const scorelines = {};
    for (let i = 0; i < numSimulations; i++) {
        const scoreline = `${team1Goals[i]}-${team2Goals[i]}`;
        if (scorelines[scoreline]) {
            scorelines[scoreline]++;
        } else {
            scorelines[scoreline] = 1;
        }
    }

    // Convert frequency to probability
    for (const scoreline in scorelines) {
        scorelines[scoreline] /= numSimulations;
    }

    // Sort scorelines by probability
    const sortedScorelines = Object.entries(scorelines).sort((a, b) => b[1] - a[1]);

    // Display the top 10 most probable scorelines
    console.log(`Top 10 Most Probable Scorelines for ${team1} vs ${team2}:`);
    sortedScorelines.slice(0, 10).forEach(([scoreline, probability]) => {
        console.log(`Scoreline ${scoreline}: ${(probability * 100).toFixed(2)}%`);
    });
}
