import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';

// eslint-disable-next-line import/namespace
import * as postgres from './ormconfig.postgres';
import * as prod from './production.config';
// eslint-disable-next-line import/namespace
// import sqlite = require('../config/ormconfig.sqlite');
// import postgres = require('../config/ormconfig.postgres');

@Injectable()
export class TypeOrmOptionsService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    Logger.debug('Init', this.constructor.name);
    if (process.env.NODE_ENV === 'production') {
      console.log('production');

      return prod;
    }
    console.log('dev');

    return postgres;

    // const ormOptions = {
    //   prod,
    // };
    // return ormOptions[this.config.env.TYPEORM_TYPE];
  }
}
