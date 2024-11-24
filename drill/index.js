import PogObject from "PogData";
ChatLib.chat("&8mobx was here")
// cfg
let drillToggled = new PogObject("Drill", {
    "toggle": true
}, "toggled.json");
// toggle
register("command", () => {
    drillToggled.toggle = !drillToggled.toggle;
    ChatLib.chat(`&0&l[&3&lDrill&0&l]&r ${drillToggled.toggle ? "&r&aEnabled" : "&r&4Disabled"} module.`)
    drillToggled.save();
}).setName("drill")
// code
const S2FPacketSetSlot = Java.type('net.minecraft.network.play.server.S2FPacketSetSlot');
const S30PacketWindowItems = Java.type('net.minecraft.network.play.server.S30PacketWindowItems');
var worldLoad = Date.now()
// So that it loads the drill on world load
register("worldLoad", () => {
    worldLoad = Date.now()
});

register("packetReceived", (Packet, Event) => {
    if(!drillToggled.toggle) return;
    if (Client.isInGui()) return;
    var newDate = Date.now()
    if (newDate - worldLoad <= 3000) return;
    if (Packet instanceof S2FPacketSetSlot) {
        if (!Packet.func_149174_e()) { return }
        if (!Packet.func_149174_e().toString().toLowerCase().includes("shard") && !Packet.func_149174_e().toString().toLowerCase().includes("pickaxe")) { return }
        cancel(Event)
    }

    if (Packet instanceof S30PacketWindowItems) {
        if (Packet.func_148911_c() != 0) { return }
        cancel(Event)
    }
}).setFilteredClasses([S2FPacketSetSlot.class, S30PacketWindowItems.class])
