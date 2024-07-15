import Markdown from "react-markdown";

export enum InfoConfirmPropsRenderType {
  RawText,
  Markdown
}

interface IInfoConfirmProps {
  idPrefix: string;
  title: string;
  input: string;
  renderType: InfoConfirmPropsRenderType;
  buttonText: string;
  confirmText: string;
  isConfirmed: boolean;
  onConfirm: () => void;
  onChildFocus: (focused: boolean, focusElementId?: string) => void;
}

export function InfoConfirm(props: IInfoConfirmProps) {
  const buttonId = `${props.idPrefix}-button`;

  return (
    <div className="div__info-confirm-container" role="presentation">
      <div className="div__info-confirm-title">{props.title}</div>
      <div className="div__info-confirm-info">
        {props.renderType === InfoConfirmPropsRenderType.RawText ? 
          props.input :
          <article><Markdown>{props.input}</Markdown></article>}
      </div>
      <button
        id={buttonId}
        className={props.isConfirmed ?
          "button__info-confirm button__info-confirm--confirmed" :
          "button__info-confirm"
        }
        onClick={props.onConfirm}
        onFocus={() => props.onChildFocus(true, buttonId)}
        onBlur={() => props.onChildFocus(false)}
      >
        {props.isConfirmed ? props.confirmText : props.buttonText}
      </button>
    </div>
  );
};