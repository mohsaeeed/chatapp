import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService implements MongooseOptionsFactory {

    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(3000),
            API_AUTH_ENABLED: Joi.boolean().required(),
            DATABASE_URL: Joi.string().required(),
        });

        const { error, value: validateEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validateEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    get isApiAuthEnabled(): boolean {
        return Boolean(this.envConfig.API_AUTH_ENABLED);
    }

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.envConfig.DATABASE_URL,
        };
    }
}
