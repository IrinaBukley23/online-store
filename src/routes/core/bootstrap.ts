import { Module } from './../../types';

export function bootstrap(module: Module): void {
    module.start();
}
