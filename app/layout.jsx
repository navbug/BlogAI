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
            <div className="bg-teal-500 px-4 py-2 mb-16 text-md text-white fixed top-0 left-0 right-0">The Anthropic Claude API may not work because of no credits. You could check the generated posts on the homepage😐.</div>
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
