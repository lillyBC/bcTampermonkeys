// ==UserScript==
// @name         Custom Actions and spells
// @namespace    http://tampermonkey.net/
// @version      1.7
// @author       Lilly
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/
// @match        *://www.bondageprojects.com/college/*/BondageClub/
// @match        https://www.bondageprojects.com/college/*/*/
// @match        https://www.bondageprojects.elementfx.com/*/*/
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    //changing various parts of the game's code by replacing entire functions with altered ones
    function main() {

        /**
 * d20.js
 *
 * Javascript library for rolling dice. Supports strings written in a dice-rolling syntax, eg. "d20", "4d6", "1d8+1".
 *
 * @author Michael Enger <mike@thelonelycoder.com>
 * @licence MIT
 */
        var d20 = {

            /**
     * Roll a number of dice and return the result.
     *
     * @param dice Type of dice to roll, can be represented in various formats:
     *               - a number (6, 12, 42)
     *               - dice syntax (d20, 4d6, 2d8+2)
     * @param verbose Whether or not all dice rolls should be returned as an array
     * @return Number|Array
     */
            roll: function(dice, verbose) {
                var result = d20.verboseRoll(dice),
                    num = 0;

                if(verbose) {
                    return result;
                } else {
                    for (var i in result) {
                        num += result[i];
                    }

                    return num;
                }
            },

            /**
     * Roll a number of dice and return the result as an array.
     *
     * @param dice Type of dice to roll, can be represented in various formats:
     *               - a number (6, 12, 42)
     *               - dice syntax (d20, 4d6, 2d8+2)
     * @return Array
     */
            verboseRoll: function(dice) {
                var amount = 1,
                    mod = 0,
                    results = [],
                    match,
                    num,
                    modifiers;

                if (!dice) {
                    throw new Error('Missing dice parameter.');
                }

                if (typeof dice == 'string') {
                    match = dice.match(/^\s*(\d+)?\s*d\s*(\d+)\s*(.*?)\s*$/);
                    if (match) {
                        if (match[1]) {
                            amount = parseInt(match[1]);
                        }
                        if (match[2]) {
                            dice = parseInt(match[2]);
                        }
                        if (match[3]) {
                            modifiers = match[3].match(/([+-]\s*\d+)/g);
                            for (var i = 0; i < modifiers.length; i++) {
                                mod += parseInt(modifiers[i].replace(/\s/g, ''));
                            }
                        }
                    } else {
                        parseInt(dice);
                    }
                }

                if (isNaN(dice)) {
                    return [];
                }

                for (var i = 0; i < amount; i++) {
                    /* We dont want to ruin verbose, so we dont skip the for loop */
                    if(dice !== 0){
                        num = Math.floor(Math.random() * dice + 1);
                    }else{
                        num = 0;
                    }
                    results.push(num);
                }

                results = results.sort(function(a, b) {
                    return a - b;
                });
                if (mod != 0) {
                    results.push(mod);
                }

                return results;
            }
        };

        if (typeof window != 'undefined') {
            window.d20 = d20;
        } else if (typeof exports != 'undefined') {
            for (var k in d20) {
                exports[k] = d20[k];
            }
        }
        // end of the borrowed dice library

        ChatroomDnDDice = function(msg){
            result = d20.roll(msg)

            msg = Player.Name + ' rolls '+ msg +'. The result is: '+ result + '.'
            ServerSend("ChatRoomChat",
                       { Content: "Beep", Type: "Action", Dictionary: [{ Tag: "Beep", Text: "msg" },
                                                                       { Tag: "Biep", Text: "msg" }, { Tag: "Sonner", Text: "msg" },
                                                                       { Tag: "msg", Text: msg }], Target: undefined });
        }


        UsePasswordLock = function(char,target,locker,password,hint){
            InventoryLock(char, target, "PasswordPadlock",locker)
            InventoryGet(char, target).Property.Password = password
            InventoryGet(char, target).Property.Hint = hint
            InventoryGet(char, target).Property.LockSet = true
        }


        ChatRoomActionMessage = function(msg, target = undefined) {
            // commands defined here are used with /do /command [args]
            // example /do /bind 1
            // binds the first player in the room
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
                // doesn't seem to work right. need testing
                var who = parseInt(msg.substring(msg.indexOf(" ")))
                var char = ChatRoomCharacter[who-1]
                InventoryWear(char,"RegularSleepingPill",'ItemMouth')
                ChatRoomCharacterUpdate(char)
                msg =  Player.Name + ' feeds '+ char.Name+ ' a sleeping pill'
            } else if(msg.indexOf('gagoff')==0){
                // if used together with gagspeak code, these work as a toggle
                window.SpeechGarble = OldSpeechGarble
                msg = ''
            } else if(msg.indexOf('gagon')==0){
                window.SpeechGarble = NewSpeechGarble
                msg = ''
            } else if(msg.indexOf('/invisible') == 0){
                var who = parseInt(msg.substring(msg.indexOf(" ")))
                var char = ChatRoomCharacter[who-1]

                InventoryWear(char, "FuturisticHeels", "ItemBoots");
                item = InventoryGet(char, "ItemBoots");
                item.Property = {
                    Type: "Heel",
                    Hide: ["Activity", "Corset", "Blush", "BodyLower", "BodyUpper", "Bra", "Cloth", "ClothLower", "ClothAccessory", "Emoticon", "Eyebrows", "Eyes", "Eyes2", "Fluids", "Glasses", "Gloves", "HairAccessory1", "HairAccessory2", "HairAccessory3", "HairBack", "HairFront", "HairBack", "Hands", "Hat", "Head", "ItemAddon", "ItemBreast", "ItemButt", "ItemDevices", "ItemEars", "ItemArms", "ItemFeet", "ItemHands", "ItemHead", "ItemHood", "ItemHoodAddon", "ItemLegs", "ItemMisc", "ItemMouth", "ItemMouth2", "ItemMouth3", "ItemNeck", "ItemNeckAccessories", "ItemNeckRestraints", "ItemNipples", "ItemNipplesPiercings", "ItemNose", "ItemPelvis", "ItemTorso", "ItemVulva", "ItemVulvaPiercings", "Mask", "Mouth", "Necklace", "Nipples", "Panties", "Pussy", "Shoes", "Socks", "Suit", "SuitLower", "TailStraps", "Wings"]
                };
                item.Color = ['#000','#000','#000']
                ChatRoomCharacterUpdate(char);
                msg = ''
            } else if(msg.indexOf('/sister')==0){
                var who = parseInt(msg.substring(msg.indexOf(" ")))
                var char = ChatRoomCharacter[who-1]

                InventoryWear(char,'CustomCollarTag','ItemNeckAccessories')
                item = InventoryGet(char, "ItemNeckAccessories");
                item.Color = ['#515151','#FFFFFF']
                item.Property = {Text:'SILENCE'}
                InventoryLock(char, "ItemNeckAccessories", "PasswordPadlock",35758)
                UsePasswordLock(char,'ItemNeckAccessories',35758,'SHHHHHHH','Vow of Silence')

                InventoryWear(char,"ClothStuffing",'ItemMouth')
                item = InventoryGet(char, "ItemMouth")
                item.Color = ["#FFFFFF"]

                InventoryWear(char,"ClothGag",'ItemMouth2')
                item = InventoryGet(char, "ItemMouth2")
                item.Color = "#B0B0B0"
                item.Property = {
                    Type: "OTM",
                    Effect: ["GagEasy"]
                }


                InventoryWear(char,'MuzzleGag','ItemMouth3')
                item = InventoryGet(char, "ItemMouth3")
                item.Color = ["#1A1A1A", "#1A1A1A"]
                InventoryLock(char, "ItemMouth3", "PasswordPadlock",35758)
                UsePasswordLock(char,'ItemMouth3',35758,'SHHHHHHH','Vow of Silence')
                ChatRoomCharacterUpdate(char);
                msg = Player.Name+' adorns the gags of the sisterhood'
            }

            if (msg != "")
                ServerSend("ChatRoomChat",
                           { Content: "Beep", Type: "Action", Dictionary: [{ Tag: "Beep", Text: "msg" },
                                                                           { Tag: "Biep", Text: "msg" }, { Tag: "Sonner", Text: "msg" },
                                                                           { Tag: "msg", Text: msg }], Target: target });
        }


        ChatRoomFaceChange = function(msg){
            if(msg.indexOf('smile')==0){
                // facial expression
                InventoryRemove(Player, "Blush")
                InventoryRemove(Player, "Fluids")
                CharacterSetFacialExpression(Player, "Mouth", "Smirk")
                CharacterSetFacialExpression(Player, "Eyes", null)
                CharacterSetFacialExpression(Player, "Eyebrows", "Lowered")
                CharacterRefresh(Player)
                ChatRoomCharacterUpdate(Player)
            } else if(msg.indexOf('evil')==0){
                InventoryRemove(Player, "Blush")
                InventoryRemove(Player, "Fluids")
                CharacterSetFacialExpression(Player, "Mouth", "Smirk")
                CharacterSetFacialExpression(Player, "Eyes", null)
                CharacterSetFacialExpression(Player, "Eyebrows", "Angry")
                CharacterRefresh(Player)
                ChatRoomCharacterUpdate(Player)
            } else if(msg.indexOf('scared')==0){
                InventoryRemove(Player, "Blush")
                InventoryRemove(Player, "Fluids")
                CharacterSetFacialExpression(Player, "Mouth", null)
                CharacterSetFacialExpression(Player, "Eyes", 'Scared')
                CharacterSetFacialExpression(Player, "Eyebrows", "Soft")
                CharacterRefresh(Player)
                ChatRoomCharacterUpdate(Player)
            } else if(msg.indexOf('blush')==0){
                var blush = parseInt(msg.substring(msg.indexOf(" ")))
                if((blush != "")){
                    if(blush > 0){
                        if(blush == 1){
                            InventoryRemove(Player, "Blush")
                        } else if(blush == 2){
                            CharacterSetFacialExpression(Player, "Blush", "Low")
                        } else if(blush == 3){
                            CharacterSetFacialExpression(Player, "Blush", "Medium")
                        } else if(blush == 4){
                            CharacterSetFacialExpression(Player, "Blush", "High")
                        } else if(blush == 5){
                            CharacterSetFacialExpression(Player, "Blush", "VeryHigh")
                        } else if(blush == 6){
                            CharacterSetFacialExpression(Player, "Blush", "Extreme")
                        } else if(blush == 7){
                            CharacterSetFacialExpression(Player, "Blush", "ShortBreath")
                        }
                    }
                }
                CharacterRefresh(Player)
                ChatRoomCharacterUpdate(Player)
            }
        }

        ChatRoomWardrobeChange = function(msg) {
            match = -1
            if(msg.indexOf('glassup')==0|| msg.indexOf('gup')==0){
                InventoryWear(Player,"Glasses1","Glasses")
                item = InventoryGet(Player, "Glasses")
                item.Color = ["#C09670"]
                ChatRoomCharacterUpdate(Player)
            } else if(msg.indexOf('glassdown')==0 || msg.indexOf('gdown')==0){
                InventoryWear(Player,"Glasses2","Glasses")
                item = InventoryGet(Player, "Glasses")
                item.Color = ["#C09670"]
                ChatRoomCharacterUpdate(Player)
            }  else if(msg.indexOf('glassoff')==0|| msg.indexOf('goff')==0){
                InventoryRemove(Player,'Glasses')
                ChatRoomCharacterUpdate(Player)
            }
            Player.WardrobeCharacterNames.forEach(function(name,index){
                if(name.indexOf(msg) == 0){
                    console.log(index)
                    match = index
                }
            })
            if(match != -1){
                WardrobeFastLoad(Player,match)
                ChatRoomCharacterUpdate(Player)
            }
        }

        ChatRoomEnergyDrink = function(){
            LogAdd("ModifierDuration", "SkillModifier", CurrentTime + 3600000); // affects lasts 1 hour
            LogAdd("ModifierLevel", "SkillModifier", 5)
        }

        OriginalChatroomSendChat = ChatRoomSendChat
        ChatRoomSendChat = function(){
            var msg = ElementValue("InputChat").trim()
            var m = msg.toLowerCase().trim();
            sentToOriginal = false

            if (m.indexOf("/do") == 0) {ChatRoomActionMessage(msg.substring(msg.indexOf(" ")).trim());console.log('action attempt')}
            else if (m.indexOf("/face") == 0) {ChatRoomFaceChange(msg.substring(msg.indexOf(" ")).trim());console.log('expression change')}
            else if (m.indexOf("/f") == 0) {ChatRoomFaceChange(msg.substring(msg.indexOf(" ")).trim());console.log('expression change')}
            else if (m.indexOf("/clothes") == 0) {ChatRoomWardrobeChange(msg.substring(msg.indexOf(" ")).trim());console.log('cloth change')}
            else if (m.indexOf("/c") == 0) {ChatRoomWardrobeChange(msg.substring(msg.indexOf(" ")).trim());console.log('cloth change')}
            else if (m.indexOf("/save") == 0) {saveClothes(msg.substring(msg.indexOf(" ")).trim());console.log('local save')}
            else if (m.indexOf("/load") == 0) {loadClothes(msg.substring(msg.indexOf(" ")).trim());console.log('local load')}
            else if (m.indexOf("/list") == 0) {listClothes();console.log('list clothes')}
            else if (m.indexOf("/delete") == 0) {deleteClothes(msg.substring(msg.indexOf(" ")).trim());console.log('list clothes')}
            else if (m.indexOf("/dndice") == 0) {ChatroomDnDDice(msg.substring(msg.indexOf(" ")).trim());console.log('dice roll')}
            else{
                sentToOriginal = true
                OriginalChatroomSendChat()
            }

            if(!sentToOriginal){
                ChatRoomLastMessage.push(msg);
                ChatRoomLastMessageIndex = ChatRoomLastMessage.length;
                ElementValue("InputChat", "");
            }
        }

        //---------------------------------------------------------------------------------------------------------------------------------------------
        console.log("custom actions done")
    }

    //injecting the code in a <script> element into the website DOM
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+ main +')();'));
    document.body.appendChild(script);

})();
