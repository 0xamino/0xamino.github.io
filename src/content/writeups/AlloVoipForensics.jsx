export default function AlloVoipForensics() {

  return (
    <article className="space-y-8 text-gray-200 leading-relaxed font-sans">
      {/* Title & meta are handled by parent components */}

      {/* Challenge header */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
            <div>
                <p>
                <strong className="text-neon-blue">Challenge:</strong> Allo!
                </p>
                <p>
                <strong className="text-neon-blue">Category:</strong> Network Forensics / PCAP Analysis
                </p>
                <p>
                <strong className="text-neon-blue">Points:</strong> 200
                </p>
                <p>
                <strong className="text-neon-blue">Author:</strong> Houssem0x1
                </p>
            </div>
            {/* Challenge solved image */}
            <img 
                src="image_e53887.png" 
                alt="Challenge solved popup showing 200 points" 
                className="w-32 rounded-lg border border-gray-700 shadow-md hidden md:block"
            />
        </div>
      </section>

      <hr className="border-gray-700" />

      {/* Objective */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-2">
          🎯 Objective
        </h2>
        <div className="text-gray-300 space-y-3">
            <p>
            The challenge provided a packet capture file, <code>capture.pcapng</code>,
            containing VoIP traffic. The goal was to analyze the communication
            between endpoints to retrieve a hidden flag.
            </p>
            <br />
            <p>My mission was to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 marker:text-pink-500">
            <li>Analyze SIP signaling for credentials.</li>
            <li>Reconstruct RTP audio streams.</li>
            <li>Distinguish between Out-of-Band and In-Band signaling to locate the flag.</li>
            </ul>
            <br />
            <p className="bg-gray-800/50 border-l-4 border-pink-500 p-3 text-sm italic">
            <span className="font-bold text-pink-400">Context:</span>{" "}
            VoIP challenges often hide flags in DTMF tones (keypad presses) or spoken audio.
            </p>
        </div>
      </section>

      {/* 1. Initial Recon */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-2">
          🧭 1. Initial Recon — The SIP Handshake
        </h2>
        
        <div className="space-y-4 text-lg">
            <p className="leading-relaxed">
                I started by identifying the actors. The capture contained traffic between: <br />
                <span className="border-b-2 border-pink-500 mx-1">192.168.1.138 (User: Houssem0x1, Ext: 1234)</span> 
                <br />and<br /> 
                <span className="border-b-2 border-pink-500 mx-1">192.168.1.130 (Target: shadx0w, Ext: 4321).</span>
               
            </p>
            <br />
            <p className="leading-relaxed">
                I observed a standard SIP authentication challenge. <br />
                The server, <span className="border-b-2 border-pink-500 mx-1">Asterisk PBX 20.17.0</span>, 
                responded with <span className="border-b-2 border-pink-500 mx-1 font-mono">401 Unauthorized</span> 
                to the initial invite.
            </p>
        </div>

        <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2 mt-8">
          🔓 Cracking the Auth
        </h3>
        
        <div className="space-y-4 text-lg">
            <p className="leading-relaxed">
                The client responded with an MD5 digest. I hypothesized the password was weak. 
                <br />
                Using a script to calculate <span className="border-b-2 border-pink-500 mx-1 font-mono">MD5( HA1 : Nonce : HA2 )</span>, 
                I quickly recovered the password: 
                <span className="border-b-2 border-pink-500 mx-1 font-bold">1234</span>.
               
            </p>

            {/* Red Herring Image */}
            <div className="my-6 bg-black/30 p-4 rounded-xl border border-gray-700">
                <img 
                    src="image_e5a5bc.png" 
                    alt="Incorrect flag submission" 
                    className="rounded-lg shadow-lg w-full max-w-2xl mx-auto"
                />
                <p className="text-xs text-center text-gray-500 mt-2 font-mono">
                    Fig 1.1: Submitting the cracked password resulted in failure. A classic red herring.
                </p>
            </div>

            <p className="text-gray-300 italic border-l-4 border-yellow-500 pl-4 py-1">
                <strong>Pivot:</strong> The credentials were valid, but they were a
                red herring. <br />The flag wasn&apos;t the key to the door; it was inside the room.
            </p>
        </div>
      </section>

      {/* 2. Signaling Analysis */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-2">
          📡 2. Analyzing Signaling (Out-of-Band)
        </h2>
        
        <div className="space-y-4 text-lg">
            <p>
            My next thought was <strong>DTMF tones</strong>. In many VoIP setups, keypad
            presses are sent as digital packets (RFC 2833) rather than audio.
            </p>
            <br />
            <div className="bg-[#05070D] border border-gray-700 rounded-lg p-4 font-mono text-sm shadow-inner">
                <span className="text-green-400">$</span> filter: <span className="text-yellow-300">rtpevent</span>
            </div>
            <br />
            <p className="leading-relaxed">
                I applied the Wireshark filter to check for these &quot;Out-of-Band&quot; events.
                <br />
                The result was <span className="border-b-2 border-pink-500 font-bold">0 packets</span>.
            </p>

            {/* Empty Filter Image */}
            <div className="my-6">
                <img 
                    src="image_e59626.png" 
                    alt="Empty rtpevent filter in Wireshark" 
                    className="rounded-lg border border-gray-700 shadow-md w-full"
                />
                <p className="text-xs text-center text-gray-500 mt-2 font-mono">
                    Fig 2.1: Zero packets returned for digital DTMF events.
                </p>
            </div>

            <p>
            This confirmed the flag was not being transmitted digitally. <br />
            It had to be <strong>In-Band</strong>—recorded directly into the audio stream.
            </p>
        </div>
      </section>

      {/* 3. Audio Forensics */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-2">
          🎧 3. Audio Forensics (In-Band)
        </h2>
        
        <div className="space-y-4 text-lg">
            <p>
            I switched to Wireshark&apos;s telephony tools to reconstruct the audio.
            <br /><br />
            <span className="text-sm font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded">Tools &rarr; Telephony &rarr; VoIP Calls &rarr; Play Streams</span>
            </p>
            
            {/* VoIP Calls List Image */}
            <div className="my-6">
                <img 
                    src="image_50b9dd.png" 
                    alt="List of VoIP calls" 
                    className="rounded-lg border border-gray-700 shadow-md w-full"
                />
                <p className="text-xs text-center text-gray-500 mt-2 font-mono">
                    Fig 3.1: Identifying two distinct call streams between the actors.
                </p>
            </div>

            <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700">
                <p className="mb-2 font-semibold text-gray-300">Investigation Log:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                        <span className="text-cyan-300 font-bold">Call 1 (Start 17.41):</span> 
                        Contained only standard ringing tones. Dead end.
                    </li>
                    <br className="hidden md:block"/>
                    <li>
                        <span className="text-pink-400 font-bold">Call 2 (Start 17.42):</span> 
                        Duration 0:50. This contained the payload.
                    </li>
                </ul>
            </div>

            <p className="leading-relaxed">
            Listening to the second stream revealed the secret. <br />
            A voice clearly spelled out a sequence of characters.
            </p>

            {/* RTP Player Waveform Image */}
            <div className="my-6">
                <img 
                    src="image_50b963.png" 
                    alt="RTP Player waveform analysis" 
                    className="rounded-lg border border-gray-700 shadow-md w-full"
                />
                <p className="text-xs text-center text-gray-500 mt-2 font-mono">
                    Fig 3.2: Visualizing the waveform of the spoken flag.
                </p>
            </div>

            <h3 className="text-2xl font-bold text-cyan-400 mt-6 mb-2">
            📝 Transcription
            </h3>
            <p>
            I carefully transcribed the spoken characters from the audio:
            </p>
            <div className="bg-[#05070D] border border-gray-700 rounded-lg p-6 text-center">
                <code className="text-3xl text-pink-500 tracking-widest font-mono">
                    1 3 3 7 4 8 3 1 2 7 * $
                </code>
            </div>
        </div>
      </section>

      {/* Final flag */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-2">
          🏁 Final Flag
        </h2>
        
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">Constructed Flag</p>
            <code className="block text-2xl md:text-4xl text-neon-green font-mono break-all">
                nexus&#123;1337483127*$&#125;
            </code>
        </div>
        
        <div className="flex justify-center mt-4">
            <img 
                src="image_e53887.png" 
                alt="Correct flag submission" 
                className="rounded-lg border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
            />
        </div>
      </section>

      {/* Mindset summary */}
      <section className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
          🧠 Mindset Summary
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-300">
          <li>
            <strong className="text-white">Identify Red Herrings:</strong> Weak credentials are common
            in PCAPs, but in CTFs, they often just grant access to the actual puzzle.
          </li>
          <br />
          <li>
            <strong className="text-white">Protocol Knowledge:</strong> Understanding the difference between
            Out-of-Band (digital <code>rtpevent</code>) and In-Band (audio waveform)
            signaling was the critical pivot point.
          </li>
          <br />
          <li>
            <strong className="text-white">Tool Proficiency:</strong> Knowing how to use Wireshark&apos;s
            internal RTP player saved time versus exporting raw bytes.
          </li>
        </ol>
      </section>
    </article>
  );
}