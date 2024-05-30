import { IConsoleGraph } from "../IConsoleGraph";
import { IRequirement } from "../IRequirement";
import { RequirementType } from "../RequirementType";

export interface IRequirementAND extends IRequirement {
  type: RequirementType.AND;
  op1: IRequirement;
  op2: IRequirement;
};

function RequirementMet(requirement: IRequirementAND, graph: IConsoleGraph) {
  return requirement.op1.RequirementMet(graph) && requirement.op2.RequirementMet(graph);
}

export function CreateRequirementAND(op1: IRequirement, op2: IRequirement) {
  const rv: IRequirementAND = {
    type: RequirementType.AND,
    op1: op1,
    op2: op2,
    RequirementMet: (graph: IConsoleGraph) => RequirementMet(rv, graph)
  };

  return rv;
};
