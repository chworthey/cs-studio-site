import { IConsoleGraph } from "./IConsoleGraph";
import { RequirementType } from "./RequirementType";

export interface IRequirement {
  type: RequirementType;
  RequirementMet(graph: IConsoleGraph): boolean;
};
