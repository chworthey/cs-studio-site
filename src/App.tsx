import { Link } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import controllerPic from "/controller-white.png";
import policiesPage from "./pages/policies.md?raw";
import Markdown from "react-markdown";
import { PortalPage } from "./portal";
import { Menubar } from "./Menubar";
import { useEffect, useRef, useState } from "react";


// function Sidebar() {
//   return (
//     <>
//       <img className="img__char" src={charPic}/>
//       <div className="div__about">
//         <h2>About Your Instructor</h2>
//         <p>
//           Name: <em>Charlotte Worthey</em>
//         </p>
//         <p>
//           Software Engineer, Data Engineer, with 15 years of software development excellence and multiple top-selling video game title credits from Minecraft and Forza franchises. Based in Littleton, CO.
//         </p>
//         <p>
//           Pronouns: <i>she/her/hers</i>
//         </p>
//         <p>
//           Favorite Languages: <i>TypeScript, C#, C++, Python, Rust</i>
//         </p>
//         <p>
//           Favorite Tools: <i>VS Code, Git, Perforce, Blender, Substance 3D Painter, Unreal Engine, Unity Engine, Microsoft Azure</i>
//         </p>
//         <Link className="a__box-link-light" to="/">Read More</Link>
//       </div>
//     </>
//   );
// }

function Banner() {
  return (
    <div className="div__banner">
      <div className="div__banner__content">
        <div className="div__yellow-stripe"></div>
        <div className="div__banner__content__col">
          <h1 className="h1__offer">Group Lessons for Software Development</h1>
            <div className="div__actionable-offer">
              {/* <div className="div__banner__content__col">
                <img className="img__controller" src={controllerPic}/>
              </div> */}
            <div className="div__actionable-offer__item">
              <div>
                <Link
                  to="/"
                  className="a__start-lessons">
                    Start Lessons &#x25BA;
                    {/* <div className="div__start-lessons-arrow">&#x25BA;</div> */}
                </Link>
              </div>
            </div>
            {/* <div className="div__actionable-offer__item">
              <h2>&#8227; $120/month per student</h2>
              <h2>&#8227; Free Consultation for prospective students and families</h2>
            </div> */}
          </div>
        </div>
        {/* <div className="div__yellow-stripe">
        </div> */}
        {/* <div className="div__black-stripe">

        </div> */}
      </div>
    </div>
  );
}

