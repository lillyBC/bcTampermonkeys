// ==UserScript==
// @name         Auto relog
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       Lilly
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/
// @match        *://www.bondageprojects.com/college/*/BondageClub/
// @match        https://www.bondageprojects.com/college/*/*/
// @match        https://www.bondageprojects.elementfx.com/*/*/
// @match        https://www.bondage-europe.com/*/*/
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    //changing various parts of the game's code by replacing entire functions with altered ones
    function main() {
        autoRelog = function(password){
            ServerSocket.on("connect", function (){
                console.log("getting back in");
                setTimeout(function(){
                    ElementValue("InputPassword",password)
                    RelogSend()
                },2000)

            })
        }

        //---------------------------------------------------------------------------------------------------------------------------------------------
        console.log("auto login done")
    }

    //injecting the code in a <script> element into the website DOM
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+ main +')();'));
    document.body.appendChild(script);

})();
