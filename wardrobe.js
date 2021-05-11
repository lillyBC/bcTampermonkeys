// ==UserScript==
// @name         Wardrobe
// @namespace    http://tampermonkey.net/
// @description  Adds two functions to save and load clothes from local storage
// @version      1.3
// @author       Lilly
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/
// @match        *://www.bondageprojects.com/college/*/BondageClub/
// @match        https://www.bondageprojects.com/college/*/*/
// @match        https://www.bondageprojects.elementfx.com/*/*/
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        unsafeWindow
// @require      http://userscripts-mirror.org/scripts/source/107941.user.js
// ==/UserScript==


(function() {
    unsafeWindow.GM_setValue = GM_setValue
    unsafeWindow.GM_getValue = GM_getValue
    unsafeWindow.GM_listValues = GM_listValues
    unsafeWindow.GM_deleteValue = GM_deleteValue
    unsafeWindow.GM_SuperValue = GM_SuperValue
    //changing various parts of the game's code by replacing entire functions with altered ones
    function main() {
        saveClothes = function(name){
            clothes = Player.Appearance
                .filter(a => a.Asset.Group.Category == "Appearance")
                .filter(a => WardrobeGroupAccessible(Player, a.Asset.Group, { ExcludeNonCloth: true }))
                .map(WardrobeAssetBundle)

            GM_SuperValue.set(name,clothes)
        }

        loadClothes = function(name){
            clothes = GM_SuperValue.get(name)
            if (clothes != undefined){

                C = Player
                C.Appearance = C.Appearance
                    .filter(a => a.Asset.Group.Category != "Appearance" || !WardrobeGroupAccessible(C, a.Asset.Group, { ExcludeNonCloth: true }))
                clothes
                    .filter(w => w.Name != null && w.Group != null)
                    .filter(w => C.Appearance.find(a => a.Asset.Group.Name == w.Group) == null)
                    .forEach(w => {
                    var A = Asset.find(a =>
                                       a.Group.Name == w.Group
                                       && a.Group.Category == "Appearance"
                                       && WardrobeGroupAccessible(C, a.Group, { ExcludeNonCloth: true })
                                       && a.Name == w.Name
                                       && (a.Value == 0 || InventoryAvailable(Player, a.Name, a.Group.Name)));
                    if (A != null) {
                        CharacterAppearanceSetItem(C, w.Group, A, w.Color, 0, null, false);
                        if (w.Property && InventoryGet(C, w.Group)) {
                            var item = InventoryGet(C, w.Group);
                            if (item.Property == null) item.Property = {};
                            for (const key in w.Property) item.Property[key] = w.Property[key];
                        }
                    }
                });
                // Adds any critical appearance asset that could be missing, adds the default one
                AssetGroup
                    .filter(g => g.Category == "Appearance" && !g.AllowNone)
                    .forEach(g => {
                    if (C.Appearance.find(a => a.Asset.Group.Name == g.Name) == null) {
                        // For a group with a mirrored group, we copy the opposite if it exists
                        if (g.MirrorGroup && InventoryGet(C, g.MirrorGroup)) {
                            C.Appearance.push({ Asset: Asset.find(a => a.Group.Name == g.Name && a.Name == InventoryGet(C, g.MirrorGroup).Asset.Name), Difficulty: 0, Color: InventoryGet(C, g.MirrorGroup).Color });
                        } else {
                            C.Appearance.push({ Asset: Asset.find(a => a.Group.Name == g.Name), Difficulty: 0, Color: "Default" });
                        }
                    }
                });
                ChatRoomCharacterUpdate(C)
            } else{
                msg = GM_listValues().join(', ')
                ServerSend("ChatRoomChat",
                       { Content: "Beep", Type: "Action", Dictionary: [{ Tag: "Beep", Text: "msg" },
                                                                       { Tag: "msg", Text: name+ " not found. Saved clothes: " +  msg }], Target: Player.MemberNumber });
            }
        }

        listClothes = function(){
            msg = GM_listValues().join(', ')
            ServerSend("ChatRoomChat",
                       { Content: "Beep", Type: "Action", Dictionary: [{ Tag: "Beep", Text: "msg" },
                                                                       { Tag: "msg", Text: "Saved Clothes: " +  msg }], Target: Player.MemberNumber });
        }

        deleteClothes = function(name){
            GM_deleteValue(name)
            msg = GM_listValues().join(', ')
            ServerSend("ChatRoomChat",
                       { Content: "Beep", Type: "Action", Dictionary: [{ Tag: "Beep", Text: "msg" },
                                                                       { Tag: "msg", Text: "Saved Clothes: " +  msg }], Target: Player.MemberNumber });
        }
        console.log("wardrobe done")
    }

    //injecting the code in a <script> element into the website DOM
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+ main +')();'));
    document.body.appendChild(script);

})();
