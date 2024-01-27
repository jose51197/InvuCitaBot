import { sendMessage } from "./invuCitaBot";
import { getInvuCitas } from "./invuScrapper";
import { read, write } from "./citasFileManager";

async function start() {
    const citas = await getInvuCitas();
    // write(JSON.stringify(citas)); // Initial load
    let message = "";
    // Now some business logic
    if(!(read().toString() === JSON.stringify(citas))){
        const oldCitas: string[] = JSON.parse(read().toString());
        for (const cita of citas) {
            if(!oldCitas.includes(cita)) {
                message += `Nueva cita ${cita}\n`;
            }
        }
        message += "Reporte Citas disponibles: \n";
        message += Array.from(citas).join("\n");
        await sendMessage(message);
        write(JSON.stringify(citas));
    }
    process.exit();
}
start();
