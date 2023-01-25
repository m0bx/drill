import PogObject from "PogData";
ChatLib.chat("&8mobx was here")
// cfg shit
let drillToggled = new PogObject("Drill", {
    "toggle": true
}, "toggled.json");

register("command", () => {
    drillToggled.toggle = !drillToggled.toggle;
    ChatLib.chat(`&0&l[&3Drill&0] ${drillToggled.toggle ? "&r&aEnabled" : "&r&4Disabled"} module.`)
    drillToggled.save();
}).setName("drill")

// actual code
const S2FPacketSetSlot = Java.type('net.minecraft.network.play.server.S2FPacketSetSlot');
const S30PacketWindowItems = Java.type('net.minecraft.network.play.server.S30PacketWindowItems');
var worldLoad = new Date(milliseconds)

register("packetReceived", (packet, event) => {
    if(!drillToggled.toggle) return;
    
    var newDate = new Date(milliseconds)
    if (worldLoad - newDate <= 3000) return;

    if (Client.isInGui()) return;
    
    if (packet instanceof S2FPacketSetSlot) {

        if (!packet.func_149174_e()) { return }
        if (!packet.func_149174_e().toString().includes("Shard")) { return }
        cancel(event)
    }

    if (packet instanceof S30PacketWindowItems) {

        if (packet.func_148911_c() != 0) { return }
        cancel(event)
    }
}).setPacketClasses([S2FPacketSetSlot.class, S30PacketWindowItems.class])

register("worldLoad", () => {
    worldLoad = new Date(milliseconds)
});