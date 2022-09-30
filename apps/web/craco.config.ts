import { CracoConfig, getLoader, loaderByName } from '@craco/craco';
import path from 'path';

const packages = [path.join(__dirname, '../../packages')];

// Make sure to transpile code in our packages folder
const config: CracoConfig = {
  webpack: {
    configure(webpackConfig, arg) {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));

      if (isFound) {
        const include = Array.isArray((match as any).loader.include)
          ? (match as any).loader.include
          : [(match as any).loader.include];

        (match as any).loader.include = include.concat(packages);
      }

      return webpackConfig;
    },
  },
};

export default config;
