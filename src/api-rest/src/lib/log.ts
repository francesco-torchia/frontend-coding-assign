import _log from 'npmlog';
import { CONFIG } from './config';

_log.enableColor();
_log.level = CONFIG.app.logLevel;

export const log = _log;