import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts } from "../brand";
import { CodeBlock } from "../components/CodeBlock";
import { Terminal } from "../components/Terminal";

const SectionHeader: React.FC<{ step: string; title: string }> = ({ step, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame, fps, config: { damping: 18 } });
  return (
    <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 16}px)` }}>
      <div
        style={{
          color: brand.gold,
          fontSize: 22,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          marginBottom: 8,
          fontFamily: fonts.display,
        }}
      >
        {step}
      </div>
      <div
        style={{
          color: brand.peach,
          fontSize: 56,
          fontWeight: 500,
          letterSpacing: "0.02em",
          fontFamily: fonts.display,
        }}
      >
        {title}
      </div>
    </div>
  );
};

const QueueRow: React.FC<{
  date: string;
  time: string;
  title: string;
  board: string;
  appearAt: number;
  highlighted?: boolean;
}> = ({ date, time, title, board, appearAt, highlighted }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - appearAt, fps, config: { damping: 18 } });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 100px 1fr 280px",
        gap: 24,
        padding: "18px 28px",
        background: highlighted ? "rgba(173,141,76,0.16)" : "rgba(255,255,255,0.025)",
        border: highlighted ? `1px solid ${brand.gold}66` : "1px solid rgba(255,255,255,0.04)",
        borderRadius: 10,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 14}px)`,
        fontFamily: fonts.mono,
        color: brand.peach,
        fontSize: 20,
      }}
    >
      <div style={{ color: brand.gold }}>{date}</div>
      <div style={{ color: brand.gold }}>{time}</div>
      <div style={{ color: brand.peach }}>{title}</div>
      <div style={{ color: brand.codeMuted, fontSize: 17 }}>{board}</div>
    </div>
  );
};

export const PinCreation: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [690, 720], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: brand.blueBlack, opacity: fadeOut, fontFamily: fonts.display }}>
      <div style={{ position: "absolute", top: 80, left: 120 }}>
        <SectionHeader step="Step 2 of 3" title="Curated content + posting" />
      </div>

      {/* Frames 0-280: show pin_queue.csv excerpt as a styled table */}
      <Sequence from={0} durationInFrames={280}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <div
            style={{
              width: 1400,
              background: brand.codeBg,
              borderRadius: 14,
              boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
              padding: 28,
              fontFamily: fonts.mono,
            }}
          >
            <div style={{ color: brand.codeMuted, fontSize: 18, marginBottom: 16, letterSpacing: 0.5 }}>
              pin_queue.csv · 40 brand-owned pins · 20 days
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px 100px 1fr 280px",
                gap: 24,
                padding: "10px 28px",
                color: brand.codeMuted,
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              <div>scheduled_date</div>
              <div>time</div>
              <div>title</div>
              <div>board</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              <QueueRow
                date="2026-04-27"
                time="09:00"
                title="10 questions that turn a sauna night into a real gathering"
                board="Wellness Gatherings"
                appearAt={20}
                highlighted
              />
              <QueueRow
                date="2026-04-27"
                time="15:00"
                title="Connection is the medicine"
                board="Sauna Aesthetic"
                appearAt={40}
              />
              <QueueRow
                date="2026-04-28"
                time="09:00"
                title="The 4% that changes everything about hosting"
                board="Mindful Hosting"
                appearAt={60}
              />
              <QueueRow
                date="2026-04-28"
                time="15:00"
                title="Capacity builds over time"
                board="Thermal Wellness as Home"
                appearAt={80}
              />
              <QueueRow
                date="2026-04-29"
                time="09:00"
                title="What happens in the 90 seconds after a cold plunge"
                board="Cold Plunge Rituals"
                appearAt={100}
              />
              <QueueRow
                date="..."
                time="..."
                title="35 more rows through May 16, 2026"
                board=""
                appearAt={120}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Frames 280-500: show create_pin source */}
      <Sequence from={280} durationInFrames={220}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <CodeBlock
            title="pinterest_client.py · create_pin"
            width={1200}
            fontSize={24}
            highlight={3}
            lines={[
              [{ kind: "plain", text: "def create_pin(self, board_id, title, description," }],
              [{ kind: "plain", text: "                image_url, link=None, alt_text=None):" }],
              [{ kind: "plain", text: "    body = {" }],
              [{ kind: "plain", text: '        "board_id": board_id,' }],
              [{ kind: "plain", text: '        "title": title,' }],
              [{ kind: "plain", text: '        "description": description,' }],
              [{ kind: "plain", text: '        "media_source": {' }],
              [{ kind: "plain", text: '            "source_type": ' }, { kind: "accent", text: '"image_url"' }, { kind: "plain", text: "," }],
              [{ kind: "plain", text: '            "url": image_url,' }],
              [{ kind: "plain", text: "        }," }],
              [{ kind: "plain", text: "    }" }],
              [{ kind: "plain", text: "    " }, { kind: "muted", text: "# ... add link + alt_text if provided" }],
              [{ kind: "plain", text: "    return self._request(" }, { kind: "accent", text: '"POST"' }, { kind: "plain", text: ", " }, { kind: "accent", text: '"/pins"' }, { kind: "plain", text: ", json_body=body)" }],
            ]}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Frames 500-720: terminal showing post_next.py running */}
      <Sequence from={500} durationInFrames={220}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <Terminal
            title="post_next.py — scheduled fire"
            totalFrames={220}
            width={1200}
            fontSize={22}
            lines={[
              { type: "prompt", text: "python post_next.py" },
              { type: "output", text: "INFO 1 due, posting up to 1", color: "muted" },
              { type: "output", text: "POST /v5/pins -> 200" },
              { type: "output", text: "OK   pin=987654321 board=1137370149584773416", color: "green" },
              { type: "output", text: "     title=10 questions that turn a sauna night into..." , color: "green" },
              { type: "output", text: "INFO posted 1, queue updated", color: "muted" },
            ]}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
