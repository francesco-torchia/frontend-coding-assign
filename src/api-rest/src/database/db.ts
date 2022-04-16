import _ from 'lodash';
import mysql, { OkPacket, Pool } from 'mysql';
import { CONFIG } from '../lib/config';
import { log } from '../lib/log';
import { SERVER } from '../lib/server';

type QueryStatement = Array<string> | string;

/** MySql boolean in select statement */
function castTinyintToBoolean(field: any, useDefaultTypeCasting: any) {
  if (field.type === 'TINY') {
    switch (field.string()) {
      case '1':
        return true;
      case '0':
        return false;
      default:
        return null;
    }
  }
  return useDefaultTypeCasting();
}

export function join(statement: Array<string> | string): string {
  return Array.isArray(statement) ? _.join(statement, '\n') : statement;
}

class Database {

  private connectionsPool: Pool;
  public Ready: Promise<void>;

  constructor() {
    this.connectionsPool = mysql.createPool({
      ...CONFIG.db,
      typeCast: castTinyintToBoolean,
    });

    this.Ready = new Promise((resolve) => {
      this.connectionsPool.getConnection((err, connection) => {
        if (err) {
          log.error('db.ready', 'Cannot connect to the database', err);
          SERVER.shutDown();
        }
        log.info('db.ready', 'Successfully connected to the database: [%s]', CONFIG.db.database);
        connection.release();
        resolve();
      });
    });

  }

  private query<T>(statement: QueryStatement, ...params: Array<any>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.connectionsPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          const query = join(statement);
          log.verbose('db.query', { query, params } as any);
          connection.query(query, params, (err, result) => {
            connection.release();
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  }

  public selectAll<T>(statement: QueryStatement, ...params: Array<any>): Promise<Array<T>> {
    return this.query<Array<T>>(statement, ...params);
  }

  public async select<T>(statement: QueryStatement, ...params: Array<any>): Promise<T> {
    const rows: Array<T> = await this.query<Array<T>>(statement, ...params);
    if (rows.length > 1) {
      throw new Error('Select return more than 1 row');
    }
    return rows[0];
  }

  public insert<T>(statement: QueryStatement, obj: T): Promise<number> {
    return this.query<OkPacket>(statement, obj).then(({ insertId }) => insertId);
  }

  public async update<T>(statement: QueryStatement, obj: T, ...params: Array<any>): Promise<void> {
    const res: OkPacket = await this.query(statement, obj, ...params);
    if (res?.changedRows > 1) {
      throw new Error('Updated more than 1 row');
    }
  }

  public delete(statement: QueryStatement, ...params: Array<any>): Promise<any> {
    return this.query<OkPacket>(statement, ...params);
  }

}

export const DB = new Database();
