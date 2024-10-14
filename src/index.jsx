import { createRoot } from 'react-dom/client';
import { MainView } from"./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
=======
// Import statement to indicate that you need to bundle `./index.scss`
>>>>>>> 87482d09d0b44a502c25b3468f885588474ef679

import './index.scss';

const MyFlixApplication = () => {
  return (
  <Container> 
    <MainView />
  </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
<<<<<<< HEAD
=======
// Tells React to render your app in the root DOM element
>>>>>>> 87482d09d0b44a502c25b3468f885588474ef679
root.render(<MyFlixApplication />);