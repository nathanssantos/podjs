import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Styles from "./Styles";

interface ProjectCardProps {
  id: number;
  name: string;
  language: string;
  description?: string;
  homepage?: string;
  url: string;
  stargazers?: number;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { name, language, description, homepage, url, stargazers } = props;

  return (
    <Styles className="project-card">
      <CardContent
        component="a"
        href={homepage?.length ? homepage : url}
        target="_blank"
        rel="noreferrer"
      >
        <Box className="project-card__header">
          <Typography component="div" className="project-card__title">
            {name}
          </Typography>
          <Box className="project-card__stargazers">
            <StarBorderIcon />
            <Typography color="text.secondary" variant="caption">
              {stargazers}
            </Typography>
          </Box>
        </Box>

        <Box className="project-card__descripion">
          <Typography variant="caption">{description}</Typography>
        </Box>
      </CardContent>
      <CardActions className="project-card__actions">
        <Typography color="text.secondary" variant="caption">
          {language}
        </Typography>

        <Box display="flex" gap={1} alignItems="center">
          {homepage && (
            <IconButton
              size="small"
              component="a"
              href={homepage}
              target="_blank"
              rel="noreferrer"
            >
              <OpenInNewIcon />
            </IconButton>
          )}
          <IconButton
            size="small"
            component="a"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Styles>
  );
};

export default ProjectCard;
