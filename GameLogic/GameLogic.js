//Wraps upp all the gamelogic files into a single object
import GameDriverObjet from "./GameDriver";
import manageStats from "./ManageStats/ManageStats";
import staticConversation from "./Conversation/staticConversation";
import storyLogic from "./StoryLogic";

let GameLogic = {
    GameDriver: GameDriverObjet,
    manageStats: manageStats,
    staticConversation: staticConversation,
    storyLogic: storyLogic
}

export default GameLogic;