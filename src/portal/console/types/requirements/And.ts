import { Hydratable, IHydratable } from "../../../shared/Hydratable";
import { IConsoleGraph } from "../ConsoleGraph";
import { IRequirement } from "../Requirement";
import { RequirementType } from "../RequirementType";

export interface IRequirementAND extends IRequirement {
  type: RequirementType.AND;
  op1: IHydratable<IRequirement, IConsoleGraph>;
  op2: IHydratable<IRequirement, IConsoleGraph>;
};

function RequirementMet(requirement: IRequirementAND, graph: IConsoleGraph) {
  return requirement.op1.RequirementMet(graph) && requirement.op2.RequirementMet(graph);
}

export interface IRequirementANDInit {
  Op1: string;
  Op2: string;
};

export function CreateRequirementAND(graph: IConsoleGraph, init: IRequirementANDInit) {
  const rv: IRequirementAND = {
    type: RequirementType.AND,
    op1: new Hydratable(init.Op1, (graph, id) => {}),
    op2: op2,
    RequirementMet: (graph: IConsoleGraph) => RequirementMet(rv, graph)
  };

  return rv;
};
