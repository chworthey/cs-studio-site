import Markdown from "react-markdown";

export enum InfoConfirmPropsRenderType {
  RawText,
  Markdown
}

interface IInfoConfirmProps {
  input: string;
  renderType: InfoConfirmPropsRenderType;
  buttonText: string;
}

export function InfoConfirm(props: IInfoConfirmProps) {
  return (
    <div className="div__info-confirm-container">
      {props.renderType === InfoConfirmPropsRenderType.RawText ? 
        props.input :
        <Markdown>{props.input}</Markdown>}
      <button className="button__info-confirm">{props.buttonText}</button>
    </div>
  );
};