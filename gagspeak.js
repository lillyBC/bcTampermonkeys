// ==UserScript==
// @name         BC gag speak
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  For understanding gag speach
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
        OldSpeechGarble = SpeechGarble

        SpeechGarble = function(C,CD,NoDeaf){
            origin = CD;
            out  = OldSpeechGarble(C,CD,NoDeaf)

            var GagEffect = 0;
            GagEffect += SpeechGetGagLevel(C, "ItemMouth");
            GagEffect += SpeechGetGagLevel(C, "ItemMouth2");
            GagEffect += SpeechGetGagLevel(C, "ItemMouth3");
            GagEffect += SpeechGetGagLevel(C, "ItemHead");
            GagEffect += SpeechGetGagLevel(C, "ItemHood");
            GagEffect += SpeechGetGagLevel(C, "ItemNeck");
            GagEffect += SpeechGetGagLevel(C, "ItemDevices");
            GagEffect += SpeechGetGagLevel(C, "ItemHoodAddon");

            if(GagEffect>0 && origin.charAt(0)!='('){
                    out = out+' ungarbled: '+ origin;
            }
            return out;
        }

        NewSpeechGarble = SpeechGarble


        console.log("gag speak done")
    }

    //injecting the code in a <script> element into the website DOM
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+ main +')();'));
    document.body.appendChild(script);

})();
