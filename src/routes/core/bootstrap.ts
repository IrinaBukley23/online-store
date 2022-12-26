import { ModuleInterface } from "../../types";

export function bootstrap(module: ModuleInterface): void {
  module.start();
}
