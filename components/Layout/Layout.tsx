import { Footer, Header } from "../";
import Styles from "./Styles";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <Styles className="app__layout">
      <Header />
      {children}
      <Footer />
    </Styles>
  );
};

export default Layout;
