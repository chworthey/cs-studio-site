import { IConsoleGraph } from "./ConsoleGraph";
import { RequirementType } from "./RequirementType";

export interface IRequirement {
  type: RequirementType;
  RequirementMet(graph: IConsoleGraph): boolean;
};
