import {
  createContext,
  useContext,
  useState,
} from "react";

/*
  CONTEXT
*/

const ScanContext =
  createContext();

/*
  INITIAL REPORTS
*/

const initialReports = [
  {
    id: "VP-2041",

    target:
      "api.vulnprobe.ai",

    severity:
      "Critical",

    vulnerabilities: 12,

    generated:
      "2 hours ago",

    status:
      "Pending",
  },

  {
    id: "VP-2042",

    target:
      "auth.vulnprobe.ai",

    severity:
      "High",

    vulnerabilities: 7,

    generated:
      "5 hours ago",

    status:
      "Resolved",
  },
];

/*
  PROVIDER
*/

export function ScanProvider({
  children,
}) {
  /*
    REPORT STATE
  */

  const [reports, setReports] =
    useState(initialReports);

  /*
    ADD REPORT
  */

  const addReport = (
    report
  ) => {
    setReports((prev) => [
      report,
      ...prev,
    ]);
  };

  /*
    DASHBOARD ANALYTICS
  */

  const totalScans =
    reports.length;

  const criticalThreats =
    reports.filter(
      (report) =>
        report.severity ===
        "Critical"
    ).length;

  const resolvedIssues =
    reports.filter(
      (report) =>
        report.status ===
        "Resolved"
    ).length;

  /*
    VALUE
  */

  return (
    <ScanContext.Provider
      value={{
        reports,

        addReport,

        totalScans,

        criticalThreats,

        resolvedIssues,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
}

/*
  HOOK
*/

export function useScan() {
  return useContext(
    ScanContext
  );
}