/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button } from "./ui/PDButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/PDCard";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

const mockReports = [
  {
    id: 1,
    date: "2023-06-01",
    reportId: "BLD001",
    type: "Blood Report",
    issuedBy: "Dr. Smith",
    remarks: "Normal",
    dateOfIssue: "2023-06-02",
    details:
      "Hemoglobin: 14.2 g/dL, White Blood Cells: 7,500/µL, Platelets: 250,000/µL",
  },  {
    id: 9,
    date: "2023-06-01",
    reportId: "BLD001",
    type: "Blood Report",
    issuedBy: "Dr. Smith",
    remarks: "Normal",
    dateOfIssue: "2023-06-02",
    details:
      "Hemoglobin: 14.2 g/dL, White Blood Cells: 7,500/µL, Platelets: 250,000/µL",
  },  {
    id: 8,
    date: "2023-06-01",
    reportId: "BLD001",
    type: "Blood Report",
    issuedBy: "Dr. Smith",
    remarks: "Normal",
    dateOfIssue: "2023-06-02",
    details:
      "Hemoglobin: 14.2 g/dL, White Blood Cells: 7,500/µL, Platelets: 250,000/µL",
  },  {
    id: 7,
    date: "2023-06-01",
    reportId: "BLD001",
    type: "Blood Report",
    issuedBy: "Dr. Smith",
    remarks: "Normal",
    dateOfIssue: "2023-06-02",
    details:
      "Hemoglobin: 14.2 g/dL, White Blood Cells: 7,500/µL, Platelets: 250,000/µL",
  },  {
    id: 4,
    date: "2023-06-01",
    reportId: "BLD001",
    type: "Blood Report",
    issuedBy: "Dr. Smith",
    remarks: "Normal",
    dateOfIssue: "2023-06-02",
    details:
      "Hemoglobin: 14.2 g/dL, White Blood Cells: 7,500/µL, Platelets: 250,000/µL",
  },
  {
    id: 5,
    date: "2023-06-15",
    reportId: "CTS002",
    type: "CT Scan",
    issuedBy: "Dr. Johnson",
    remarks: "Follow-up required",
    dateOfIssue: "2023-06-16",
    details:
      "Minor abnormality detected in lower left lung. Recommend follow-up in 3 months.",
  },
];

export function ReportsSection() {
  const [expandedReportId, setExpandedReportId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedReportId(expandedReportId === id ? null : id);
  };

  return (
    <Card className="shadow-lg bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <CardHeader className="px-4 py-3 border-b border-gray-200 bg-green-50">
        <CardTitle className="text-green-700 text-lg font-semibold">
          Reports
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
        {mockReports.map((report) => (
          <div
            key={report.id}
            className="border border-gray-200 rounded-md shadow-sm bg-white hover:bg-green-50 transition-all"
          >
            {/* Report Summary */}
            <div className="flex justify-between items-center p-4 rounded-t-md">
              <div>
                <p className="text-gray-800 font-semibold">
                  {report.date} - {report.reportId}
                </p>
                <p className="text-gray-600">{report.type}</p>
              </div>
              <div className="flex items-center space-x-2">
                {/* Download Button */}
                <button
                  className="flex items-center text-green-600 hover:text-green-700 transition"
                  aria-label="Download Report"
                >
                  <Download className="h-5 w-5" />
                </button>
                {/* Expand/Collapse Button */}
                <button
                  className="text-gray-600 hover:text-gray-700 transition"
                  onClick={() => toggleExpand(report.id)}
                  aria-label="Toggle Details"
                >
                  {expandedReportId === report.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Report Details */}
            {expandedReportId === report.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p>
                  <strong className="text-gray-700">Issued By:</strong>{" "}
                  <span className="text-gray-600">{report.issuedBy}</span>
                </p>
                <p>
                  <strong className="text-gray-700">Remarks:</strong>{" "}
                  <span className="text-gray-600">{report.remarks}</span>
                </p>
                <p>
                  <strong className="text-gray-700">Date of Issue:</strong>{" "}
                  <span className="text-gray-600">{report.dateOfIssue}</span>
                </p>
                <p>
                  <strong className="text-gray-700">Details:</strong>{" "}
                  <span className="text-gray-600">{report.details}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
