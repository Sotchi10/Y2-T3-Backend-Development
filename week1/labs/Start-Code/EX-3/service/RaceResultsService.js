
import { Duration } from "../model/Duration.js";
import { RaceResult } from "../model/RaceResult.js";
import fs from "fs/promises";

/**
 * This class handle the race results management system.
 */
export class RaceResultsService {
  /**
   * The list of race results.
   * @type {Array<RaceResult>}
   * @private
   */
  _raceResults = [];

  get raceResults() {
    return this._raceResults;
  }

  /**
   * Adds a new race result to the race list.
   * @param {RaceResult} result - The prace result.
   */
  addRaceResult(result) {
    // TODO
    this._raceResults.push(result);
  }

  /**
   * Saves the race results list to a JSON file.
   * @param {string} filePath - The path to the file where data should be saved.
   */
  async saveToFile(filePath) {
    // TODO
    const data = JSON.stringify(
      this._raceResults.map(r => ({
        participant_id: r.participantId,
        sport: r.sport,
        time: { _totalSeconds: r.time._totalSeconds }
      })),
      null,
      2
    );

    await fs.writeFile(filePath, data);
  }

  /**
   * Loads the race results list from a JSON file.
   * @param {string} filePath - The path to the file to load data from.
   * @returns {boolean} True if loading was successful, false otherwise.
   */
  async loadFromFile(filePath) {
    // TODO
    try {
      const data = await fs.readFile(filePath, "utf8");
      const parsed = JSON.parse(data);

      this._raceResults = parsed.map(r =>
        new RaceResult(
          r.participant_id,
          r.sport,
          new Duration(r.time._totalSeconds)
        )
      );

      return true;
    } catch (err) {
      console.error("Load error:", err.message);
      return false;
    }
  }


  /**
   * Retrieves the race time for a given participant and sport.
   * @param {string} participantId - Participant ID.
   * @param {string} sport - Sport name.
   * @returns {Duration|null} Duration if found, else null.
   */
  getTimeForParticipant(participantId, sport) {
    // TODO
    const result = this._raceResults.find(
      r => (r.participantId === participantId && r.sport === sport)
    );

    return result ? result.time : null;
  }

  /**
   * Computes the total time for a given participant by summing their race times.
   * @param {string} participantId - The ID of the participant.
   * @returns {Duration|null} The total Duration object if found, otherwise null.
   */
  getTotalTimeForParticipant(participantId) {
    // TODO
    const results = this._raceResults.filter(
      r => r.participantId === participantId
    );

    if (results.length === 0) return null;

    let total = new Duration(0);
    for (const r of results) {
      total = total.plus(r.time);
    }

    return total;
  }

}
