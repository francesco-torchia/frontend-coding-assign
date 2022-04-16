import { ConnectionConfig } from 'mysql';
import * as env from '../env.json';

interface ServerConfig {
  hostname: string;
  port: number;
  apiVersion: string;
  httpLogLevel: string;
  logLevel: string;
}

interface AuthConfig {
  jwtTokenSecret: string;
  jwtTokenExpiresIn: string;
}

class Config {
  public db: ConnectionConfig = env.db;
  public app: ServerConfig = env.app;
  public auth: AuthConfig = env.auth;
}

export const CONFIG = new Config();
