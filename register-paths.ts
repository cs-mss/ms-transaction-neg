import { register } from 'tsconfig-paths';

register({
  baseUrl: './',
  paths: {
    "@app/*": ["src/app/*"],
    "@context/*": ["src/context/*"],
    "@root/*": ["./*"],
    "@test/*": ["test/*"]
  }
});
