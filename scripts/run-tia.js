const jest = require("jest")
const tia = require("./tia")

async function main() {

  const requiredTestFiles = []
  const allChangedFiles = JSON.parse(process.argv[2])

  const thundraJestArgs = process.env['THUNDRA_JEST_ARGUMENTS'];
  if (thundraJestArgs) {
    const thundraArgs = thundraJestArgs.split(' ');
    requiredTestFiles.push(...thundraArgs)
  }

  const changedSourceFiles = allChangedFiles
    .filter((file) => /src\/.*.js/gi.test(file))
    .map((file) => "./" + file)

  for (const sourceFile of changedSourceFiles) {
    for (const testFile of Object.keys(tia)) {
      if (tia[testFile].includes(sourceFile)) requiredTestFiles.push(testFile)
    }
  }

  if (requiredTestFiles.length < 1)
    return console.log("No tests cover the changed files. Aborted.")

  await jest.run(requiredTestFiles)
}

main()
