
import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleGraph, FindConsoleGraphNode } from "../ConsoleGraph";
import { IRequirement } from "../IRequirement";
import { RequirementType } from "../RequirementType";
import { IConsoleEntryStateTextPrompt } from "../entries/TextPrompt";

export interface IRequirementPromptContinued extends IRequirement {
  type: RequirementType.PromptContinued;
  id: string;
};

function RequirementMet(requirement: IRequirementPromptContinued, graph: IConsoleGraph) {
  let met = false;
  const e  = FindConsoleGraphNode(graph, requirement.id);
  if (e) {
    if (!e.entry.requirement || (e.entry.requirement && e.entry.requirement.RequirementMet(graph))) {
      if (e.entry.type === ConsoleEntryType.TextPrompt) {
        const eStateCast = e.state as IConsoleEntryStateTextPrompt;
        if (eStateCast) {
          met = eStateCast.continued;
        }
      }
    }
  }

  return met;
}

export function CreateRequirementPromptContinued(id: string) {
  const rv: IRequirementPromptContinued = {
    type: RequirementType.PromptContinued,
    id: id,
    RequirementMet: (graph: IConsoleGraph) => RequirementMet(rv, graph)
  };

  return rv;
};
