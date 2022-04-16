import { exit } from 'process';
import { CONFIG } from './config';
import { log } from './log';

export type Mode = 'dev' | 'prod';

class Server {

  public mode = process.env.NODE_ENV as Mode || 'prod';

  public shutDown = () => exit(0);

  public init = () => {

    log.verbose('server.init', CONFIG as any );

    (
      this.mode === 'dev'
        ? log.warn
        : log.info
    )('server.init', `[${this.mode}] mode is active`);

    /** Ctrl + c */
    process.on('SIGTERM', this.shutDown);
    process.on('SIGINT', this.shutDown);
  };

}

export const SERVER = new Server();
