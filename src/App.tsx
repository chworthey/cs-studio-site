import { Link } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import studioLogo from "/cairns.gif";

function Sidebar() {
  return (
    <>
      <h5>Photo of me:</h5>
      <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
      <h3>More Text</h3>
    </>
  );
}

function Menubar() {
  return (
    <>
      <nav className="nav__navbar">
        <Link className="logo-title" to="/">
          <span>Worthey Game Studios</span>
          <img src={studioLogo} alt="A stylized animation depicting stones falling onto a stack."></img></Link>
        <Link to="/">TEST</Link>
        <Link to="/">TEST</Link>
      </nav>
    </>
  );
}

function Layout(props: React.PropsWithChildren) {
  return (
    <>
      <Menubar/>

      <div className="div__layout-row">
        <div className="div__layout-side">
          <Sidebar/>
        </div>
        <div className="div__layout-main">
          <section>
            {props.children}
          </section>
        </div>
      </div>
    </>
  );
}

function FrontPage() {
  return (
    <Layout>
      <h2>Article title</h2>
      <p>
        Hello world!
        
      </p>
    </Layout>
  );
}

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <FrontPage/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
