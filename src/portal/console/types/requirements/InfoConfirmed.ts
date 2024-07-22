
import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleGraph, FindConsoleGraphNode } from "../ConsoleGraph";
import { IRequirement } from "../Requirement";
import { RequirementType } from "../RequirementType";
import { IConsoleEntryStateInfoConfirm } from "../entries/InfoConfirm";

export interface IRequirementInfoConfirmed extends IRequirement {
  type: RequirementType.InfoConfirmed;
  id: string;
};

function RequirementMet(requirement: IRequirementInfoConfirmed, graph: IConsoleGraph) {
  let met = false;
  const e  = FindConsoleGraphNode(graph, requirement.id);
  if (e) {
    if (!e.entry.requirement || (e.entry.requirement && e.entry.requirement.RequirementMet(graph))) {
      if (e.entry.type === ConsoleEntryType.InfoConfirm) {
        const eStateCast = e.state as IConsoleEntryStateInfoConfirm;
        if (eStateCast) {
          met = eStateCast.isConfirmed;
        }
      }
    }
  }

  return met;
}

export function CreateRequirementInfoConfirmed(id: string) {
  const rv: IRequirementInfoConfirmed = {
    type: RequirementType.InfoConfirmed,
    id: id,
    RequirementMet: (graph: IConsoleGraph) => RequirementMet(rv, graph)
  };

  return rv;
};
