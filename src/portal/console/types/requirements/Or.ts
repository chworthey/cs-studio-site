import { IConsoleGraph } from "../ConsoleGraph";
import { IRequirement } from "../Requirement";
import { RequirementType } from "../RequirementType";


export interface IRequirementOR extends IRequirement {
  type: RequirementType.OR;
  op1: IRequirement;
  op2: IRequirement;
};

function RequirementMet(requirement: IRequirementOR, graph: IConsoleGraph) {
  return requirement.op1.RequirementMet(graph) || requirement.op2.RequirementMet(graph);
}

export function CreateRequirementOR(op1: IRequirement, op2: IRequirement) {
  const rv: IRequirementOR = {
    type: RequirementType.OR,
    op1: op1,
    op2: op2,
    RequirementMet: (graph: IConsoleGraph) => RequirementMet(rv, graph)
  };

  return rv;
};
