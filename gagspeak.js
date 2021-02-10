// ==UserScript==
// @name         BC gag speak
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  For understanding gag speach
// @author       Lilly
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/
// @match        *://www.bondageprojects.com/college/*/BondageClub/
// @match        https://www.bondageprojects.com/college/*/*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //changing various parts of the game's code by replacing entire functions with altered ones
    function main() {
        OldSpeechGarble = SpeechGarble

        SpeechGarble = function(C, CD, NoDeaf = true) {

            origin = CD;

            // Variables to build the new string and check if we are in a parentheses
            var NS = "";
            var Par = false;
            if (CD == null) CD = "";
            var GagEffect = 0;
            GagEffect += SpeechGetGagLevel(C, "ItemMouth");
            GagEffect += SpeechGetGagLevel(C, "ItemMouth2");
            GagEffect += SpeechGetGagLevel(C, "ItemMouth3");
            GagEffect += SpeechGetGagLevel(C, "ItemHead");
            GagEffect += SpeechGetGagLevel(C, "ItemHood");
            GagEffect += SpeechGetGagLevel(C, "ItemNeck");
            GagEffect += SpeechGetGagLevel(C, "ItemDevices");
            GagEffect += SpeechGetGagLevel(C, "ItemHoodAddon");

            // GagTotal4 always returns mmmmm and muffles some frequent letters entirely, 75% least frequent letters
            if (GagEffect >= 20  || ((C.ID != 0) && (Player.GetDeafLevel() >= 7 && !NoDeaf))) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (Par) NS = NS + CD.charAt(L);
                    else {
                        if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;
                        else if (H == "z" || H == "q" || H == "j" || H == "x" || H == "k" || H == "v" || H == "b" || H == "y" || H == "w" || H == "g" || H == "p" || H == "f" || H == "u" || H == "c" || H == "d" || H == "l" || H == "h" || H == "r") NS = NS + " ";
                        else NS = NS + "m";
                    }

                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // GagTotal3 always returns mmmmm and muffles some relatively frequent letters entirely, 50% least frequent letters
            if (GagEffect >= 16  || ((C.ID != 0) && (Player.GetDeafLevel() >= 6 && !NoDeaf))) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (Par) NS = NS + CD.charAt(L);
                    else {
                        if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;
                        else if (H == "z" || H == "q" || H == "j" || H == "x" || H == "k" || H == "v" || H == "b" || H == "y" || H == "w" || H == "g" || H == "p" || H == "f") NS = NS + " ";
                        else NS = NS + "m";
                    }

                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // GagTotal2 always returns mmmmm and muffles some less frequent letters entirely; 25% least frequent letters
            if (GagEffect >= 12  || ((C.ID != 0) && (Player.GetDeafLevel() >= 5 && !NoDeaf))) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (Par) NS = NS + CD.charAt(L);
                    else {
                        if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;
                        else if (H == "z" || H == "q" || H == "j" || H == "x" || H == "k" || H == "v") NS = NS + " ";
                        else NS = NS + "m";
                    }

                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // Total gags always returns mmmmm
            if ((GagEffect >= 8) || ((C.ID != 0) && (Player.GetDeafLevel() >= 4 && !NoDeaf))) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (Par) NS = NS + CD.charAt(L);
                    else {
                        if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;
                        else NS = NS + "m";
                    }

                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // VeryHeavy garble - Close to no letter stays the same
            if (GagEffect >= 7) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (!Par) {

                        // Regular characters
                        if (H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "y") NS = NS + "e";
                        if (H == "j" || H == "k" || H == "l" || H == "r") NS = NS + "a";
                        if (H == "s" || H == "z" || H == "h") NS = NS + "h";
                        if (H == "d" || H == "f" || H == "g" || H == "n" || H == "m" || H == "w" || H == "t" || H == "c" || H == "q" || H == "x" || H == "p" || H == "v") NS = NS + "m";
                        if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-" || H == "b") NS = NS + H;

                        // Accents/Latin characters
                        if (H == "á" || H == "â" || H == "à" || H == "é" || H == "ê" || H == "è" || H == "ë" || H == "í" || H == "î" || H == "ì" || H == "ï" || H == "ó" || H == "ô" || H == "ò" || H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "e";
                        if (H == "ç") NS = NS + "h";
                        if (H == "ñ") NS = NS + "m";

                        // Cyrillic characters
                        if (H == "а" || H == "е" || H == "и" || H == "о" || H == "у" || H == "ю" || H == "л"|| H == "я") NS = NS + "е";
                        if (H == "с" || H == "й" || H == "х") NS = NS + "к";
                        if (H == "ж" || H == "к" || H == "л" || H == "р" || H == "у") NS = NS + "а";
                        if (H == "з" || H == "с" || H == "г" || H == "й") NS = NS + "г";
                        if (H == "б" || H == "р" || H == "в" || H == "ы") NS = NS + "ф";
                        if (H == "д" || H == "ф" || H == "г" || H == "н" || H == "м") NS = NS + "м";

                    } else NS = NS + CD.charAt(L);
                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // Heavy garble - Almost no letter stays the same
            if ((GagEffect >= 6) || ((C.ID != 0) && (Player.GetDeafLevel() >= 3 && !NoDeaf))) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (!Par) {

                        // Regular characters
                        if (H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "y" || H == "t") NS = NS + "e";
                        if (H == "c" || H == "q" || H == "x") NS = NS + "k";
                        if (H == "j" || H == "k" || H == "l" || H == "r" || H == "w") NS = NS + "a";
                        if (H == "s" || H == "z" || H == "h") NS = NS + "h";
                        if (H == "b" || H == "p" || H == "v") NS = NS + "f";
                        if (H == "d" || H == "f" || H == "g" || H == "n" || H == "m") NS = NS + "m";
                        if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;

                        // Accents/Latin characters
                        if (H == "á" || H == "â" || H == "à" || H == "é" || H == "ê" || H == "è" || H == "ë" || H == "í" || H == "î" || H == "ì" || H == "ï" || H == "ó" || H == "ô" || H == "ò" || H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "e";
                        if (H == "ç") NS = NS + "h";
                        if (H == "ñ") NS = NS + "m";

                        // Cyrillic characters
                        if (H == "а" || H == "е" || H == "и" || H == "о" || H == "у" || H == "ю" || H == "л"|| H == "я") NS = NS + "е";
                        if (H == "с" || H == "й" || H == "х") NS = NS + "к";
                        if (H == "ж" || H == "к" || H == "л" || H == "р" || H == "у") NS = NS + "а";
                        if (H == "з" || H == "с" || H == "г" || H == "й") NS = NS + "г";
                        if (H == "б" || H == "р" || H == "в" || H == "ы") NS = NS + "ф";
                        if (H == "д" || H == "ф" || H == "г" || H == "н" || H == "м") NS = NS + "м";

                    } else NS = NS + CD.charAt(L);
                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // Medium garble - Some letters stays the same
            if (GagEffect >= 5) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (!Par) {

                        // Regular characters
                        if (H == "e" || H == "i" || H == "o" || H == "u" || H == "y" || H == "t") NS = NS + "e";
                        if (H == "c" || H == "q" || H == "x" || H == "k" ) NS = NS + "k";
                        if (H == "j" || H == "l" || H == "r" || H == "w" || H == "a") NS = NS + "a";
                        if (H == "s" || H == "z" || H == "h") NS = NS + "h";
                        if (H == "b" || H == "p" || H == "v") NS = NS + "f";
                        if (H == "d" || H == "f" || H == "g" || H == "m") NS = NS + "m";
                        if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-" || H == "n") NS = NS + H;

                        // Accents/Latin characters
                        if (H == "á" || H == "â" || H == "à" || H == "é" || H == "ê" || H == "è" || H == "ë" || H == "í" || H == "î" || H == "ì" || H == "ï" || H == "ó" || H == "ô" || H == "ò" || H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "e";
                        if (H == "ç") NS = NS + "h";
                        if (H == "ñ") NS = NS + "m";

                        // Cyrillic characters
                        if (H == "а" || H == "е" || H == "и" || H == "о" || H == "у" || H == "ю" || H == "л"|| H == "я") NS = NS + "е";
                        if (H == "с" || H == "й" || H == "х") NS = NS + "к";
                        if (H == "ж" || H == "к" || H == "л" || H == "р" || H == "у") NS = NS + "а";
                        if (H == "з" || H == "с" || H == "г" || H == "й") NS = NS + "г";
                        if (H == "б" || H == "р" || H == "в" || H == "ы") NS = NS + "ф";
                        if (H == "д" || H == "ф" || H == "г" || H == "н" || H == "м") NS = NS + "м";

                    } else NS = NS + CD.charAt(L);
                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // Normal garble, keep vowels and a few letters the same
            if ((GagEffect >= 4) || ((C.ID != 0) && (Player.GetDeafLevel() >= 2 && !NoDeaf))) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (!Par) {

                        // Regular characters
                        if (H == "v" || H == "b" || H == "c" || H == "t") NS = NS + "e";
                        if (H == "q" || H == "k" || H == "x") NS = NS + "k";
                        if (H == "w" || H == "y" || H == "j" || H == "l" || H == "r") NS = NS + "a";
                        if (H == "s" || H == "z") NS = NS + "h";
                        if (H == "d" || H == "f") NS = NS + "m";
                        if (H == "p") NS = NS + "f";
                        if (H == "g") NS = NS + "n";
                        if (H == " " || H == "!" || H == "?" || H == "." || H == "~" || H == "-" || H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "m" || H == "n" || H == "h") NS = NS + H;

                        // Accents/Latin characters
                        if (H == "á" || H == "â" || H == "à") NS = NS + "a";
                        if (H == "é" || H == "ê" || H == "è" || H == "ë") NS = NS + "e";
                        if (H == "í" || H == "î" || H == "ì" || H == "ï") NS = NS + "i";
                        if (H == "ó" || H == "ô" || H == "ò") NS = NS + "o";
                        if (H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "u";
                        if (H == "ç") NS = NS + "s";
                        if (H == "ñ") NS = NS + "n";

                        // Cyrillic characters
                        if (H == "в" || H == "ф" || H == "б" || H == "п") NS = NS + "фы";
                        if (H == "г" || H == "к" || H == "х") NS = NS + "к";
                        if (H == "в" || H == "у" || H == "ж" || H == "л" || H == "р") NS = NS + "а";
                        if (H == "с" || H == "я") NS = NS + "х";
                        if (H == "д" || H == "ф") NS = NS + "м";
                        if (H == "р") NS = NS + "ф";
                        if (H == "г") NS = NS + "н";

                    } else NS = NS + CD.charAt(L);
                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // Easy garble, keep vowels and a some letters the same
            if (GagEffect >= 3) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (!Par) {

                        // Regular characters
                        if (H == "v" || H == "b" || H == "c" || H == "t") NS = NS + "e";
                        if (H == "q" || H == "k" || H == "x") NS = NS + "k";
                        if (H == "w" || H == "y" || H == "j" || H == "l" || H == "r") NS = NS + "a";
                        if (H == "s" || H == "z") NS = NS + "s";
                        if (H == "d") NS = NS + "m";
                        if (H == "p") NS = NS + "f";
                        if (H == "g") NS = NS + "h";
                        if (H == " " || H == "!" || H == "?" || H == "." || H == "~" || H == "-" || H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "m" || H == "n" || H == "h" || H == "f") NS = NS + H;

                        // Accents/Latin characters
                        if (H == "á" || H == "â" || H == "à") NS = NS + "a";
                        if (H == "é" || H == "ê" || H == "è" || H == "ë") NS = NS + "e";
                        if (H == "í" || H == "î" || H == "ì" || H == "ï") NS = NS + "i";
                        if (H == "ó" || H == "ô" || H == "ò") NS = NS + "o";
                        if (H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "u";
                        if (H == "ç") NS = NS + "s";
                        if (H == "ñ") NS = NS + "n";

                        // Cyrillic characters
                        if (H == "в" || H == "ф" || H == "б" || H == "п") NS = NS + "фы";
                        if (H == "г" || H == "к" || H == "х") NS = NS + "к";
                        if (H == "в" || H == "у" || H == "ж" || H == "л" || H == "р") NS = NS + "а";
                        if (H == "с" || H == "я") NS = NS + "х";
                        if (H == "д" || H == "ф") NS = NS + "м";
                        if (H == "р") NS = NS + "ф";
                        if (H == "г") NS = NS + "н";

                    } else NS = NS + CD.charAt(L);
                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // Light garble, half of the letters stay the same
            if ((GagEffect >= 2) || ((C.ID != 0) && (Player.GetDeafLevel() >= 1 && !NoDeaf))) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (!Par) {

                        // Regular characters
                        if (H == "c" || H == "t") NS = NS + "e";
                        if (H == "q" || H == "k" || H == "x") NS = NS + "k";
                        if (H == "j" || H == "l" || H == "r") NS = NS + "a";
                        if (H == "s") NS = NS + "z";
                        if (H == "z") NS = NS + "s";
                        if (H == "f") NS = NS + "h";
                        if (H == "d" || H == "m" || H == "g") NS = NS + "m";
                        if (H == "b" || H == "h" || H == "n" || H == "v" || H == "w" || H == "p" || H == " " || H == "'" || H == "?" || H == "!" || H == "." || H == "," || H == "~" || H == "-" || H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "y") NS = NS + H;

                        // Accents/Latin characters
                        if (H == "á" || H == "â" || H == "à") NS = NS + "a";
                        if (H == "é" || H == "ê" || H == "è" || H == "ë") NS = NS + "e";
                        if (H == "í" || H == "î" || H == "ì" || H == "ï") NS = NS + "i";
                        if (H == "ó" || H == "ô" || H == "ò") NS = NS + "o";
                        if (H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "u";
                        if (H == "ç") NS = NS + "s";
                        if (H == "ñ") NS = NS + "n";

                        // Cyrillic characters
                        if (H == "ч" || H == "ц") NS = NS + "е";
                        if (H == "й" || H == "ф" || H == "в") NS = NS + "к";
                        if (H == "д" || H == "л" || H == "щ"|| H == "я") NS = NS + "а";
                        if (H == "з") NS = NS + "с";
                        if (H == "с") NS = NS + "з";
                        if (H == "д" || H == "ф" || H == "м" || H == "г") NS = NS + "м";
                        if (H == "а" || H == "п" || H == "р" || H == "о" || H == "к" || H == "е"  || H == "н" || H == "м" || H == "и" || H == "т" ) NS = NS + H;

                    } else NS = NS + CD.charAt(L);
                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // Very Light garble, most of the letters stay the same
            if (GagEffect >= 1) {
                for (let L = 0; L < CD.length; L++) {
                    var H = CD.charAt(L).toLowerCase();
                    if (H == "(") Par = true;
                    if (!Par) {

                        // Regular characters
                        if (H == "t") NS = NS + "e";
                        if (H == "c" || H == "q" || H == "k" || H == "x") NS = NS + "k";
                        if (H == "j" || H == "l" || H == "r") NS = NS + "a";
                        if (H == "d" || H == "m" || H == "g") NS = NS + "m";
                        if (H == "b" || H == "h" || H == "n" || H == "v" || H == "w" || H == "p" || H == " " || H == "'" || H == "?" || H == "!" || H == "." || H == "," || H == "~" || H == "-" || H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "y" || H == "f" || H == "s" || H == "z") NS = NS + H;

                        // Accents/Latin characters
                        if (H == "á" || H == "â" || H == "à") NS = NS + "a";
                        if (H == "é" || H == "ê" || H == "è" || H == "ë") NS = NS + "e";
                        if (H == "í" || H == "î" || H == "ì" || H == "ï") NS = NS + "i";
                        if (H == "ó" || H == "ô" || H == "ò") NS = NS + "o";
                        if (H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "u";
                        if (H == "ç") NS = NS + "s";
                        if (H == "ñ") NS = NS + "n";

                        // Cyrillic characters
                        if (H == "ч" || H == "ц") NS = NS + "е";
                        if (H == "й" || H == "ф" || H == "в") NS = NS + "к";
                        if (H == "д" || H == "л" || H == "щ"|| H == "я") NS = NS + "а";
                        if (H == "з") NS = NS + "с";
                        if (H == "с") NS = NS + "з";
                        if (H == "д" || H == "ф" || H == "м" || H == "г") NS = NS + "м";
                        if (H == "а" || H == "п" || H == "р" || H == "о" || H == "к" || H == "е"  || H == "н" || H == "м" || H == "и" || H == "т" ) NS = NS + H;

                    } else NS = NS + CD.charAt(L);
                    if (H == ")") Par = false;
                }
                NS = SpeechStutter(C, NS);
                NS = SpeechBabyTalk(C, NS);
                NS = NS+' ungarbled: '+origin;
                return NS;
            }

            // No gag effect, we return the regular text
            CD = SpeechStutter(C, CD);
            CD = SpeechBabyTalk(C, CD);
            return CD;

        }

        NewSpeechGarble = SpeechGarble


        console.log("k done~~")
    }

    //injecting the code in a <script> element into the website DOM
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+ main +')();'));
    document.body.appendChild(script);

})();
