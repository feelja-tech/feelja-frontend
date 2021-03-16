/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import {
  AudioContext,
  IAnalyserNode,
  IAudioContext,
} from "standardized-audio-context";
import { colors } from "../helpers/themes";
import { BaseContainer, MainContentContainer } from "./Containers";
import { PulsatingDot } from "./PulsatingDot";
import { Description } from "./Typography";

interface TapToPlayProps {
  onClick: () => void;
}

const TapToPlay = (props: TapToPlayProps) => {
  const { onClick } = props;

  return (
    <MainContentContainer onClick={onClick}>
      <PulsatingDot />
      <Description style={{ color: colors.primary }}>
        Tap to play message
      </Description>
    </MainContentContainer>
  );
};

const AudioVisualizerContainer = styled(BaseContainer)`
  height: 100%;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const AudioVisualizerCanvas = styled.canvas`
  height: 20vh;
  width: 100%;
`;

interface AudioVisualizerProps {
  src: string;
  track: string;
  onStart?: () => void;
  onEnd?: () => void;
  onCueChange?: (cue: string) => void;
}

const FFT_SIZE = 256;
const BUFFER_SIZE = FFT_SIZE / 2;

function drawWave(
  canvasCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  analyser: IAnalyserNode<IAudioContext>,
  dataArray: Uint8Array
): void {
  requestAnimationFrame(() => {
    drawWave(canvasCtx, width, height, analyser, dataArray);
  });

  analyser.getByteFrequencyData(dataArray);

  canvasCtx.clearRect(0, 0, width, height);

  const barWidth = width / BUFFER_SIZE / 2;

  dataArray.reduce((prev, barHeight, idx) => {
    // eslint-disable-next-line no-param-reassign
    canvasCtx.fillStyle = `rgb(${barHeight + 100},50,50)`;

    const y = height - barHeight / 4;

    canvasCtx.fillRect(prev + width / 2, y, barWidth, barHeight / 4);

    canvasCtx.fillRect(-prev + width / 2, y, barWidth, barHeight / 4);

    return prev + barWidth + 1;
  }, 0);
}

function paintCanvas(
  canvasRef: MutableRefObject<HTMLCanvasElement>,
  analyser: IAnalyserNode<IAudioContext>,
  dataArray: Uint8Array
) {
  const canvasCtx = canvasRef.current.getContext("2d");

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = colors.primary;

  drawWave(
    canvasCtx,
    canvasRef.current.width,
    canvasRef.current.height,
    analyser,
    dataArray
  );
}

export function AudioVisualizer(
  props: PropsWithChildren<AudioVisualizerProps>
): ReactElement {
  const {
    src,
    children,
    track,
    onStart = console.log,
    onEnd = console.log,
    onCueChange = console.log,
  } = props;

  const canvasTop = useRef<HTMLCanvasElement>();
  const canvasBottom = useRef<HTMLCanvasElement>();

  const audioRef = useRef<HTMLAudioElement>();
  const trackRef = useRef<HTMLTrackElement>();

  const [playing, setPlaying] = useState(false);

  const audioCtx = new AudioContext();

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.oncuechange = () => {
        const text = (trackRef.current.track.activeCues?.[0] as any)?.text;

        onCueChange(text);
      };
    }
  }, [!trackRef.current]);

  const onPlay = useCallback(() => {
    audioCtx.onstatechange = () =>
      console.log("audioCtx.state", audioCtx.state);

    audioCtx.resume();

    const analyser = audioCtx.createAnalyser();

    analyser.fftSize = FFT_SIZE;

    const dataArray = new Uint8Array(BUFFER_SIZE);

    const source = audioCtx.createMediaElementSource(audioRef.current);

    source.connect(analyser);
    source.connect(audioCtx.destination);

    paintCanvas(canvasBottom, analyser, dataArray);
    paintCanvas(canvasTop, analyser, dataArray);

    onStart();
  }, [!audioCtx, !audioRef?.current]);

  const loadAudio = useCallback(() => {
    if (audioCtx && audioRef?.current && !playing) {
      setPlaying(true);

      audioRef.current.load();

      onPlay();
    }
  }, [!audioCtx, !audioRef?.current, playing]);

  return (
    <AudioVisualizerContainer>
      <audio
        src={src}
        onEnded={onEnd}
        ref={audioRef}
        onCanPlay={() => {
          if (playing) audioRef.current.play();
        }}
        preload="auto"
        crossOrigin="anonymous"
      >
        <track
          src={track}
          label="English captions"
          kind="captions"
          srcLang="en"
          default
          ref={trackRef}
        />
      </audio>
      <AudioVisualizerCanvas
        ref={canvasTop}
        style={{ transform: "scaleY(-1)" }}
      />
      {!playing ? <TapToPlay onClick={loadAudio} /> : children}
      <AudioVisualizerCanvas ref={canvasBottom} />
    </AudioVisualizerContainer>
  );
}
