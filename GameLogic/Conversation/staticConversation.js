import storyLogic from "../StoryLogic";
import storyTempletes from "../PresetsAndTemplates/StoryTempletes";
import winTemplete from "../PresetsAndTemplates/ConversationEventTempletes/Win";
import mStats from "../ManageStats/ManageStats";

var staticConversation = {
    begining: false,
    lose: false,
    win: false,
    currentTemplete: {},
    currentConversation: {},
    //Note there is a diffrence between index and chapter
    index: 0,
    chapter: 0,

    currentConversation: {},
    dialogChangeWork: [],
    currentDialog: {},
    onWin: null,
    onLose: null,

    //Defining event lister exicutioners
    runExtraDialogChangeWork: () => {
        staticConversation.diaLogChangeWork.forEach((work) => {
            work(staticConversation.currentConversation[staticConversation.index].dialog);
        });
    },
    runExitDialogWork: () => {
        staticConversation.exitDialogWork.forEach((work) => {
            work();
        });
    },
    endConversationProcedure: (dialogChanged, exit) => {
        if(storyLogic.checkForUnhandledStory()){
            storyLogic.fillChapterQueAndChapter();
        }
        if(storyLogic.chaptersLeft()){
            staticConversation.index = 0;
            staticConversation.chapter = storyLogic.deQueChapter();

            //Check to see if conversation should be win gameScheen
            if(storyLogic.isLastChapter(staticConversation.chapter)){ 
                //WINING templete is set in place here!!!
                staticConversation.currentTemplete = winTemplete(dialogChanged, exit);
            }
            else{
                staticConversation.currentTemplete = storyTempletes[staticConversation.chapter](dialogChanged, exit);
            }
            staticConversation.currentConversation = staticConversation.currentTemplete.conversation01;
            dialogChanged();
        }
        else if(staticConversation.hasWon() && !mStats.hasAlreadyWon()){//Player has beaten the game 
            staticConversation.procWin(false);
            staticConversation.chapter = 0;
            staticConversation.runWin();
            !mStats.setAlreadyWon(true);
        }
        else if(staticConversation.hasLost() && !mStats.hasAlreadyWon()){
            staticConversation.procLose(false);
            staticConversation.chapter = 0;
            staticConversation.runLose();
        }
        else{
            exit();
        }
    },
    setOnWin: (work) => {
        staticConversation.onWin = work;
    },
    setOnLose: (work) => {
        staticConversation.onLose = work;
    },
    runWin: () => {
        if(staticConversation.onWin){
            staticConversation.onWin();
        }
    },
    runLose: () => {
        if(staticConversation.onLose){
            staticConversation.onLose();
        }
    },
    resetData: () => {
        staticConversation.begining = false;
        staticConversation.currentTemplete = {};
        staticConversation.currentConversation = {};
        staticConversation.index = 0;
        staticConversation.chapter = 0;
        staticConversation.currentConversation = {};
        staticConversation.currentDialog = {};
        staticConversation.onWin = null;
    },

    //Conversation events, fully impliment at leasure
    procBegining: (value) => {
        staticConversation.begining = value;
    },
    isBeginging: () => {
        return staticConversation.begining;
    },
    procLose: (value) => {
        staticConversation.lose = value;
    },
    hasLost: () => {
        return staticConversation.lose;
    },
    procWin: (value) => {
        staticConversation.win = value;
    },
    hasWon: () => {
        return staticConversation.win;
    }
}

export default staticConversation;