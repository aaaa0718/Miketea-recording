/** Layered vector artwork: the cup, cheeks, eyes and straw share one sip cycle. */
export default function TeaGirl() {
  return <svg className="tea-girl" viewBox="0 0 320 320" role="img" aria-label="短发女孩捧着奶茶，轻轻吸一口，开心地鼓起脸颊" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#80664f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M35 165C26 94 68 38 148 36c77-5 139 48 138 121 4 79-51 133-123 132C91 294 38 243 35 165Z" fill="#f7f1ce" stroke="none" />
      <path d="m40 71 3-9 4 8 9 2-8 4-3 9-4-9-8-3Z" fill="#e1d0e9" stroke="none" />
      <path className="sip-heart" d="M263 89c-13-18-27-2-15 10l16 12 13-16c10-16-9-23-14-6Z" fill="#ded1e8" stroke="#a18aaf" strokeWidth="2" />
      <path d="m32 205 7-4m-2 14 8-1m237-62 8 2m-9 9 7 5" fill="none" stroke="#baa587" strokeWidth="2" />
      <ellipse cx="162" cy="295" rx="77" ry="7" fill="#d9d6bd" stroke="none" opacity=".55" />
      {/* A softly uneven bob, with a few separate pencil-like hair strands. */}
      <path d="M77 205C53 188 66 160 65 128 62 78 85 42 132 38c13-2 24 1 30 5 34-16 74 4 89 37 14 28 10 62 15 91 4 28-4 48-26 51-15 8-25 2-34 0H111c-13 9-25 0-34-17Z" fill="#b99172" />
      <path d="M85 87c-15 42-9 88-5 105m10-33c-6 33-1 47 10 50m136-113c9 24 3 56 7 79 3 19-1 28-10 35" fill="none" stroke="#96745b" strokeWidth="2" />
      <path d="M90 78c13-23 32-28 49-27m39 1c24-3 43 13 52 30" fill="none" stroke="#d4b497" strokeWidth="5" />
      {/* Butter-yellow dress, scalloped collar and tiny lavender flowers. */}
      <path d="M119 206c-22 0-44 18-48 42l13 13-3 31c37 9 117 8 153-1l-3-31 13-12c-5-25-23-41-47-42Z" fill="#f3e8b6" />
      <path d="m111 213 12 65m83-65-11 66" fill="none" stroke="#ccba8e" strokeWidth="2" />
      <path d="M140 192v20l20 14 21-14v-20" fill="#f9dec3" />
      <path d="m137 210-14 8 17 19 20-11 19 11 18-19-14-8-23 16Z" fill="#fffbed" strokeWidth="2" />
      <g fill="#c3afcc" stroke="none">
        <path d="M91 235c-8-7 1-13 4-5 4-8 12-2 5 4 9 2 5 11-2 6-1 9-10 6-7-1-8 4-11-4 0-4Z" />
        <path d="M221 263c-7-6 0-11 3-4 4-7 10-2 4 3 8 2 4 9-2 5 0 8-9 6-6-1-7 4-9-3 1-3Z" />
        <circle cx="106" cy="281" r="3" /><circle cx="210" cy="238" r="3" />
      </g>
      <ellipse cx="89" cy="153" rx="13" ry="17" fill="#f9dec3" />
      <ellipse cx="231" cy="153" rx="13" ry="17" fill="#f9dec3" />
      <path d="M91 115c3-39 126-44 137 2l-2 46c-2 30-29 45-65 46-38-1-65-17-68-45Z" fill="#fbe6cd" />
      <path d="M86 127c-8-41 11-69 45-70 30-7 67 2 85 22 12 13 17 31 17 49l-18-6-8-25-1 26-22-2-8-25-3 26-25-1-1-25-9 25-20-3-1-24-10 30Z" fill="#b99172" />
      <path d="m115 76-9 23m33-29-5 21m53-19 9 23" fill="none" stroke="#d4b497" strokeWidth="3" />
      <path d="m111 137 15-2m69 2 14 2" fill="none" strokeWidth="2" />
      <g className="girl-eyes" fill="#705944" stroke="none">
        <ellipse cx="121" cy="152" rx="6" ry="9" /><ellipse cx="200" cy="152" rx="6" ry="9" />
        <circle cx="123" cy="149" r="2" fill="#fff9ea" /><circle cx="202" cy="149" r="2" fill="#fff9ea" />
      </g>
      <g className="girl-cheeks" fill="#e6ac9b" stroke="none" opacity=".65">
        <ellipse cx="109" cy="171" rx="13" ry="7" /><ellipse cx="211" cy="171" rx="13" ry="7" />
      </g>
      <path d="m105 169-1 4m7-4-1 4m98-4-1 4m7-4-1 4" fill="none" stroke="#d19788" strokeWidth="1.5" />
      <path d="m159 163 2 2" fill="none" strokeWidth="2" />
      {/* The straw remains attached to her mouth while the cup lifts. */}
      <path d="m160 182 8 58" fill="none" stroke="#80664f" strokeWidth="9" />
      <path d="m160 182 8 58" fill="none" stroke="#e0d2e8" strokeWidth="5" />
      <path className="straw-sip" d="m160 184 8 55" fill="none" stroke="#fff9ec" strokeWidth="2" strokeDasharray="3 12" />
      <path className="girl-mouth" d="M153 180q7 6 14 0" fill="none" strokeWidth="2.5" />
      <g className="girl-cup">
        <path d="m125 229 8 62q29 9 57-1l8-61Z" fill="#fffbee" />
        <path d="m129 244 7 44q26 7 51-1l5-43q-31 5-63 0Z" fill="#dfc28d" stroke="none" />
        <path d="m125 229 8 62q29 9 57-1l8-61" fill="none" />
        <path d="M121 224q39-9 81 0v9q-40 6-81 0Z" fill="#fffbed" />
        <g fill="#8b7159" stroke="none"><circle cx="144" cy="281" r="3.5" /><circle cx="157" cy="286" r="3.5" /><circle cx="170" cy="279" r="3.5" /><circle cx="181" cy="285" r="3.5" /></g>
        {/* A tiny cat label nods to the supplied character reference. */}
        <path d="m152 254-1-7 7 4 8-1 7-5 1 10c11 14-23 20-22-1Z" fill="#fffbed" strokeWidth="1.5" />
        <path d="m158 257 .1 0m10-1 .1 0" strokeWidth="2.5" />
        <path d="m162 260 2 1 2-1" fill="none" strokeWidth="1.3" />
        <path d="M109 247c8-7 20-8 22-3 1 4-8 7-8 7 12-5 17 1 5 7 11-3 13 3 2 8 8 2 5 8-2 10-14 4-23-4-23-14Z" fill="#f9dec3" strokeWidth="2" />
        <path d="M211 247c-8-7-20-8-22-3-1 4 8 7 8 7-12-5-17 1-5 7-11-3-13 3-2 8-8 2-5 8 2 10 14 4 23-4 23-14Z" fill="#f9dec3" strokeWidth="2" />
      </g>
    </g>
  </svg>;
}
