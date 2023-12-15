// lint-staged.config.js
module.exports = {
    // Type check TypeScript files
    "**/*.(ts|tsx)": () => "yarn tsc --noEmit",

    // Lint then format TypeScript and JavaScript files
    "**/*.(ts|tsx|js)": (filenames) => [
        `yarn eslint --fix ${filenames
            .map((filename) => "'" + filename + "'")
            .join(" ")}`,
        `yarn prettier --write ${filenames
            .map((filename) => "'" + filename + "'")
            .join(" ")}`,
    ],

    // Format MarkDown, MDX and JSON
    "**/*.(md|mdx|json)": (filenames) =>
        `yarn prettier --write ${filenames
            .map((filename) => "'" + filename + "'")
            .join(" ")}`,
};
