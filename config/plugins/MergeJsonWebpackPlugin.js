const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

class MergeJsonWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const pluginName = MergeJsonWebpackPlugin.name;
    const { sourceDir, output } = this.options;

    const mergeAndEmitJson = async (compilation) => {
      try {
        const files = glob.sync(path.join(sourceDir, '**/*.json'));
        let mergedData = {};

        for (const filePath of files) {
          const content = await readFile(filePath, 'utf-8');
          const jsonContent = JSON.parse(content);
          mergedData = { ...mergedData, ...jsonContent };
        }

        const mergedContent = JSON.stringify(mergedData, null, 2);

        // Webpack 5 way to emit files
        compilation.emitAsset(output, new webpack.sources.RawSource(mergedContent));
      } catch (error) {
        compilation.errors.push(new Error(`${pluginName}: ${error}`));
      }
    };

    // Tap into the 'emit' hook directly
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapPromise({
        name: pluginName,
        stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL, // Choose the appropriate stage
      }, async () => {
        await mergeAndEmitJson(compilation);
      });
    });

    if (compiler.options.watch) {
      // Webpack 5 watch mode
      compiler.hooks.watchRun.tapPromise(pluginName, async () => {
        const watcher = compiler.watchFileSystem.watcher || compiler.watchFileSystem.wfs.watcher;

        Object.keys(watcher.mtimes).forEach((watchedFile) => {
          if (watchedFile.startsWith(sourceDir) && watchedFile.endsWith('.json')) {
            console.log(`Detected change in ${watchedFile}, rebuilding...`);
          }
        });
      });
    }
  }
}

module.exports = MergeJsonWebpackPlugin;
