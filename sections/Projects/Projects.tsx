import Container from "@mui/material/Container";
import { Button, FadeInContainer, ProjectCard } from "../../components";
import Styles from "./Styles";

interface ProjectsProps {
  repositories?: Repository[];
}

const Projects = (props: ProjectsProps) => {
  const { repositories } = props;

  if (!repositories) return null;

  const data = repositories.sort((a, b) => {
    if (!a.stargazers_count || !b.stargazers_count) return 0;

    if (a.stargazers_count > b.stargazers_count) return -1;
    else if (a.stargazers_count < b.stargazers_count) return 1;

    return 0;
  });

  return (
    <Styles id="projects">
      <Container maxWidth="lg">
        <div className="content">
          <header>
            <FadeInContainer lazyLoad>
              <h2>My Open Source Projects</h2>
            </FadeInContainer>
          </header>
          <div className="card-list">
            {data.map(
              ({
                id,
                name,
                language,
                description,
                homepage,
                html_url,
                stargazers_count,
              }) => (
                <FadeInContainer lazyLoad key={`${id}`}>
                  <ProjectCard
                    id={id}
                    name={name}
                    language={language}
                    description={description}
                    homepage={homepage}
                    url={html_url}
                    stargazers={stargazers_count}
                  />
                </FadeInContainer>
              )
            )}
          </div>
          <FadeInContainer lazyLoad>
            <Button href="https://github.com/nathanssantos?tab=repositories">
              See More
            </Button>
          </FadeInContainer>
        </div>
      </Container>
    </Styles>
  );
};

export default Projects;
