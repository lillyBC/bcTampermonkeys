// ==UserScript==
// @name         Custom Actions and spells
// @namespace    http://tampermonkey.net/
// @version      1.2
// @author       Lilly
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/
// @match        *://www.bondageprojects.com/college/*/BondageClub/
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    //changing various parts of the game's code by replacing entire functions with altered ones
    function main() {

        ChatRoomActionMessage = function(msg, target = undefined) {
            if(msg.indexOf('/bind') == 0){
                //targetting do not change
                var who = parseInt(msg.substring(msg.indexOf(" ")))
                var char = ChatRoomCharacter[who-1]

                //actual effect of the spell
                InventoryWear(char, "Pillory", "ItemArms")
                InventoryWear(char, "WoodenCuffs","ItemFeet")
                ChatRoomCharacterUpdate(char);
                //the custom message to send
                msg = Player.Name + ' casts a spell, binding '+ char.Name+ ' in restraints'
            } else if(msg.indexOf('/web')==0){
                var who = parseInt(msg.substring(msg.indexOf(" ")))
                var char = ChatRoomCharacter[who-1]

                InventoryWear(char, "Web", "ItemArms")
                ChatRoomCharacterUpdate(char);
                msg = Player.Name + ' casts a spell, binding '+ char.Name+ ' in web'
            } else if(msg.indexOf('/sleep')==0){
                var who = parseInt(msg.substring(msg.indexOf(" ")))
                var char = ChatRoomCharacter[who-1]
                InventoryWear(char,"RegularSleepingPill",'ItemMouth')
                ChatRoomCharacterUpdate(char)
            }


            if (msg != "")
                ServerSend("ChatRoomChat",
                           { Content: "Beep", Type: "Action", Dictionary: [{ Tag: "Beep", Text: "msg" },
                                                                           { Tag: "Biep", Text: "msg" }, { Tag: "Sonner", Text: "msg" },
                                                                           { Tag: "msg", Text: msg }], Target: target });
        }


        ChatRoomSendChat =  function() {

            // If there's a message to send
            var msg = ElementValue("InputChat").trim()
            if (msg != "") {

                // Keeps the chat log in memory so it can be accessed with pageup/pagedown
                ChatRoomLastMessage.push(msg);
                ChatRoomLastMessageIndex = ChatRoomLastMessage.length;

                var m = msg.toLowerCase().trim();


                // Some custom functions like /dice or /coin are implemented for randomness
                if (m.indexOf("/dice") == 0) {

                    // The player can roll X dice of Y faces, using XdY.  If no size is specified, a 6 sided dice is assumed
                    if (/(^\d+)[dD](\d+$)/.test(msg.substring(5, 50).trim())) {
                        var Roll = /(^\d+)[dD](\d+$)/.exec((msg.substring(5, 50).trim()));
                        var DiceNumber = (!Roll) ? 1 : parseInt(Roll[1]);
                        var DiceSize = (!Roll) ? 6 : parseInt(Roll[2]);
                        if ((DiceNumber < 1) || (DiceNumber > 100)) DiceNumber = 1;
                    }
                    else if (/(^\d+$)/.test((msg.substring(5, 50).trim()))) {
                        var Roll = /(^\d+)/.exec((msg.substring(5, 50).trim()));
                        var DiceNumber = 1;
                        var DiceSize = (!Roll) ? 6 : parseInt(Roll[1]);
                    }
                    else DiceNumber = 0;

                    // If there's at least one dice to roll
                    if (DiceNumber > 0) {
                        if ((DiceSize < 2) || (DiceSize > 100)) DiceSize = 6;
                        var CurrentRoll = 0;
                        var Result = [];
                        var Total = 0;
                        while (CurrentRoll < DiceNumber) {
                            var Roll = Math.floor(Math.random() * DiceSize) + 1
                            Result.push(Roll);
                            Total += Roll;
                            CurrentRoll++;
                        }
                        msg = "ActionDice";
                        var Dictionary = [];
                        Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name });
                        Dictionary.push({ Tag: "DiceType", Text: DiceNumber.toString() + "D" + DiceSize.toString() });
                        if (DiceNumber > 1) {
                            Result.sort((a, b) => a - b);
                            Dictionary.push({ Tag: "DiceResult", Text: Result.toString() + " = " + Total.toString() });
                        }
                        else if (DiceNumber == 1) Dictionary.push({ Tag: "DiceResult", Text: Total.toString() });
                        if (msg != "") ServerSend("ChatRoomChat", { Content: msg, Type: "Action", Dictionary: Dictionary });
                    }

                } else if (m.indexOf("/coin") == 0) {

                    // The player can flip a coin, heads or tails are 50/50
                    msg = "ActionCoin";
                    var Heads = (Math.random() >= 0.5);
                    var Dictionary = [];
                    Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name });
                    Dictionary.push({ Tag: "CoinResult", TextToLookUp: Heads ? "Heads" : "Tails" });
                    if (msg != "") ServerSend("ChatRoomChat", { Content: msg, Type: "Action", Dictionary: Dictionary });

                } else if ((m.indexOf("*") == 0) || (m.indexOf("/me ") == 0) || (m.indexOf("/action ") == 0)) {


                    // The player can emote an action using * or /me (for those IRC or Skype users), it doesn't garble
                    // The command /action or ** does not add the player's name to it
                    msg = msg.replace("*", "");
                    msg = msg.replace(/\/me /g, "");
                    msg = msg.replace(/\/action /g, "*");
                    if (msg != "") ServerSend("ChatRoomChat", { Content: msg, Type: "Emote" });

                }
                else if (m.indexOf("/help") == 0) ServerSend("ChatRoomChat", { Content: "ChatRoomHelp", Type: "Action", Target: Player.MemberNumber});
                else if (m.indexOf("/safeword") == 0) ChatRoomSafewordChatCommand();
                else if (m.indexOf("/friendlistadd ") == 0) ChatRoomListManipulation(Player.FriendList, null, msg);
                else if (m.indexOf("/friendlistremove ") == 0) ChatRoomListManipulation(null, Player.FriendList, msg);
                else if (m.indexOf("/ghostadd ") == 0) { ChatRoomListManipulation(Player.GhostList, null, msg); ChatRoomListManipulation(Player.BlackList, Player.WhiteList, msg); }
                else if (m.indexOf("/do") == 0) {ChatRoomActionMessage(msg.substring(msg.indexOf(" ")).trim());console.log('action attempt')}
                else if (m.indexOf("/ghostremove ") == 0) { ChatRoomListManipulation(null, Player.GhostList, msg); ChatRoomListManipulation(null, Player.BlackList, msg); }
                else if (m.indexOf("/whitelistadd ") == 0) ChatRoomListManipulation(Player.WhiteList, Player.BlackList, msg);
                else if (m.indexOf("/whitelistremove ") == 0) ChatRoomListManipulation(null, Player.WhiteList, msg);
                else if (m.indexOf("/blacklistadd ") == 0) ChatRoomListManipulation(Player.BlackList, Player.WhiteList, msg);
                else if (m.indexOf("/blacklistremove ") == 0) ChatRoomListManipulation(null, Player.BlackList, msg);
                else if (m.indexOf("/ban ") == 0) ChatRoomAdminChatAction("Ban", msg);
                else if (m.indexOf("/unban ") == 0) ChatRoomAdminChatAction("Unban", msg);
                else if (m.indexOf("/kick ") == 0) ChatRoomAdminChatAction("Kick", msg);
                else if (m.indexOf("/promote ") == 0) ChatRoomAdminChatAction("Promote", msg);
                else if (m.indexOf("/demote ") == 0) ChatRoomAdminChatAction("Demote", msg);
                else if (m.indexOf("/afk") == 0) CharacterSetFacialExpression(Player, "Emoticon", "Afk");
                else if (msg != "" && !((ChatRoomTargetMemberNumber != null || m.indexOf("(") >= 0) && Player.ImmersionSettings && Player.ImmersionSettings.BlockGaggedOOC && !Player.CanTalk())) {
                    if (ChatRoomTargetMemberNumber == null) {
                        // Regular chat
                        ServerSend("ChatRoomChat", { Content: msg, Type: "Chat" });
                    } else {
                        // The whispers get sent to the server and shown on the client directly
                        ServerSend("ChatRoomChat", { Content: msg, Type: "Whisper", Target: ChatRoomTargetMemberNumber });
                        var TargetName = "";
                        for (let C = 0; C < ChatRoomCharacter.length; C++)
                            if (ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber)
                                TargetName = ChatRoomCharacter[C].Name;

                        var div = document.createElement("div");
                        div.setAttribute('class', 'ChatMessage ChatMessageWhisper');
                        div.setAttribute('data-time', ChatRoomCurrentTime());
                        div.setAttribute('data-sender', Player.MemberNumber.toString());
                        div.innerHTML = TextGet("WhisperTo") + " " + TargetName + ": " + msg;

                        var Refocus = document.activeElement.id == "InputChat";
                        var ShouldScrollDown = ElementIsScrolledToEnd("TextAreaChatLog");
                        if (document.getElementById("TextAreaChatLog") != null) {
                            document.getElementById("TextAreaChatLog").appendChild(div);
                            if (ShouldScrollDown) ElementScrollToEnd("TextAreaChatLog");
                            if (Refocus) ElementFocus("InputChat");
                        }
                    }
                }	else {
                    // Throw an error message
                    ChatRoomMessage({ Content: "ChatRoomBlockGaggedOOC", Type: "Action", Sender: Player.MemberNumber });
                }
                // Clears the chat text message
                ElementValue("InputChat", "");

            }

        }

        //---------------------------------------------------------------------------------------------------------------------------------------------
        console.log("custom commands and spells loaded~~")
    }

    //injecting the code in a <script> element into the website DOM
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+ main +')();'));
    document.body.appendChild(script);

})();
