import Chart from "app/components/admin/chart";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

// Initialize client that will be used to send requests. This client only
// needs to be created once, and can be reused for multiple requests.

export default async function Dashboard() {
  const data = await runReport();

  return (
    <>
      <Chart analytics={data} />
    </>
  );
}

async function runReport() {
  const analyticsDataClient = new BetaAnalyticsDataClient();
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GOOGLE_ANALYTICS_PROPEERTY_ID}`,
    dateRanges: [
      {
        startDate: "28daysAgo",
        endDate: "yesterday",
      },
    ],
    dimensions: [
      {
        name: "date",
      },
      {
        name: "firstUserDefaultChannelGroup",
      },
    ],
    metrics: [
      {
        name: "newUsers",
      },
    ],
  });
  printRunReportResponse(response);
  return response;
}

// Prints results of a runReport call.
function printRunReportResponse(response) {
  console.log(`${response.rowCount} rows received`);
  response.dimensionHeaders.forEach((dimensionHeader) => {
    console.log(`Dimension header name: ${dimensionHeader.name}`);
  });
  response.metricHeaders.forEach((metricHeader) => {
    console.log(
      `Metric header name: ${metricHeader.name} (${metricHeader.type})`
    );
  });

  console.log("Report result:");
  response.rows.forEach((row) => {
    console.log(
      `${row.dimensionValues[0].value}, ${row.metricValues[0].value}`
    );
  });
}
