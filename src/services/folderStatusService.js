import * as XLSX from 'xlsx'

function normalizeText(value) {
  if (value === null || value === undefined) {
    return ''
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
}

function detectFolderStatusColumn(headers) {
  const normalizedHeaders = headers.map((header) => normalizeText(header))

  const matchIndex = normalizedHeaders.findIndex((header) => {
    if (header === 'folderstatus') {
      return true
    }

    return header.includes('folder') && header.includes('status')
  })

  return matchIndex >= 0 ? headers[matchIndex] : null
}

function parseWorksheet(worksheet) {
  const allRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })

  for (let rowIndex = 0; rowIndex < allRows.length; rowIndex += 1) {
    const headerRow = allRows[rowIndex]
    if (!headerRow || !headerRow.some((cell) => cell !== '' && cell !== null && cell !== undefined)) {
      continue
    }

    const headers = headerRow.map((cell) => String(cell ?? '').trim())
    if (detectFolderStatusColumn(headers)) {
      const dataRows = allRows
        .slice(rowIndex + 1)
        .filter((row) => row.some((cell) => cell !== '' && cell !== null && cell !== undefined))
        .map((row) => {
          const record = {}
          for (let col = 0; col < headers.length; col += 1) {
            record[headers[col] || `Column ${col + 1}`] = row[col] ?? ''
          }
          return record
        })

      return { headers, rows: dataRows }
    }
  }

  return null
}

function classifyFolderStatus(value) {
  const normalized = normalizeText(value)

  if (
    normalized === 'invoiced' ||
    normalized === 'partialrefund' ||
    normalized === 'partialrefunds'
  ) {
    return 'Invoiced'
  }

  if (normalized === 'refundrequest' || normalized === 'saved') {
    return 'Uninvoiced'
  }

  return null
}

function getCellValue(row, detectedColumn) {
  if (row[detectedColumn] !== undefined) {
    return row[detectedColumn]
  }

  const fallbackHeader = Object.keys(row).find((header) => normalizeText(header) === normalizeText(detectedColumn))
  return fallbackHeader ? row[fallbackHeader] : ''
}

export async function analyzeFolderStatusFile(file) {
  if (!file) {
    throw new Error('Please choose an Excel file to analyze.')
  }

  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })

  const sheetData = workbook.SheetNames
    .map((sheetName) => {
      const worksheet = workbook.Sheets[sheetName]
      const parsed = parseWorksheet(worksheet)
      return parsed ? { sheetName, ...parsed } : null
    })
    .find(Boolean)

  if (!sheetData) {
    throw new Error('No sheet in the workbook contained a recognizable Folder Status column.')
  }

  const { sheetName, headers, rows } = sheetData
  const detectedColumn = detectFolderStatusColumn(headers)

  if (!detectedColumn) {
    throw new Error('No "Folder Status" column was detected in the workbook.')
  }

  const summary = rows.reduce(
    (accumulator, row) => {
      const rawValue = getCellValue(row, detectedColumn)
      const rawText = String(rawValue).trim()

      if (!rawText) {
        accumulator.blankStatusRows += 1
        return accumulator
      }

      accumulator.rawStatusCounts[rawText] = (accumulator.rawStatusCounts[rawText] || 0) + 1

      const status = classifyFolderStatus(rawText)
      if (!status) {
        accumulator.unrecognizedStatusRows += 1
        return accumulator
      }

      accumulator.totalRecords += 1

      if (status === 'Invoiced') {
        accumulator.invoiced += 1
      } else if (status === 'Uninvoiced') {
        accumulator.uninvoiced += 1
      }

      return accumulator
    },
    {
      totalRecords: 0,
      invoiced: 0,
      uninvoiced: 0,
      blankStatusRows: 0,
      unrecognizedStatusRows: 0,
      rawStatusCounts: {},
    },
  )

  return {

    // Metadata

    fileName: file.name,

    uploadedAt: new Date(),

    sheetName,

    detectedColumn,

    headers,



    // Entire workbook

    rows,



    // Summary

    summary,



    // Quick access

    totalRecords: summary.totalRecords,

    invoiced: summary.invoiced,

    uninvoiced: summary.uninvoiced,

    blankStatusRows: summary.blankStatusRows,

    unrecognizedStatusRows: summary.unrecognizedStatusRows,

    rawStatusCounts: summary.rawStatusCounts

}
}
