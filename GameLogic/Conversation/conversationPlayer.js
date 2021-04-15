import Emotion from './Emotion';
import Dialog from './Dialog';
import mStats from '../ManageStats/ManageStats';
import Characters from '../ManageStats/Characters';

var Thomas = new Characters();
//mStats.setCharacterName(Thomas, {first: "Thomas", last: "Eugene"});

let player = {
    updatePlayer: ({dialog, responses} = {}) => {
        player.setDialog(dialog);
        player.setResponses(responses);
    },
    setDialog: (dialog) => {
        player.diaLogObj = dialog;
        player.name = getConversationNameFromDialog(dialog);
        player.diaLog = dialog.getDialog();
    },
    setResponses: (responses) => {
        player.responses = responses;
    },
    diaLogObj: new Dialog(Thomas, "Keep onversation on track"),
    name: 'Thomas Eugene',
    dialog: 'How are you. Something must have gone wrong for you to see this',
    responses: [{
        title: 'Next',
        onPress: () => {
            //Do work
        }
    }],
    emotion: new Emotion('neutral'),
    getName: () => {
        return player.dialog;
    },
    test: 'test val',
    getDialog: () => {
        return player.test;
    },
    getResponses: () => {
        return player.responses;
    }
}

function getConversationNameFromDialog(dialog){
    return dialog.getCharacter().name.getLast().length > 0 ? dialog.getCharacter().name.get() : dialog.getCharacter().name.getFirst();
}

export default player;