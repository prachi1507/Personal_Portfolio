import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "public", "Prachi_Resume.pdf");
const artifacts = path.join(root, ".artifacts", "resume-update");
await fs.mkdir(artifacts, { recursive: true });
try {
  await fs.copyFile(
    output,
    path.join(artifacts, "Prachi_Resume.original.pdf"),
    fs.constants.COPYFILE_EXCL,
  );
} catch (error) {
  if (error.code !== "EEXIST" && error.code !== "ENOENT") throw error;
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.goto(pathToFileURL(path.join(root, "resume", "Prachi_Resume.html")).href);
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.locator(".sheet").evaluateAll((sheets) =>
    sheets.flatMap((sheet, index) => {
      const footer = sheet.querySelector("footer").getBoundingClientRect();
      const lastContent = sheet.querySelector("footer").previousElementSibling.getBoundingClientRect();
      return lastContent.bottom >= footer.top || sheet.scrollHeight > sheet.clientHeight
        ? [index + 1]
        : [];
    }),
  );
  if (overflow.length) throw new Error(`Resume content overflows page(s): ${overflow.join(", ")}`);
  const pdf = path.join(artifacts, "Prachi_Resume.pdf");
  await page.pdf({ path: pdf, preferCSSPageSize: true, printBackground: true });
  for (const [index, sheet] of (await page.locator(".sheet").all()).entries()) {
    await sheet.screenshot({ path: path.join(artifacts, `resume-page-${index + 1}.png`) });
  }
  await fs.copyFile(pdf, output);
  console.log(`Updated ${output}`);
} finally {
  await browser.close();
}
