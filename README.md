# find-env-vars

A simple and efficient Node.js utility tool that scans your entire project directory to find all environment variables used in your JavaScript and TypeScript files, then automatically generates a `.env.example` file.

## Features

- 🔍 **Deep Scanning**: Recursively scans all subdirectories in your project (no depth limit)
- 📁 **Smart Filtering**: Automatically skips `node_modules`, `dist`, `build`, `out`, `.next`, `venv` and`.git` directories
- 🎯 **Pattern Detection**: Finds all `process.env.VARIABLE_NAME` patterns in `.js`, `.ts`, `.jsx`, `.tsx`, `.mjs`, `.cjs`, `.vue`, and `.svelte` files
- 📝 **Auto-Generation**: Creates a `.env.example` file with all discovered variables
- ⚡ **Fast & Lightweight**: Built with async/await for optimal performance
- 🛡️ **Error Handling**: Gracefully handles permission errors and continues scanning

## Installation

Install globally via npm:

```bash
npm install -g find-env-vars
```

Or use directly with npx (no installation required):

```bash
npx find-env-vars
```

## Usage

Simply run the command in your project root directory:

```bash
find-env-vars
```

The tool will:

1. Scan all `.js`, `.ts`, `.jsx`, `.tsx`, `.mjs`, `.cjs`, `.vue`, and `.svelte` files in your project
2. Extract all environment variables used (e.g., `process.env.PORT`)
3. Display a sorted list of found variables
4. Generate a `.env.example` file in the current directory

### Example Output

```
Starting ENV variable scan in: /path/to/your/project
Scanning all child directory levels...

--- Scan Complete ---
✅ Found 5 unique environment variables:

Environment Variables: [ 'API_KEY', 'DATABASE_URL', 'NODE_ENV', 'PORT', 'SECRET_KEY' ]

.env.example content:

API_KEY=
DATABASE_URL=
NODE_ENV=
PORT=
SECRET_KEY=

.env.example file created successfully.
---------------------
```

## How It Works

The tool uses a regular expression pattern to match `process.env.VARIABLE_NAME` throughout your codebase:

- Recursively traverses all directories from where the command is run
- Skips common directories like `node_modules` and `.git`
- Reads `.js`, `.ts`, `.jsx`, `.tsx`, `.mjs`, `.cjs`, `.vue`, and `.svelte` files only
- Extracts unique variable names
- Generates a template `.env.example` file with empty values

## Use Cases

Perfect for:

- 🚀 **New Team Members**: Help them quickly set up required environment variables
- 📦 **Open Source Projects**: Provide clear documentation of needed environment variables
- 🔄 **Project Handoffs**: Ensure all environment variables are documented
- ✅ **CI/CD Setup**: Verify all required environment variables are configured
- 🧹 **Codebase Audit**: Discover which environment variables your project actually uses

## Requirements

- Node.js 14.x or higher
- Read permissions for the directories being scanned

## Technical Details

- **Language**: JavaScript (Node.js)
- **Module System**: CommonJS
- **Dependencies**: None (uses only Node.js built-in modules)
- **Async**: Built with modern async/await patterns

## Limitations

- Only detects the pattern `process.env.VARIABLE_NAME`
- Does not detect dynamically constructed variable names (e.g., `process.env[variableName]`)
- Skips files/directories where permission errors occur

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/find-env-vars/issues).

## Author

**Mehedi Siam**

- Portfolio: [mehedisiam.com](https://mehedisiam.com/)
- GitHub: [@mehedihsiam](https://github.com/mehedihsiam)

## License

ISC

## Support

If you find this tool helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs or requesting features
- 📢 Sharing it with others who might find it useful

---

Made with ❤️ by [Mehedi Siam](https://mehedisiam.com/)
# find-env-vars
