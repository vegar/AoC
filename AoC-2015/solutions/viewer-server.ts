import express from "express";
import { find, write } from "promise-path";
import { fromHere, report as reportGen } from "../util";
import packageData from "../package.json";
import path from "path";

const report = reportGen(__filename);
const app = express();

async function generateIndexHTML() {
  const title: string = packageData.logName;
  const here: string = fromHere(`..${path.sep}`);
  const solutions = await find(fromHere(`${path.sep}*`));
  const links = solutions
    .filter((n) => n.indexOf(".ts") === -1 && n.indexOf(".html") === -1)
    .map((solution) => {
      const folder = solution.substr(here.length);
      return `      <li><a href="/${folder}/viewer.html">${folder}</a></li>`;
    });

  const html = `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <style> html, body { font-family: sans-serif; }</style>
  </head>
  <body>
    <h1>${title}</h1>
    <ul>
${links.join("\n")}
    </ul>
  </body>
</html>
  `;

  report("Updated hard coded index:", fromHere("index.html"));
  await write(fromHere("index.html"), html, "utf8");

  return html;
}

app.use("/solutions", express.static(fromHere("")));

app.get("/", async (req, res) => {
  const html = await generateIndexHTML();
  res.send(html);
});

const port = 8080;
app.listen(port, () => report(`Listening on http://localhost:${port}/`));
