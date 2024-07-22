import { IConsoleGraph } from "./ConsoleGraph";
import { IRequirementAND } from "./requirements/And";
import { IRequirementInfoConfirmed } from "./requirements/InfoConfirmed";
import { IRequirementOR } from "./requirements/Or";
import { IRequirementPromptContinued } from "./requirements/PromptContinued";
import { IRequirementRadioMenuActive } from "./requirements/RadioMenuActive";
import { IRequirementRadioMenuItem } from "./requirements/RadioMenuItem";
import { IRequirementRecursive } from "./requirements/Recursive";
import { RequirementType } from "./RequirementType";

export interface IRequirement {
  type: RequirementType;
  RequirementMet(graph: IConsoleGraph): boolean;
};

export type Requirement =
  IRequirementAND |
  IRequirementInfoConfirmed |
  IRequirementOR |
  IRequirementPromptContinued |
  IRequirementRadioMenuActive |
  IRequirementRadioMenuItem |
  IRequirementRecursive;
