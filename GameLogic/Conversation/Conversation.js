import staticConversation from "./staticConversation";
import storyLogic from "../StoryLogic";
import storyTempletes from "../PresetsAndTemplates/StoryTempletes";
import conversationTempletes from "../PresetsAndTemplates/ConversationTempletes";
import beginingTemplete from "../PresetsAndTemplates/ConversationEventTempletes/Begining";
import loseTemplete from "../PresetsAndTemplates/ConversationEventTempletes/Lose";

function Conversation(){
    //Initilization of static info
    staticConversation.diaLogChangeWork = [];
    staticConversation.exitDialogWork = [];

    //Decide conversation templleate here
    var conversationScenario = 0;

    //Event hadeling
    if(staticConversation.isBeginging()){
        staticConversation.procBegining(false);
        staticConversation.currentTemplete = beginingTemplete(staticConversation.runExtraDialogChangeWork, staticConversation.runExitDialogWork);
    }
    else if(staticConversation.hasLost()){
        staticConversation.currentTemplete = loseTemplete(staticConversation.runExtraDialogChangeWork, staticConversation.runExitDialogWork);
    }
    else if(staticConversation.hasWon()){
        //Continue like normal. This is because wining will not take prioity over a normal end level conversation but will apear after the end level and conversation all remaining sotry elements are done.
        //Note the win templete is set into place after discovery that the player is on the last chapter
        //rather thanwin proc. Win prock is just in charge of seting stats and redirecting player properly
        staticConversation.currentTemplete = conversationTempletes[conversationScenario](staticConversation.runExtraDialogChangeWork, staticConversation.runExitDialogWork);
    }
    else{
        staticConversation.currentTemplete = conversationTempletes[conversationScenario](staticConversation.runExtraDialogChangeWork, staticConversation.runExitDialogWork);
    }

    staticConversation.currentConversation = staticConversation.currentTemplete.conversation01;
    staticConversation.index = 0;
    staticConversation.currentDialog = staticConversation.currentConversation[staticConversation.index].dialog;

    this.getCurrentTemplete = () => {
        return staticConversation.currentTemplete;
    }
    this.getCurrentConversation = () => {
        return staticConversation.currentConversation;
    }
    this.getCurrentDialogText = () => {
        return staticConversation.currentConversation[staticConversation.index].dialog.getDialog();
    }
    this.getCurrentResponses = () => {
        return staticConversation.currentConversation[staticConversation.index].responses;
    }
    this.getCurrentDialogFirstName = () => {
        return staticConversation.currentConversation[staticConversation.index].dialog.getCharacter().name.getFirst();
    }
    this.getCurrentDialog = () => {
        return staticConversation.currentConversation[staticConversation.index].dialog;
    }

    this.onDialogChange = (work) => {
        staticConversation.diaLogChangeWork.push(work);
    }
    this.onExitDialog = (work) => {
        staticConversation.exitDialogWork.push(work);
    }
}

export default Conversation