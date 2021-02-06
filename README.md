# bcTampermonkeys

These are [tampermonkey](https://www.tampermonkey.net/) scripts for Bondage Club.

* **chatExtend:** Expands maximum chat message size to 1000 characters
* **gagspeak:** Adds a translated version of gag speech to the garbled messages. Also works against deafness
* **customActions:** Allows you to include custom actions that output action text and/or execute custom code. For your messages only
    - /do [text]: Returns the written text as action text (eg. `/do Lilly ate an apple` will print `(Lilly ate an apple)` on chat)
    - /do /bind [PlayerNumber]: Binds the numbered player in the chatroom in wooden restraints
    - /do /web [PlayerNumber]: Binds the numbered player in the chatroom in web
    - /do [gagon|gagoff]: Toggles the gagspeak code if used together with this script
