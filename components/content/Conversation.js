import { useLinkProps } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import basic from "../../Styles/basics";
import conversation from '../../GameLogic/Conversation/conversation';

function Conversation(props){
    const [dialog, setDialog] = useState(null);

    useEffect(() => {
        conversation.awake();
        console.log(conversation.getPlayer());
        console.log('conversation.getPlayer().getDialog() = ' + conversation.getPlayer().getDialog());
        setDialog(conversation.getPlayer());
        //conversation = new CreateConversation();

        /*setDialog(conversation.getCurrentDialog());
        conversation.onDialogChange((conversationDialog) => {
            setDialog(conversationDialog);
        });
        conversation.onExitDialog(() => {
            props.navigation.navigate("Next Shift Select");
        });
        staticConversation.setOnWin(() => {
            props.navigation.navigate("Win screen");
        });
        staticConversation.setOnLose(() => {
            props.navigation.navigate("Lose screen");
        });*/

    }, []);

    return(
        <View
         style={basic.testContainer}
        >
            <Text>Welcome to the conversation menu</Text>
            <Text>{dialog ? dialog.getName() : "Subject01" }</Text>
            <Text>{dialog ? dialog.getDialog() : "Message" }</Text>
            {dialog 
             ?  
             dialog.getResponses().map((response, i) => <Button 
                                                                      key={i}
                                                                      title={response.title}
                                                                      onPress={() => {
                                                                          response.onPress();
                                                                      }}
                                                                     />) 
             : 
             <Text>"responses"</Text>}
        </View>
    );

    function getDialogName(){
        return dialog.getCharacter().name.getLast().length > 0 ? dialog.getCharacter().name.get() : dialog.getCharacter().name.getFirst();
    }
}

export default Conversation;