const INVOICED = [
  "invoiced",
  "partial refund",
];

const UNINVOICED = [
  "refund request",
  "saved",
];

export function summarizeFolderStatus(rows, columnName) {
  let invoiced = 0;
  let uninvoiced = 0;
  let others = 0;

  const rawStatusCounts = {};

  rows.forEach((row) => {
    const status = String(row[columnName] ?? "").trim();

    if (!status) return;

    rawStatusCounts[status] = (rawStatusCounts[status] || 0) + 1;

    const normalized = status.toLowerCase();

    if (INVOICED.includes(normalized)) {
      invoiced++;
    } else if (UNINVOICED.includes(normalized)) {
      uninvoiced++;
    } else {
      others++;
    }
  });

  return {
    totalRecords: rows.length,
    invoiced,
    uninvoiced,
    others,
    rawStatusCounts,
  };
}