function PageLayout(props: React.PropsWithChildren) {
  return (
    <div className="div__layout-wrapper">
      <Menubar/>
      <div className="div__layout-main">
        <div className="div__page-wrapper">
          <div className="div__page">
            <section>
              {props.children}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IFeature {
  title: string;
  bodyText: string;
  linkText: string;
  linkTo: string;
}

const features: IFeature[] = [
  {
    title: 'Student-Centered Learning',
    bodyText: 'Classes consist of 3-5 students. Students of all skill levels choose projects that are aligned with their own interests, values, and needs.',
    linkText: 'View Learning Pillars',
    linkTo: '/'
  },
  {
    title: 'Remote Instruction',
    bodyText: 'Weekly 45-minute classes from the comfort of home. Remote office hours are on Friday for all students.',
    linkText: 'View Schedule',
    linkTo: '/'
  },
  {
    title: 'Career Guidance',
    bodyText: 'Students receive assistance with building portfolios/resumes and finding career paths that are a good fit.',
    linkText: 'View Career Overview',
    linkTo: '/'
  },
  {
    title: 'Team Experiences',
    bodyText: 'Students work together on shared projects to build interpersonal skills and project management skills necessary for the software discipline. Tip: involve your friends!',
    linkText: 'View Current Projects',
    linkTo: '/'
  },
  // {
  //   title: 'Asynchronous Learning',
  //   bodyText: 'The instructor will monitor student projects and provide detailed feedback on each submitted project contribution. Support for students is also available on the club Discord.',
  //   linkText: 'View Discord Club',
  //   linkTo: '/'
  // },
  // {
  //   title: 'Culture & Arts',
  //   bodyText: 'Software projects often intersect with other arts and science disciplines. Students are encouraged to integrate non-software skills and knowledge to build projects that inspire.',
  //   linkText: 'View Project Solarpunk',
  //   linkTo: '/'
  // },
  {
    title: 'Colorado Local Events',
    bodyText: 'That\'s right! I\'m based in Littleton, CO. For those of us nearby, we will be doing hackathon get-togethers. We will also invite potential employers to view our awesome projects!',
    linkText: 'View Events',
    linkTo: '/'
  },
  {
    title: 'Really Nice Value!',
    bodyText: '$125/month/student, and no long-term commitments. The initial consultation is free.',
    linkText: 'Schedule Consultation',
    linkTo: '/portal'
  }
];

const marqueeTexts = [
  'Code from the heart',
  'Don\'t let the bugs squash you',
  'The best game was inside you all along',
  'What AI needs is great parents'
];

function Space() {
  return <span className="span__marquee-spacer"/>
}

function Marquee() {
  const marqueeText = useRef<HTMLParagraphElement>(null);

  const [positionX, setPositionX] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<DOMHighResTimeStamp>();
  const previousTimeRef = useRef<DOMHighResTimeStamp>();
  const duration = 180 * 1000.0;

  const lerp = (a: number, b: number, alpha: number) => {
    return (b - a) * alpha + a;
  };

  const tick = (time: DOMHighResTimeStamp) => {
    if (!previousTimeRef.current || !startTimeRef.current) {
      previousTimeRef.current = time;
      startTimeRef.current = time;
    }

    const previousTime = previousTimeRef.current;
    const startTime = startTimeRef.current;

    previousTimeRef.current = time;

    const elapsedTime = previousTime - startTime;
    const progress = (elapsedTime % duration) / duration;
    const docWidth = document.documentElement.clientWidth;

    if (marqueeText.current) {
      const pxPerRem = parseFloat(getComputedStyle(marqueeText.current).fontSize);

      let marqueeWidth = 0.0;
      for (let t of marqueeTexts) {
        marqueeWidth += t.length * pxPerRem + docWidth;
      }

      const posX = lerp(docWidth, -marqueeWidth, progress);
      setPositionX(posX);
    }

    requestAnimationFrame(tick);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    };
  }, []);

  return (
    <div className="div__marquee-container">
      <div className="div__marquee">
        <div ref={marqueeText} className="p__marquee-text" style={{transform: `translateX(${positionX}px)`}}>
          {marqueeTexts.map((t, i) => <span key={i}>
            {t}
            <Space/>
          </span>)}
        </div>
      </div>
    </div>
  );
}

function FrontPage() {
  const [partyMode, setPartyMode] = useState(false);

  return (
    <>
      {partyMode && <>
        <div className="img__party-mode-overlay img__party-mode-overlay--1"/>
        <div className="img__party-mode-overlay img__party-mode-overlay--2"/>
      </>}
      <div className={partyMode ? "div__layout-wrapper party-mode" : "div__layout-wrapper"}>
        <Menubar IsPartyModeOn={partyMode} OnPartyModeSet={setPartyMode}/>
        <Marquee/>
        <div className="div__layout-main-wrapper">
          <div className="div__layout-main">
            <Banner/>
            <div className="div__features">
            {features.map((f, i) => <div key={i} className="div__feature">
              <div>
                <h2 className="h2__feature-title">{f.title}</h2>
                <p className="p__feature-body">{f.bodyText}</p>
              </div>
              <div>
                <Link className="a__feature-button" to={f.linkTo}>{f.linkText} &#8811;</Link>
              </div>
              </div>)}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

function PoliciesPage() {
  return (
    <PageLayout>
      <Markdown>{policiesPage}</Markdown>
    </PageLayout>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <FrontPage/>
    },
    {
      path: '/policies',
      element: <PoliciesPage/>
    },
    {
      path: '/portal',
      element: <PortalPage/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
