import { system } from '@minecraft/server'
system.events.beforeWatchdogTerminate.subscribe(ev => {
  ev.cancel = true;
  console.log("Watchdog is cancel!!")
});