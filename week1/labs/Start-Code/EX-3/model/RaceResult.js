import { Duration } from "./Duration.js";

/**
 * This class handle a single race time for a given particicpant and sport type
 */
export class RaceResult {

     /**
     * Participant id.
     * @type {string}
     * @private
     */
     participantId

     /**
     * Sport type.
     * @type {string}
     * @private
     */
     sport

     /**
     * Duration.
     * @type {Duration}
     * @private
     */
     time

     /**
     * Create new RaceResult Object.
     * @param {string} - The participant id
     * @param {string} - Sport type
     * @param {Duration} [seconds=0] - sport Duration
     */
     constructor(id, type, seconds = 0) {
          this.participantId = id;
          this.sport = type;
          this.time = seconds;
     }
}