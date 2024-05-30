import { ConsoleEntryType } from "../ConsoleEntryType";
import { FindConsoleGraphNode, IConsoleGraph } from "../IConsoleGraph";
import { IRequirement } from "../IRequirement";
import { RequirementType } from "../RequirementType";
import { IConsoleEntryStateRadioMenu } from "../entries/RadioMenu";

export interface IRequirementRadioMenuItem extends IRequirement {
  type: RequirementType.RadioMenuItem;
  id: string;
  itemId: string;
};

function RequirementMet(requirement: IRequirementRadioMenuItem, graph: IConsoleGraph) {
  let met = false;
  const e  = FindConsoleGraphNode(graph, requirement.id);
  if (e) {
    if (!e.entry.requirement || (e.entry.requirement && e.entry.requirement.RequirementMet(graph))) {
      if (e.entry.type === ConsoleEntryType.RadioMenu) {
        const eStateCast = e.state as IConsoleEntryStateRadioMenu;
        if (eStateCast) {
          met = eStateCast.activeItem === requirement.itemId;
        }
      }
    }
  }

  return met;
}

export function CreateRequirementRadioMenuItem(id: string, itemId: string) {
  const rv: IRequirementRadioMenuItem = {
    type: RequirementType.RadioMenuItem,
    id: id,
    itemId: itemId,
    RequirementMet: (graph: IConsoleGraph) => RequirementMet(rv, graph)
  };

  return rv;
};
