import {
  useState,
} from "react";

import axios from "axios";

import FindingsPanel from "../components/scanner/FindingsPanel";

import ScannerControls from "../components/scanner/ScannerControls";

import ScanTerminal from "../components/scanner/ScanTerminal";

import ScannerStats from "../components/scanner/ScannerStats";

import ScanProgress from "../components/scanner/ScanProgress";

function Scanner() {
  /*
    STATES
  */

  const [target, setTarget] =
    useState("");

  const [scanType, setScanType] =
    useState(
      "Full Intelligence Scan"
    );

  const [isScanning, setIsScanning] =
    useState(false);

  const [scanComplete, setScanComplete] =
    useState(false);

  /*
    PROGRESS
  */

  const [progress, setProgress] =
    useState(0);

  const [
    currentStage,
    setCurrentStage,
  ] = useState(
    "Idle"
  );

  /*
    TERMINAL
  */

  const [
    terminalLogs,
    setTerminalLogs,
  ] = useState([]);

  /*
    REAL DATA
  */

  const [findings, setFindings] =
    useState([]);

  const [
    technologies,
    setTechnologies,
  ] = useState([]);

  const [
    infrastructure,
    setInfrastructure,
  ] = useState([]);

  const [methods, setMethods] =
    useState([]);

  const [scanTime, setScanTime] =
    useState("0ms");

  const [report, setReport] =
    useState({});

  /*
    ADD LOG
  */

  const addLog = (message) => {
    setTerminalLogs((prev) => [
      ...prev,
      message,
    ]);
  };

  /*
    STAGES
  */

  const stages = [
    {
      title:
        "Initializing Scan Engine",

      progress: 10,
    },

    {
      title:
        "Resolving DNS Intelligence",

      progress: 25,
    },

    {
      title:
        "Inspecting SSL/TLS Posture",

      progress: 40,
    },

    {
      title:
        "Fingerprinting Technologies",

      progress: 58,
    },

    {
      title:
        "Analyzing HTTP Security",

      progress: 75,
    },

    {
      title:
        "Reconnaissance Discovery",

      progress: 90,
    },

    {
      title:
        "Correlating Threat Intelligence",

      progress: 100,
    },
  ];

  /*
    START SCAN
  */

  const startScan =
    async () => {
      /*
        VALIDATION
      */

      if (
        !target.startsWith(
          "http://"
        ) &&
        !target.startsWith(
          "https://"
        )
      ) {
        addLog(
          "[ERROR] Invalid target URL."
        );

        return;
      }

      /*
        RESET
      */

      setScanComplete(false);

      setIsScanning(true);

      setFindings([]);

      setTechnologies([]);

      setInfrastructure([]);

      setMethods([]);

      setReport({});

      setTerminalLogs([]);

      setProgress(0);

      /*
        START
      */

      addLog(
        "[SYSTEM] Initializing VulnProbe Engine..."
      );

      addLog(
        `[TARGET] ${target}`
      );

      /*
        STAGE ANIMATION
      */

      stages.forEach(
        (
          stage,
          index
        ) => {
          setTimeout(() => {
            setCurrentStage(
              stage.title
            );

            setProgress(
              stage.progress
            );

            addLog(
              `[STAGE] ${stage.title}`
            );
          }, index * 800);
        }
      );

      try {
        /*
          TOKEN
        */

        const token =
          localStorage.getItem(
            "token"
          );

        /*
          REQUEST
        */

        const response =
          await axios.post(
            "https://vulnprobe-backend.onrender.com",

            {
              target,
            },

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        /*
          DATA
        */

        const data =
          response.data;

        /*
          FINDINGS
        */

        const findingsData =
          Array.isArray(
            data.findings
          )
            ? data.findings
            : [];

        /*
          STORE
        */

        setFindings(
          findingsData
        );

        setTechnologies(
          data.technologies ||
            []
        );

        setInfrastructure(
          data.infrastructure ||
            []
        );

        setMethods(
          data.methods || []
        );

        setScanTime(
          data.scanTime ||
            "0ms"
        );

        setReport(
          data.report || {}
        );

        /*
          TERMINAL
        */

        addLog(
          "[SUCCESS] Scan completed successfully."
        );

        addLog(
          `[SCAN TIME] ${data.scanTime}`
        );

        /*
          FINDINGS LOGS
        */

        findingsData.forEach(
          (finding) => {
            addLog(
              `[ALERT] ${
                finding.title
              } [${
                finding.severity
              }]`
            );
          }
        );

        /*
          TECH
        */

        if (
          data.technologies
            ?.length > 0
        ) {
          data.technologies.forEach(
            (tech) => {
              addLog(
                `[TECH] ${tech}`
              );
            }
          );
        }

        /*
          METHODS
        */

        if (
          data.methods
            ?.length > 0
        ) {
          addLog(
            `[METHODS] ${data.methods.join(
              ", "
            )}`
          );
        }

        /*
          INFRA
        */

        if (
          data.infrastructure
            ?.length > 0
        ) {
          data.infrastructure.forEach(
            (
              infra
            ) => {
              addLog(
                `[INFRA] ${infra}`
              );
            }
          );
        }

        /*
          COMPLETE
        */

        setCurrentStage(
          "Scan Completed"
        );

        setProgress(100);

        setScanComplete(true);

        addLog(
          "[ENGINE] Intelligence correlation finalized."
        );
      } catch (error) {
        console.log(error);

        addLog(
          "[ERROR] Unable to complete scan."
        );

        setCurrentStage(
          "Scan Failed"
        );
      } finally {
        setIsScanning(false);
      }
    };

  return (
    <div
      className="
        relative

        min-h-screen

        overflow-hidden
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          top-[-220px]
          right-[-140px]

          h-[550px]
          w-[550px]

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-250px]
          left-[-140px]

          h-[500px]
          w-[500px]

          rounded-full

          bg-emerald-400/10

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10

          px-12
          py-10
        "
      >
        {/* CONTROLS */}

        <ScannerControls
          target={target}
          setTarget={
            setTarget
          }

          scanType={scanType}
          setScanType={
            setScanType
          }

          startScan={
            startScan
          }

          isScanning={
            isScanning
          }

          scanComplete={
            scanComplete
          }
        />

        {/* GRID */}

        <div
          className="
            mt-8

            grid
            grid-cols-[1.2fr_0.55fr]

            gap-8
          "
        >
          {/* LEFT */}

          <div className="space-y-8">
            {/* TERMINAL */}

            <ScanTerminal
              currentStage={
                currentStage
              }

              progress={
                progress
              }

              terminalLogs={
                terminalLogs
              }

              findings={
                findings
              }

              technologies={
                technologies
              }

              infrastructure={
                infrastructure
              }

              isScanning={
                isScanning
              }

              scanComplete={
                scanComplete
              }
            />

            {/* FINDINGS */}

            <FindingsPanel
              findings={
                findings
              }
            />
          </div>

          {/* RIGHT */}

          <div className="space-y-8">
            {/* PIPELINE */}

            <ScanProgress
              progress={
                progress
              }

              currentStage={
                currentStage
              }

              findings={
                findings
              }

              technologies={
                technologies
              }

              scanComplete={
                scanComplete
              }
            />

            {/* STATS */}

            <ScannerStats
              findings={
                findings
              }

              technologies={
                technologies
              }

              infrastructure={
                infrastructure
              }

              methods={
                methods
              }

              scanTime={
                scanTime
              }

              report={report}

              isScanning={
                isScanning
              }

              scanComplete={
                scanComplete
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scanner;