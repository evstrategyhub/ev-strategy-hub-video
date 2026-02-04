import { Composition } from "remotion";
import { VideoPromo } from "./VideoPromo";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VideoPromo"
      component={VideoPromo}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
