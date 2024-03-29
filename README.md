# bcTampermonkeys

These are [tampermonkey](https://www.tampermonkey.net/) scripts for Bondage Club. Feel free to use for your own purposes as is, in part or with modifications.

* **gagspeak:** Adds a translated version of gag speech to the garbled messages. Also works against deafness
* **wardrobe:** Adds functions to save appearance to local storage
* **autorelog:** Adds a function `autoRelog` to relog automatically after a logout. This is not hooked to `customActions.js` since you don't want to be typing your password into the chat window.
* **customActions:** Allows you to include custom actions that output action text and/or execute custom code. For your messages only
    - **/do [text]**: Returns the written text as action text (eg. `/do Lilly ate an apple` will print `(Lilly ate an apple)` on chat)
    - **/do /bind [PlayerIndex]**: Binds the numbered player in the chatroom in wooden restraints
    - **/do /web [PlayerIndex]**: Binds the numbered player in the chatroom in web
    - **/do [gagon|gagoff]**: Toggles the gagspeak code if `gagspeak.js` is used together with this script
    - **/face [smile|evil|scared]**: changes expression of the face
    - **/face blush [1-7]**: Sets blush level. 7 is short of breath
    - **/f**: alias for face
    - **/clothes [name]**: Changes player's clothes to the named wardrobe set. This is the in game wardrobe, not extra storage created by `wardrobe.js`
    - **/clothes [glassup|glassdown|glassoff]**: Pushing glasses up and down or taking them off
    - **/c**: alias for clothes
    - **/dndice [dice]**: Slight improvement over the default dice roller. Allow addition of integer modifiers.
    - **/save [name]**: Save current appearance with the name to local storage. Only works if `wardrobe.js` is included
    - **/load [name]**: Load appearance with the given name from local storage. Only works if `wardrobe.js` is included
    - **/list**: List saved appearance in local storage. Only works if `wardrobe.js` is included
    - **/delete [name]**: Delete saved appearance in local storage. Only works if `wardrobe.js` is included
    - **/poof [message(optional)]**: Disconnect from the game leaving an action message behind
