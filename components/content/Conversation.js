import { useLinkProps } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import CreateConversation from "../../GameLogic/Conversation/Conversation";
import basic from "../../Styles/basics";
import staticConversation from "../../GameLogic/Conversation/staticConversation";

var conversation;

function Conversation(props){
    const [dialog, setDialog] = useState(null);

    useEffect(() => {
        conversation = new CreateConversation();

        setDialog(conversation.getCurrentDialog());
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
        });

    }, []);

    return(
        <View
         style={basic.testContainer}
        >
            <Text>Welcome to the conversation menu</Text>
            <Text>{dialog ? getDialogName() : "Subject01" }</Text>
            <Text>{dialog ? dialog.getDialog() : "Message" }</Text>
            {dialog 
             ?  
             conversation.getCurrentResponses().map((response, i) => <Button 
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