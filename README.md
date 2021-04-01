# bcTampermonkeys

These are [tampermonkey](https://www.tampermonkey.net/) scripts for Bondage Club.

* **gagspeak:** Adds a translated version of gag speech to the garbled messages. Also works against deafness
* **wardrobe:** Adds functions to save appearance to local storage
* **customActions:** Allows you to include custom actions that output action text and/or execute custom code. For your messages only
    - **/do [text]**: Returns the written text as action text (eg. `/do Lilly ate an apple` will print `(Lilly ate an apple)` on chat)
    - **/do /bind [PlayerIndex]**: Binds the numbered player in the chatroom in wooden restraints
    - **/do /web [PlayerIndex]**: Binds the numbered player in the chatroom in web
    - **/do [gagon|gagoff]**: Toggles the gagspeak code if `gagspeak.js` is used together with this script
    - **/face [smile|evil|scared]**: changes expression of the face
    - **/face blush [1-7]**: Sets blush level. 7 is short of breath
    - **/clothes [name]**: Changes player's clothes to the named wardrobe set
    - **/clothes [glassup|glassdown|glassoff]**: Pushing glasses up and down or taking them off
    - **/dndice [dice]**: Slight improvement over the default dice roller. Allow addition of integer modifiers.
    - **/csave [name]**: Save current appearance with the name to local storage. Only works if `wardrobe.js` is included
    - **/cload [name]**: Load appearance with the given name from local storage. Only works if `wardrobe.js` is included
