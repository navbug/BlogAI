import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Create & Post<br></br>
        <span className="green_gradient text-center">
          AI-generated blogs
        </span>{" "}
      </h1>
      <p className="desc text-center">
        Create and share amazing blogs using the Claude generative AI model with
        the world, and let your imagination run wild.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
