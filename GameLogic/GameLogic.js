//Wraps upp all the gamelogic files into a single object
import GameDriverObjet from "./GameDriver";
import manageStats from "./ManageStats/ManageStats";
import storyLogic from "./StoryLogic";

let GameLogic = {
    GameDriver: GameDriverObjet,
    manageStats: manageStats,
    storyLogic: storyLogic
}

export default GameLogic;