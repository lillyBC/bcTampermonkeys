// ==UserScript==
// @name         Chat extender
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       Lilly
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/
// @match        *://www.bondageprojects.com/college/*/BondageClub/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //changing various parts of the game's code by replacing entire functions with altered ones
    function main() {
        //---------------------------------------------------------------------------------------------------------------------------------------------
        ChatRoomCreateElement = function() {
            // Creates the chat box
            if (document.getElementById("InputChat") == null) {
                ElementCreateTextArea("InputChat");
                document.getElementById("InputChat").setAttribute("maxLength", 1000);
                document.getElementById("InputChat").setAttribute("autocomplete", "off");
                ElementFocus("InputChat");
            } else if (document.getElementById("InputChat").style.display == "none") ElementFocus("InputChat");

            // Creates the chat log
            if (document.getElementById("TextAreaChatLog") == null) {

                // Sets the size and position
                ElementCreateDiv("TextAreaChatLog");
                ElementPositionFix("TextAreaChatLog", 36, 1005, 5, 988, 859);
                ElementScrollToEnd("TextAreaChatLog");
                ChatRoomRefreshChatSettings(Player);

                // If we relog, we reload the previous chat log
                if (RelogChatLog != null) {
                    while (RelogChatLog.children.length > 0)
                        document.getElementById("TextAreaChatLog").appendChild(RelogChatLog.children[0]);
                    RelogChatLog = null;
                } else ElementContent("TextAreaChatLog", "");

            } else if (document.getElementById("TextAreaChatLog").style.display == "none") {
                setTimeout(() => ElementScrollToEnd("TextAreaChatLog"), 100);
                ChatRoomRefreshChatSettings(Player);
            }

        }
        console.log("k done~~")
    }

    //injecting the code in a <script> element into the website DOM
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+ main +')();'));
    document.body.appendChild(script);

})();
