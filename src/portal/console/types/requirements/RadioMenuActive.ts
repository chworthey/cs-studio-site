
import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleGraph, FindConsoleGraphNode } from "../ConsoleGraph";
import { IRequirement } from "../Requirement";
import { RequirementType } from "../RequirementType";
import { IConsoleEntryStateRadioMenu } from "../entries/RadioMenu";

export interface IRequirementRadioMenuActive extends IRequirement {
  type: RequirementType.RadioMenuActive;
  id: string;
};

function RequirementMet(requirement: IRequirementRadioMenuActive, graph: IConsoleGraph) {
  let met = false;
  const e  = FindConsoleGraphNode(graph, requirement.id);
  if (e) {
    if (!e.entry.requirement || (e.entry.requirement && e.entry.requirement.RequirementMet(graph))) {
      if (e.entry.type === ConsoleEntryType.RadioMenu) {
        const eStateCast = e.state as IConsoleEntryStateRadioMenu;
        if (eStateCast) {
          met = eStateCast.activeItem ? true : false;
        }
      }
    }
  }

  return met;
}

export function CreateRequirementRadioMenuActive(id: string) {
  const rv: IRequirementRadioMenuActive = {
    type: RequirementType.RadioMenuActive,
    id: id,
    RequirementMet: (graph: IConsoleGraph) => RequirementMet(rv, graph)
  };

  return rv;
};
