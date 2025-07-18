import { rmSync } from 'fs';
import { join } from 'path';

const cleanDist = () => {
  try {
    rmSync(join(process.cwd(), 'dist'), { recursive: true, force: true });
    console.log('Successfully cleaned dist directory');
  } catch (error) {
    console.error('Error cleaning dist directory:', error);
  }
};

cleanDist();