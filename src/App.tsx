import { Link } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import studioLogo from "/cairns.gif";
import charPic from "/char.jpeg";
import controllerPic from "/controller-white.png"
import policiesPage from "./pages/policies.md?raw";
import Markdown from "react-markdown";

enum ButtonLinkAppearance {
  Light,
  Dark
}

interface ButtonLinkProps {
  appearance: ButtonLinkAppearance;
  to: string;
}

function Sidebar() {
  return (
    <>
      <img className="img__char" src={charPic}/>
      <div className="div__about">
        <h2>About Your Instructor</h2>
        <p>
          Name: <em>Charlotte Worthey</em>
        </p>
        <p>
          Software Engineer, Data Engineer, with 15 years of software development excellence and multiple top-selling video game title credits from Minecraft and Forza franchises. Based in Littleton, CO.
        </p>
        <p>
          Pronouns: <i>she/her/hers</i>
        </p>
        <p>
          Favorite Languages: <i>TypeScript, C#, C++, Python, Rust</i>
        </p>
        <p>
          Favorite Tools: <i>VS Code, Git, Perforce, Blender, Substance 3D Painter, Unreal Engine, Unity Engine, Microsoft Azure</i>
        </p>
        <Link className="a__box-link-light" to="/">Read More</Link>
      </div>
    </>
  );
}

const noiseChars = [
  '\u259D', '\u259A', '\u259E', '\u2598', '\u258C', '\u2597', '\u259E', '\u259A', '\u2596'
];

function RandomNoiseCharacter() {
  const chanceOfSpace = 0.7;

  if (Math.random() < chanceOfSpace) {
    return ' ';
  }
  else {
    return noiseChars[Math.floor(Math.random() * noiseChars.length)];
  }
}

function RandomNoiseString(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(RandomNoiseCharacter());
  }
  return arr.join('');
}

function Menubar() {
  return (
    <nav className="nav__navbar">
      <Link className="a__logo-title" to="/">
        <span>Worthey Studios</span>
        <img className="img__logo" src={studioLogo} alt="An animation depicting stones falling onto a stack."></img></Link>
      <Link className="a__navbar__page" to="/">Schedule &amp; Events</Link>
      <Link className="a__navbar__page" to="/">Articles</Link>
      <Link className="a__navbar__page" to="/">Register</Link>
      <Link className="a__navbar__page" to="/policies">Policies</Link>
      <Link className="a__navbar__page" to="/">About</Link>
    </nav>
  );
}

function Eyecatcher() {
  return (
    <h1 className="h1__eyecatcher">
      <div className="div__ec__box--grp0-0">
        MAKE
        <div className="div__ec__box--grp0-1">
          MAKING GAMES
        </div>
        YOUR NEXT
        <div className="div__ec__box--grp0-1">
          GAME
        </div>
      </div>
    </h1>
  );
}

function Banner() {
  return (
    <div className="div__banner">
      <div className="div__banner__content">
        <div className="div__banner__content__col">
          <img className="img__controller" src={controllerPic}/>
        </div>
        <div className="div__banner__content__col">
          <h1 className="h1__offer">Private Lessons<br/>For Software Development</h1>
          <div className="div__actionable-offer">
            <div className="div__actionable-offer__item">
              <Link to="/" className="a__sell-button">Start Lessons</Link>
            </div>
            <div className="div__actionable-offer__item">
              <h2>&#8227; $120/month per student</h2>
              <h2>&#8227; Free Consultation for prospective students and families</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerLayout(props: React.PropsWithChildren) {
  return (
    <div className="div__layout-wrapper">
      <Menubar/>
      <div className="div__layout-main">
        <Banner/>
        <section>
          {props.children}
        </section>
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
    bodyText: 'Classes consist of 3-5 students to ensure each student receives quality time with the instructor. Students choose projects that are aligned with their own interests, values, and needs.',
    linkText: 'View Learning Pillars',
    linkTo: '/'
  },
  {
    title: 'Remote Instruction',
    bodyText: 'Weekly 45-minute classes from the comfort of home. Office hours on Friday open for anyone.',
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
    bodyText: 'Students work together on shared projects to build interpersonal skills and project management skills necessary for the software discipline.',
    linkText: 'View Current Projects',
    linkTo: '/'
  },
  {
    title: 'Asynchronous Learning',
    bodyText: 'The instructor will monitor student projects and provide detailed feedback on each submitted project contribution. Support for students is also available on the club Discord.',
    linkText: 'View Discord Club',
    linkTo: '/'
  },
  {
    title: 'Culture & Arts',
    bodyText: 'Software projects often intersect with other arts and science disciplines. Students are encouraged to integrate non-software skills and knowledge to build projects that inspire.',
    linkText: 'View Project Solarpunk',
    linkTo: '/'
  }
];

function FrontPage() {
  return (
    <BannerLayout>
      <div className="div__features">
        {features.map((f, i) => <div key={i} className="div__feature">
          <div>
            <h2>{f.title}</h2>
            <p>{f.bodyText}</p>
          </div>
          <div>
            <Link className="a__box-link-dark" to={f.linkTo}>{f.linkText} &#8811;</Link>
          </div>
        </div>)}
      </div>
    </BannerLayout>
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
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
