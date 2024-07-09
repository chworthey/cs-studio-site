interface IMarqueeProps {
  MarqueeTexts: string[];
}

function Space() {
  return <span className="span__marquee-spacer"/>
}

export function Marquee(props: IMarqueeProps) {
  return (
    <div className="div__marquee-container">
      <div className="div__marquee">
        <div className="p__marquee-text">
          {props.MarqueeTexts.map((t, i) => <span key={i}>
            <span className="span__marquee-text-part">{t}</span>
            <Space/>
          </span>)}
        </div>
      </div>
    </div>
  );
}