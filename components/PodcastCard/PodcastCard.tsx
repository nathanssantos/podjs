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
import Image from "next/image";

interface ProjectCardProps {
  collectionId: number;
  collectionName: string;
  artistName: string;
  description?: string;
  feedUrl: string;
  artworkUrl600: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { collectionName, artistName, description, feedUrl, artworkUrl600 } =
    props;

  return (
    <Styles
      className="project-card"
      component="a"
      href={feedUrl}
      target="_blank"
      rel="noreferrer"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={2}
      >
        <img src={artworkUrl600} width={100} alt={collectionName} />
      </Box>
      <CardContent>
        <Box marginBottom={1}>
          <Typography component="div">{collectionName}</Typography>
        </Box>
        <Typography color="text.secondary" variant="caption">
          {artistName}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Styles>
  );
};

export default ProjectCard;
