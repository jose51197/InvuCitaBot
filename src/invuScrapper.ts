import { Page, launch } from 'puppeteer';


export async function getInvuCitas() {
    const browser = await launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions'],
        headless: "new"
      });
    
    const page = await browser.newPage();
    await page.goto('https://citas.invu.go.cr/tramite-cita');
    await Promise.all([
        page.click('div > div > div > div.row.text-center.pt-5 > a'),
        page.waitForNavigation(),
    ]);
    //ahorro y prestamo
    page.click('#_CITAS_TRAMITE_INVU_PORTLET_WAR_CITAS_TRAMITE_PORTLET_\\:form-paso-1\\:j_idt28_label');
    await page.waitForTimeout(1000);
    page.click("#_CITAS_TRAMITE_INVU_PORTLET_WAR_CITAS_TRAMITE_PORTLET_\\:form-paso-1\\:j_idt28_2");
    await page.waitForTimeout(500);
    page.click("#_CITAS_TRAMITE_INVU_PORTLET_WAR_CITAS_TRAMITE_PORTLET_\\:form-paso-1\\:categoria-input\\:5\\:j_idt47 > div > div > div:nth-child(3) > span");
    await page.waitForTimeout(400);
    // Wait for pagwe to load
    await page.waitForSelector("#_CITAS_TRAMITE_INVU_PORTLET_WAR_CITAS_TRAMITE_PORTLET_\\:j_idt227", { hidden: true });
    // Go to last page
    await next(page);
    await next(page);
    await next(page);
    await page.waitForTimeout(400);

    const dateTimes = await page.evaluate(() => {
        const citas = document.querySelector("#_CITAS_TRAMITE_INVU_PORTLET_WAR_CITAS_TRAMITE_PORTLET_\\:form-paso-4 > div:nth-child(5) > div > div.col-12.col-md-10.border-all")!;
        const listDivs = citas.getElementsByTagName("div");
        const dateTimes: string[] = [];
        const available = Array.prototype.slice.call(listDivs).filter(el => el.className.includes("blue"));
        available.forEach(time => {
            const date = time.parentNode.getElementsByTagName("P")[0].innerText;
            dateTimes.push(`${date} ${time.innerText}`);
        });
        return dateTimes;
    });
    browser.close();
    return dateTimes;
}

async function next(page: Page) {
    page.click("#_CITAS_TRAMITE_INVU_PORTLET_WAR_CITAS_TRAMITE_PORTLET_\\:form-wizard-steps\\:form-wizard-next\\:j_idt21");
    await page.waitForTimeout(300);
}