import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173";
const artifacts = path.resolve(".artifacts");
await fs.mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const problems = [];
const report = [];

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    reducedMotion: "reduce",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => problems.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && response.url().startsWith(baseURL))
      problems.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Prachi");
  await expect(
    page.locator(".sculpture-canvas.is-rendered canvas"),
  ).toBeVisible({ timeout: 20000 });
  await page.screenshot({ path: path.join(artifacts, "desktop-hero.png") });
  await page.screenshot({
    path: path.join(artifacts, "desktop-full.png"),
    fullPage: true,
  });
  report.push("Desktop page, self-hosted fonts, and WebGL sculpture render.");

  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
  const openProject = page.getByRole("button", {
    name: "Explore Skyline CRM AI",
    exact: true,
  });
  await openProject.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { level: 2 })).toHaveText(
    "Skyline CRM AI",
  );
  await expect(
    dialog.getByRole("link", { name: "Visit Skyline" }),
  ).toHaveAttribute("href", "https://skylinedeals.in/");
  const modalAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  if (modalAudit.violations.length)
    problems.push(
      ...modalAudit.violations.map(
        (v) =>
          `Dialog accessibility ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
      ),
    );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(openProject).toBeFocused();
  await page
    .getByRole("button", { name: "Explore Customer Support SaaS Platform", exact: true })
    .click();
  await expect(dialog).toContainText("Server-Side Rendering (SSR)");
  await expect(dialog).toContainText("Static Site Generation (SSG)");
  await dialog.getByRole("button", { name: "Close project details" }).click();
  await expect(dialog).not.toBeVisible();
  report.push(
    "Both project dialogs work, Escape closes, focus returns, and project links are correct.",
  );

  const backend = page.getByRole("tab", { name: "Backend", exact: true });
  await backend.click();
  await expect(page.getByRole("tabpanel")).toContainText("PostgreSQL");
  await backend.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "AI & automation" }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Google Gemini API");
  await page.getByRole("tab", { name: "Frontend", exact: true }).click();
  await expect(page.locator(".about-facts .count-value").first()).toHaveText("3.5");
  await expect(page.locator(".about-facts .count-value").nth(1)).toHaveText("~30%");
  const pastJob = page.locator("details").nth(1);
  await pastJob.locator("summary").click();
  await expect(pastJob).toHaveAttribute("open", "");
  await expect(pastJob.locator(".experience-description")).toContainText(
    "workforce management",
  );
  await pastJob.locator("summary").click();
  report.push(
    "Skill tabs support keyboard navigation and experience sections expand.",
  );

  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "kprachimth@gmail.com",
  );
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Download resume", exact: true })
    .click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Prachi_Resume.pdf");
  const downloaded = path.join(artifacts, "downloaded-resume.pdf");
  await download.saveAs(downloaded);
  expect((await fs.readFile(downloaded)).subarray(0, 5).toString()).toBe(
    "%PDF-",
  );
  report.push("Copy email and the real PDF resume download work.");

  await page.goto(baseURL, { waitUntil: "networkidle" });
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  await fs.writeFile(
    path.join(artifacts, "accessibility.json"),
    JSON.stringify(audit.violations, null, 2),
  );
  if (audit.violations.length)
    problems.push(
      ...audit.violations.map(
        (v) =>
          `Accessibility ${v.id}: ${v.nodes.map((n) => `${n.target.join(" ")} (${n.failureSummary})`).join(", ")}`,
      ),
    );

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 960 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const overflow = await page.evaluate(() => ({
      width: innerWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(
      overflow.content,
      `Horizontal overflow at ${width}px`,
    ).toBeLessThanOrEqual(overflow.width);
    if (width === 390) {
      await page.screenshot({
        path: path.join(artifacts, "mobile-full.png"),
        fullPage: true,
      });
      await page.screenshot({ path: path.join(artifacts, "mobile-hero.png") });
      const toggle = page.getByRole("button", { name: "Open navigation" });
      await toggle.click();
      await expect(page.getByRole("navigation")).toBeVisible();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "About", exact: true })
        .click();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page).toHaveURL(/#about$/);
      await toggle.click();
      await page.keyboard.press("Escape");
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      const mobileAudit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      if (mobileAudit.violations.length)
        problems.push(
          ...mobileAudit.violations.map(
            (v) =>
              `Mobile accessibility ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
          ),
        );
    }
  }
  report.push(
    "No horizontal overflow at 320, 390, 768, 1024, and 1440px; mobile navigation works.",
  );
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await expect(
    page.locator(".sculpture-canvas.is-rendered canvas"),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Explore Skyline CRM AI", exact: true }),
  ).toBeVisible();
  await page.locator(".about-facts").scrollIntoViewIfNeeded();
  await expect(page.locator(".about-facts .count-value").first()).toHaveText("3.5");
  await expect(page.locator(".about-facts .count-value").nth(1)).toHaveText("~30%");
  report.push("Standard motion and reduced-motion modes both render.");
  if (!audit.violations.length)
    report.push("Automated WCAG accessibility checks passed.");
  expect(problems, problems.join("\n")).toEqual([]);
  console.log(report.map((line) => `PASS: ${line}`).join("\n"));
} finally {
  await fs.writeFile(
    path.join(artifacts, "browser-report.json"),
    JSON.stringify({ report, problems }, null, 2),
  );
  await browser.close();
}
