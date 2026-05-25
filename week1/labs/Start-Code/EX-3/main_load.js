import { RaceResultsService } from "./service/RaceResultsService.js";

async function main() {
    // Initialize RaceResults
    const raceResultService = new RaceResultsService();

    // Load results from file
    await raceResultService.loadFromFile("./EX-3/data/raceScores.json");

    // Print the resuts
    console.log(raceResultService.raceResults);
}
main();
