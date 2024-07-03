import { IConsoleGraph, FindConsoleGraphNode } from "../ConsoleGraph";
import { IRequirement } from "../IRequirement";
import { RequirementType } from "../RequirementType";

export interface IRequirementRecursive  extends IRequirement {
  type: RequirementType.Recursive;
  id: string;
};

function RequirementMet(requirement: IRequirementRecursive, graph: IConsoleGraph) {
  let met = false;
  const e = FindConsoleGraphNode(graph, requirement.id);
  if (e) {
    if (e.entry.requirement) {
      met = e.entry.requirement.RequirementMet(graph);
    }
    else {
      met = true;
    }
  }

  return met;
}

export function CreateRequirementRecursive(id: string) {
  const rv: IRequirementRecursive = {
    type: RequirementType.Recursive,
    id: id,
    RequirementMet: (graph: IConsoleGraph) => RequirementMet(rv, graph)
  };

  return rv;
};
