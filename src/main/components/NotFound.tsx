import { IMenuItem } from "../types/IMenuItem";
import { PageLayout } from "./PageLayout";

interface INotFoundProps {
  MenuItems: IMenuItem[]
}

export function NotFound(props: INotFoundProps) {
  return (
    <PageLayout MenuItems={props.MenuItems}>
      <h1>404 - Not Found!</h1>
      <p>Sorry, I am not sure what page you were looking for, or perhaps it was once here but I removed it. Either way, there isn't much to see here!</p>
      <h2>Teaching Moment: 404?</h2>
      <p>
        404 is one of the many <a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes">HTTP status codes</a> which means not found.
        By navigating here with your browser, your browser has executed a <b>HTTP GET request</b> on your behalf to a server I manage.
        An HTTP GET request is one of the <a href="https://en.wikipedia.org/wiki/HTTP#Request_methods">HTTP Request Methods</a> of HTTP (Hypertext Transfer Protocol).
      </p>
      <p>
        My server returned a status code 200 to indicate success, along with the instructions for how to run and display this app (using html, javascript, and css files). How odd that the return status code was 200 and not 404!
        My server was configured to default back to the main index.html file without any complaint regardless of the url, so that's what you got with that request.
        For this app, we used <b>client-side routing</b>, so everything else from here on out happens in your browser.
      </p>
      <p>
        Once you received the index.html document, a little piece of javascript code ran in your browser which detected that the URL didn't match any known contents.
        The list of known contents was a hard-coded list in javascript.
        The javascript changed the url to /404 (it was a programmatic change, not a http redirect) and then told your browser to render the page containing this text.
        There wasn't a real 404 anywhere in this process! The usage of the term 404 in this context is completely symbolic.
      </p>
      <p>
        However, suppose I were to place another <a href="https://en.wikipedia.org/wiki/REST">RESTful</a> server between the client browser javascript and the web page contents.
        I might choose to do that if there were too many pages to download all at once in a hard-coded manner.
        Perhaps this hypothetical new server would return a 404 when a page is not found.
      </p>
    </PageLayout>
  );
}