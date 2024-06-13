import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "BlogAI",
  description: "Create & Share AI generated blogs",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            <Toaster />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
