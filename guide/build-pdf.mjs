// Prints guide/emotional-fitness-check-in.html to public/emotional-fitness-check-in.pdf
// with headless Chrome. Override the browser with CHROME_PATH if it isn't in the default macOS location.
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const chrome =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const source = fileURLToPath(new URL("./emotional-fitness-check-in.html", import.meta.url));
const output = fileURLToPath(new URL("../public/emotional-fitness-check-in.pdf", import.meta.url));

if (!existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome}. Set CHROME_PATH to a Chrome or Chromium binary.`);
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    // Give Google Fonts time to load before printing.
    "--virtual-time-budget=15000",
    `--print-to-pdf=${output}`,
    pathToFileURL(source).href,
  ],
  { stdio: ["ignore", "ignore", "inherit"] },
);

console.log(`Wrote ${output} (${Math.round(statSync(output).size / 1024)} KB)`);
